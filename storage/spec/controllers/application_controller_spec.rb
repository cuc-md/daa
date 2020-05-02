require "rails_helper"

describe ApplicationController do
  controller do
    def index
      raise ActiveRecord::RecordNotFound if params[:record]
    end
  end

  describe "error handling" do
    it "rescue from not found records" do
      get :index, params: { record: true }

      expect(response).to have_http_status(:not_found)
      expect(parsed_response).to eq(
        error: {
          message: "Not found"
        }
      )
    end
  end
end
