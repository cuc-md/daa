require "rails_helper"

describe ApplicationController do
  controller do
    def index
      QuestionPack.find(0) if params[:record]
    end
  end

  describe "error handling" do
    it "rescue from not found records" do
      get :index, params: { record: true }

      expect(response).to have_http_status(:not_found)
      expect(parsed_response).to eq(
        error: {
          message: "Couldn't find QuestionPack with 'id'=0"
        }
      )
    end
  end
end
