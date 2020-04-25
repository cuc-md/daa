require "rails_helper"

describe ApplicationController do
  controller do
    def index
      raise Pundit::NotAuthorizedError if params[:pundit]
      raise ActiveRecord::RecordNotFound if params[:record]
    end
  end

  describe "error handling" do
    it "rescue from unauthorized access" do
      get :index, params: { pundit: true }

      expect(response).to have_http_status(:forbidden)
      expect(parsed_response).to eq(
        error: {
          message: "Forbidden"
        }
      )
    end

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
