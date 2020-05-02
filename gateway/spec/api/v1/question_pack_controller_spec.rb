require "rails_helper"

describe Api::V1::QuestionPacksController do
  let(:headers) { { 'Accept' => 'application/json', 'Content-Type' => 'application/json' } }

  describe "GET #index" do
    it "returns a list of question packs" do
      expect_any_instance_of(StorageService).to receive(:index).and_return(
        data: { question_packs: [] }
      )

      get api_v1_question_packs_path, headers: headers

      expect(parsed_response).to eq(
        data: {
          question_packs: []
        }
      )
    end
  end

  describe "POST #create" do
    context "without JWT" do
      it "raises 401 Unauthorized" do
        post api_v1_question_packs_path, headers: headers, params: {
          question_pack: {}
        }

        expect(response).to have_http_status(:unauthorized)
        expect(parsed_response).to eq(error: { message: "Unauthorized" })
      end
    end

    context "when user has manage_events role" do
      it "creates an question_pack" do
        user = create :user, roles: [User::MANAGE_EVENTS]

        expect_any_instance_of(StorageService).to receive(:create).and_return(
          data: { question_pack: {} }
        )

        post api_v1_question_packs_path, headers: auth_headers(headers, user), params: {
          question_pack: {}
        }

        expect(response).to have_http_status(:ok)
        expect(parsed_response).to eq(data: { question_pack: {} })
      end
    end

    context "without manage_events role" do
      it "raises 403 Forbidden" do
        user = create :user

        post api_v1_question_packs_path, headers: auth_headers(headers, user), params: {
          question_pack: {}
        }

        expect(response).to have_http_status(:forbidden)
        expect(parsed_response).to eq(error: { message: "Forbidden" })
      end
    end
  end

  describe "GET #show" do
    it "returns a question pack" do
      expect_any_instance_of(StorageService).to receive(:show).and_return(
        data: { question_pack: {} }
      )

      get api_v1_question_pack_path(id: 1), headers: headers

      expect(parsed_response).to eq(
        data: {
          question_pack: {}
        }
      )
    end
  end

  describe "PUT #update" do
    context "without JWT" do
      it "raises 401 Unauthorized" do
        put api_v1_question_pack_path(id: 1), headers: headers, params: {
          question_pack: {}
        }

        expect(response).to have_http_status(:unauthorized)
        expect(parsed_response).to eq(error: { message: "Unauthorized" })
      end
    end

    context "without manage_events role" do
      it "raises 403 Forbidden" do
        user = create :user

        put api_v1_question_pack_path(id: 1), headers: auth_headers(headers, user), params: {
          question_pack: {}
        }

        expect(response).to have_http_status(:forbidden)
        expect(parsed_response).to eq(error: { message: "Forbidden" })
      end
    end

    context "with manage_question_packs role" do
      it "updates a question pack" do
        user = create :user, roles: [User::MANAGE_EVENTS]
        expect_any_instance_of(StorageService).to receive(:update).and_return(
          data: { question_pack: {} }
        )

        put api_v1_question_pack_path(id: 1), headers: auth_headers(headers, user), params: {
          question_pack: {}
        }

        expect(parsed_response).to eq(
          data: {
            question_pack: {}
          }
        )
      end
    end
  end

  describe "DELETE #destroy" do
    context "without JWT" do
      it "raises 401 Unauthorized" do
        delete api_v1_question_pack_path(id: 1), headers: headers

        expect(response).to have_http_status(:unauthorized)
        expect(parsed_response).to eq(error: { message: "Unauthorized" })
      end
    end

    context "without manage_events role" do
      it "raises 403 Forbidden" do
        user = create :user

        delete api_v1_question_pack_path(id: 1), headers: auth_headers(headers, user)

        expect(response).to have_http_status(:forbidden)
        expect(parsed_response).to eq(error: { message: "Forbidden" })
      end
    end

    context "with manage_events role" do
      it "deletes a question pack" do
        user = create :user, roles: [User::MANAGE_EVENTS]

        expect_any_instance_of(StorageService).to receive(:destroy).and_return(
          data: { question_pack: {} }
        )

        delete api_v1_question_pack_path(id: 1), headers: auth_headers(headers, user)

        expect(parsed_response).to eq(
          data: {
            question_pack: {}
          }
        )
      end
    end
  end

  describe "GET #random" do
    it "returns a random question pack" do
      expect_any_instance_of(StorageService).to receive(:random).and_return(
        data: { question_pack: {} }
      )

      get random_api_v1_question_packs_path, headers: headers

      expect(parsed_response).to eq(
        data: {
          question_pack: {}
        }
      )
    end
  end

  describe "GET #document" do
    it "returns a question pack data" do
      expect_any_instance_of(StorageService).to receive(:document).and_return("data")

      get document_api_v1_question_pack_path(id: 1), headers: headers

      expect(response.body).to eq("data")
    end
  end
end

