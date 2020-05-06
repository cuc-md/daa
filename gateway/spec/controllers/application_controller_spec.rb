require "rails_helper"

describe ApplicationController do
  controller do
    def index
      raise Pundit::NotAuthorizedError if params[:pundit]
      User.find(0) if params[:record]
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

    it "rescue from not found path", type: :request do
      get "/some-path"

      expect(response).to have_http_status(:not_found)
      expect(parsed_response).to eq(
        error: {
          message: "Route /some-path not found"
        }
      )
    end

    it "rescue from not found records" do
      get :index, params: { record: true }

      expect(response).to have_http_status(:not_found)
      expect(parsed_response).to eq(
        error: {
          message: "Couldn't find User with 'id'=0"
        }
      )
    end
  end
end
