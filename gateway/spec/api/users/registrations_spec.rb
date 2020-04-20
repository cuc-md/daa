require "rails_helper"

describe Users::EventsController do
  describe "POST #create" do
    it "creates new user" do
      post user_registration_path, params: {
        user: {
          name:     "User user",
          email:    "email@email.com",
          password: "P@ssword1234"
        }
      }

      expect(parsed_response).to eq({
        data: {
          name:  "User user",
          email: "email@email.com"
        }
      })
    end

    context "when validation error occures" do
      it "returns error details" do
        post user_registration_path, params: {
          user: {
            name:     "User user",
            email:    "email@email.com",
          }
        }

      expect(parsed_response).to eq({
        error: {
          details: {
            password: ["can't be blank"]
          }
        }
      })
      end
    end
  end
end
