require 'rails_helper'

describe "Api::V1::Clubs" do
  let(:headers) { { 'Accept' => 'application/json', 'Content-Type' => 'application/json' } }

  describe "GET #index" do
    it "returns a list of clubs" do
      get api_v1_clubs_path, headers: headers

      expect(parsed_response).to eq(
        data: {
          clubs: []
        }
      )
    end
  end

  describe "POST #create" do
    context "without JWT" do
      it "raises 401 Unauthorized" do
        post api_v1_clubs_path, headers: headers, params: {
          club: {}
        }

        expect(response).to have_http_status(:unauthorized)
        expect(parsed_response).to eq(error: { message: "Unauthorized" })
      end
    end

    context "when user has manage_clubs role" do
      it "creates an club" do
        user = create :user, roles: [User::MANAGE_CLUBS]

        post api_v1_clubs_path, headers: auth_headers(headers, user), params: {
          club: {}
        }

        expect(response).to have_http_status(:ok)
        expect(parsed_response).to eq(data: { club: {} })
      end
    end

    context "without manage_clubs role" do
      it "raises 403 Forbidden" do
        user = create :user

        post api_v1_clubs_path, headers: auth_headers(headers, user), params: {
          club: {}
        }

        expect(response).to have_http_status(:forbidden)
        expect(parsed_response).to eq(error: { message: "Forbidden" })
      end
    end
  end

  describe "GET #show" do
    it "returns an club clubs" do
      get api_v1_club_path(id: 1), headers: headers

      expect(parsed_response).to eq(
        data: {
          club: {}
        }
      )
    end
  end

  describe "PUT #update" do
    context "without JWT" do
      it "raises 401 Unauthorized" do
        put api_v1_club_path(id: 1), headers: headers, params: {
          club: {}
        }

        expect(response).to have_http_status(:unauthorized)
        expect(parsed_response).to eq(error: { message: "Unauthorized" })
      end
    end

    context "without manage_clubs role" do
      it "raises 403 Forbidden" do
        user = create :user

        put api_v1_club_path(id: 1), headers: auth_headers(headers, user), params: {
          club: {}
        }

        expect(response).to have_http_status(:forbidden)
        expect(parsed_response).to eq(error: { message: "Forbidden" })
      end
    end

    context "with manage_clubs role" do
      it "updates an club" do
        user = create :user, roles: [User::MANAGE_CLUBS]

        put api_v1_club_path(id: 1), headers: auth_headers(headers, user), params: {
          club: {}
        }

        expect(parsed_response).to eq(
          data: {
            club: {}
          }
        )
      end
    end
  end

  describe "DELETE #destroy" do
    context "without JWT" do
      it "raises 401 Unauthorized" do
        delete api_v1_club_path(id: 1), headers: headers

        expect(response).to have_http_status(:unauthorized)
        expect(parsed_response).to eq(error: { message: "Unauthorized" })
      end
    end

    context "without manage_clubs role" do
      it "raises 403 Forbidden" do
        user = create :user

        delete api_v1_club_path(id: 1), headers: auth_headers(headers, user)

        expect(response).to have_http_status(:forbidden)
        expect(parsed_response).to eq(error: { message: "Forbidden" })
      end
    end

    context "with manage_clubs role" do
      it "deletes an club" do
        user = create :user, roles: [User::MANAGE_CLUBS]

        delete api_v1_club_path(id: 1), headers: auth_headers(headers, user)

        expect(parsed_response).to eq(
          data: {
            club: {}
          }
        )
      end
    end
  end

end
