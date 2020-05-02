require 'rails_helper'

RSpec.describe "Api::V1::QuestionPacks", type: :request do

  describe "POST #create" do
    it "save question pack" do
      blob = Base64.strict_encode64("data")

      post api_v1_question_packs_path, params: {
        question_pack: {
          author:     "somebody",
          user_id:    "123",
          event_name: "world championship",
          difficulty: "simple",
          blob:       blob
        }
      }

      expect(response).to have_http_status(:created)
      expect(QuestionPack.count).to eq 1
      pack = QuestionPack.last
      expect(parsed_response).to match(
        data: {
          question_pack: {
            author:     pack.author,
            user_id:    pack.user_id,
            event_name: pack.event_name,
            difficulty: pack.difficulty,
            id:         pack.id
          }
        }
      )
    end
  end

  describe "GET #index" do
    it "show metadata of all packs" do
      packs = create_list :question_pack, 10

      get api_v1_question_packs_path

      expect(response).to have_http_status(:success)
      expect(parsed_response).to match(data: { question_packs: anything })
      expect(parsed_response.dig(:data, :question_packs).count).to eq 10
    end

    it "filters by difficulty" do
      easy_packs = create_list :question_pack, 5
      hard_packs = create_list :question_pack, 5, difficulty: QuestionPack::HARD

      get api_v1_question_packs_path, params: { difficulty: QuestionPack::HARD }

      ids = parsed_response.dig(:data, :question_packs).map { |el| el[:id] }
      expect(ids).to match_array(hard_packs.map(&:id))
    end
  end

  describe "GET #show" do
    it "show metadata of a question pack" do
      pack = create :question_pack, event_name: "championship"
      get api_v1_question_pack_path(pack)
      expect(response).to have_http_status(:success)
      expect(parsed_response).to match(
        data: {
          question_pack: {
            id:         pack.id,
            user_id:    pack.user_id,
            author:     pack.author,
            difficulty: pack.difficulty,
            event_name: pack.event_name
          }
        }
      )
    end
  end

  describe "DELETE #destroy" do
    it "deletes a question pack" do
      pack = create :question_pack
      pack.document.attach(io: StringIO.new("data"), filename: "name.pdf")

      expect do
        delete api_v1_question_pack_path(pack)
      end.to change(QuestionPack, :count).by(-1)

      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #update" do
    it "updates pack metadata" do
      pack = create :question_pack
      pack.document.attach(io: StringIO.new("data"), filename: "name.pdf")

      expect do
        put api_v1_question_pack_path(pack), params: {
          question_pack: {
            author: "new author",
            difficulty: QuestionPack::HARD,
            event_name: "olympics"
          }
        }
        pack.reload
      end.to change(pack, :author).to("new author")
        .and change(pack, :difficulty).to(QuestionPack::HARD)
        .and change(pack, :event_name).to("olympics")
        .and not_change(pack.document, :download)
    end

    it "updates pack data" do
      pack = create :question_pack
      pack.document.attach(io: StringIO.new("data"), filename: "name.pdf")

      expect do
        put api_v1_question_pack_path(pack), params: {
          question_pack: {
            blob: Base64.strict_encode64("new data")
          }
        }
        pack.reload
      end.to not_change(pack, :author)
        .and not_change(pack, :event_name)
        .and not_change(pack, :difficulty)
        .and change(pack.document, :download).to("new data")
    end
  end

  describe "GET #random" do
    it "returns random pack" do
      packs = create_list :question_pack, 5

      get random_api_v1_question_packs_path

      expect(response).to have_http_status(:success)
      expect(packs.map(&:id)).to include(parsed_response.dig(:data, :question_pack, :id))
    end

    it "filters by difficulty" do
      easy_packs = create_list :question_pack, 5
      hard_packs = create_list :question_pack, 5, difficulty: QuestionPack::HARD

      get random_api_v1_question_packs_path, params: { difficulty: QuestionPack::HARD }

      expect(response).to have_http_status(:success)
      expect(hard_packs.map(&:id)).to include(parsed_response.dig(:data, :question_pack, :id))
    end
  end

  describe "GET #blob" do
    it "returns question pack data" do
      pack = create :question_pack
      pack.document.attach(io: StringIO.new("data"), filename: "name.pdf")

      get document_api_v1_question_pack_path(pack)

      expect(response).to have_http_status(:success)
      expect(response.body).to eq "data"
    end
  end
end
