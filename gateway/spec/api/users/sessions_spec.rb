require "rails_helper"

describe Users::SessionsController do
  describe "POST #create" do
    context "without email & password" do
      it do
        post user_session_path

        expect(response).to have_http_status(:unauthorized)
        expect(parsed_response).to match(
          error: {
            message: "Unauthorized"
          }
        )
      end
    end

    it "returns JWT for user" do
      user = create :user

      post user_session_path, params: {
        user: {
          email:    user.email,
          password: user.password
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

  describe "DELETE #destroy" do
    it "signs out the user" do
      user    = create :user
      headers = { 'Accept' => 'application/json', 'Content-Type' => 'application/json' }

      delete destroy_user_session_path, headers: auth_headers(headers, user)

      expect(response).to have_http_status(:no_content)
    end
  end
end
