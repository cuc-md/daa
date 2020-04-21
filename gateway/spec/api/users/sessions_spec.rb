require "rails_helper"

describe Users::SessionsController do
  describe "POST #create" do
    context "without email & password" do
      it do
        post user_session_path

        expect(response).to have_http_status(:unauthorized)
        expect(parsed_response).to match(
          success: false,
          message: anything
        )
      end
    end

    it "returns JWT for user" do
      user = create :user

      post user_session_path, params: {
        user: {
          email:    user.email,
          password: user.password,
          password_confirmation: user.password
        }
      }

      expect(response).to have_http_status(:ok)
      expect(response.headers["Authorization"]).to match(/Bearer /)
      expect(parsed_response).to match(
        data: {
          email: user.email
        }
      )
    end
  end
end
