require "rails_helper"

xdescribe StorageService do
  describe "#create" do
    it "makes request to create question pack" do
      expect(RestClient).to receive(:post).with(
        "example.com/api/v1/question_packs",
        {}
      ).and_return({data: {question_pack: {}}}.to_json)

      expect(described_class.new({}).create).to match(
        data: {
          question_pack: {}
        }
      )
    end
  end

  describe "#index" do
    it "makes request to show all question packs" do
      expect(RestClient).to receive(:get).with(
        "example.com/api/v1/question_packs"
      ).and_return({data: {question_packs: []}}.to_json)

      expect(described_class.new({}).index).to match(
        data: {
          question_packs: []
        }
      )
    end
  end

  describe "#show" do
    it "makes request to show question pack" do
      expect(RestClient).to receive(:get).with(
        "example.com/api/v1/question_packs/1",
      ).and_return({data: {question_pack: {}}}.to_json)

      expect(described_class.new(id: 1).show).to match(
        data: {
          question_pack: {}
        }
      )
    end
  end

  describe "#destroy" do
    it "makes request to destroy a question pack" do
      expect(RestClient).to receive(:delete).with(
        "example.com/api/v1/question_packs/1",
      ).and_return({data: {question_pack: {}}}.to_json)

      expect(described_class.new(id: 1).destroy).to match(
        data: {
          question_pack: {}
        }
      )
    end
  end

  describe "#update" do
    it "makes request to update question pack" do
      expect(RestClient).to receive(:patch).with(
        "example.com/api/v1/question_packs/1",
        {data: {}}
      ).and_return({data: {question_pack: {}}}.to_json)

      expect(described_class.new(id: 1, data: {}).update).to match(
        data: {
          question_pack: {}
        }
      )
    end
  end

  describe "#random" do
    it "makes request to show random question pack" do
      expect(RestClient).to receive(:get).with(
        "example.com/api/v1/question_packs/random"
      ).and_return({data: {question_pack: {}}}.to_json)

      expect(described_class.new({}).random).to match(
        data: {
          question_pack: {}
        }
      )
    end
  end

  describe "#document" do
    it "makes request to fetch question pack data" do
      expect(RestClient).to receive(:get).with(
        "example.com/api/v1/question_packs/1/document"
      ).and_return({data: true}.to_json)


      expect(described_class.new(id: 1).document).to eq({data: true}.to_json)
    end
  end
end
