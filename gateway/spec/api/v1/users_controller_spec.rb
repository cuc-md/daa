require "rails_helper"

describe Api::V1::UsersController do
  let(:headers) { { 'Accept' => 'application/json', 'Content-Type' => 'application/json' } }

  describe "GET #me" do
    context "without JWT" do
      it "raises 401 Unauthorized" do
        get me_api_v1_users_path, headers: headers

        expect(response).to have_http_status(:unauthorized)
      end

    end

    it "returns info about current user" do
      user = create :user

      get me_api_v1_users_path, headers: auth_headers(headers, user)

      expect(response).to have_http_status(:ok)
      expect(parsed_response).to eq(
        data: {
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            roles: user.roles
          }
        }
      )
    end
  end

  describe "GET #index" do
    context "without JWT" do
      it "raises 401 Unauthorized" do
        get api_v1_users_path, headers: headers

        expect(response).to have_http_status(:unauthorized)
      end
    end

    context "without manage_users role" do
      it "raises 403 Forbidden" do
        user = create :user

        get api_v1_users_path, headers: auth_headers(headers, user)

        expect(response).to have_http_status(:forbidden)
      end
    end

    it "returns a list of users" do
      user = create :user, roles: [User::MANAGE_USERS]
      another_user = create :user

      get api_v1_users_path, headers: auth_headers(headers, user)

      expect(response).to have_http_status(:ok)
      expect(parsed_response).to match(
        data: {
          users: [
            {
              id:    user.id,
              email: user.email,
              name:  user.name
            },
            {
              id:    another_user.id,
              email: another_user.email,
              name:  another_user.name
            }
          ]
        }
      )

    end
  end

  describe "GET #show" do
    context "without JWT" do
      it "raises 401 Unauthorized" do
        get api_v1_user_path(id: 1), headers: headers

        expect(response).to have_http_status(:unauthorized)
      end
    end

    context "without manage_users role" do
      it "raises 403 Forbidden" do
        user = create :user

        get api_v1_user_path(id: 1), headers: auth_headers(headers, user)

        expect(response).to have_http_status(:forbidden)
      end
    end

    it "returns info about a user" do
      user = create :user, roles: [User::MANAGE_USERS]
      another_user = create :user

      get api_v1_user_path(another_user), headers: auth_headers(headers, user)

      expect(response).to have_http_status(:ok)
      expect(parsed_response).to eq(
        data: {
          user: {
            id: another_user.id,
            email: another_user.email,
            name: another_user.name,
            roles: another_user.roles
          }
        }
      )
    end
  end

  describe "PUT #update" do
    context "without JWT" do
      it "raises 401 Unauthorized" do
        put api_v1_user_path(id: 1), headers: headers, params: {
          user: {}
        }

        expect(response).to have_http_status(:unauthorized)
      end
    end

    context "without manage_users role" do
      it "raises 403 Forbidden" do
        user = create :user

        put api_v1_user_path(id: 1), headers: auth_headers(headers, user), params: {
          user: {}
        }

        expect(response).to have_http_status(:forbidden)
      end
    end

    it "returns info about a user" do
      user         = create :user, roles: [User::MANAGE_USERS]
      another_user = create :user

      put api_v1_user_path(another_user), headers: auth_headers(headers, user), params: {
        user: {
          name: "new_name"
        }
      }.to_json

      expect(response).to have_http_status(:ok)
      expect(parsed_response).to eq(
        data: {
          user: {
            id: another_user.id,
            email: another_user.email,
            name: "new_name",
            roles: another_user.roles
          }
        }
      )
      expect(another_user.reload.name).to eq "new_name"
    end
  end

  describe "DELETE #destroy" do
    context "without JWT" do
      it "raises 401 Unauthorized" do
        delete api_v1_user_path(id: 1), headers: headers

        expect(response).to have_http_status(:unauthorized)
      end
    end

    context "without manage_users role" do
      it "raises 403 Forbidden" do
        user = create :user

        delete api_v1_user_path(id: 1), headers: auth_headers(headers, user)

        expect(response).to have_http_status(:forbidden)
      end
    end

    it "returns info about a user" do
      user         = create :user, roles: [User::MANAGE_USERS]
      another_user = create :user

      expect do
        delete api_v1_user_path(another_user), headers: auth_headers(headers, user)
      end.to change(User, :count).by(-1)

      expect(response).to have_http_status(:ok)
      expect(parsed_response).to eq(
        data: {
          user: {
            id:    another_user.id,
            email: another_user.email,
            name:  another_user.name,
            roles: another_user.roles
          }
        }
      )
    end
  end

  describe "GET #roles" do
    context "without JWT" do
      it "raises 401 Unauthorized" do
        get roles_api_v1_user_path(id: 1), headers: headers

        expect(response).to have_http_status(:unauthorized)
      end
    end

    context "without manage_users role" do
      it "raises 403 Forbidden" do
        user = create :user

        get roles_api_v1_user_path(id: 1), headers: auth_headers(headers, user)

        expect(response).to have_http_status(:forbidden)
      end
    end

    it "returns user's roles" do
      user = create :user, roles: [User::MANAGE_USERS]

      get roles_api_v1_user_path(user), headers: auth_headers(headers, user)

      expect(response).to have_http_status(:ok)
      expect(parsed_response).to eq(data: { roles: user.roles })
    end
  end

  describe "DELETE #revoke_roles" do
    context "without JWT" do
      it "raises 401 Unauthorized" do
        delete roles_api_v1_user_path(id: 1), headers: headers, params: {
          roles: []
        }.to_json

        expect(response).to have_http_status(:unauthorized)
      end
    end

    context "without manage_users role" do
      it "raises 403 Forbidden" do
        user = create :user

        delete roles_api_v1_user_path(id: 1), headers: auth_headers(headers, user)

        expect(response).to have_http_status(:forbidden)
      end
    end

    it "revokes roles for a user" do
      user         = create :user, roles: [User::MANAGE_USERS]
      another_user = create :user, roles: [User::MANAGE_EVENTS]

      delete roles_api_v1_user_path(another_user), headers: auth_headers(headers, user), params: {
        roles: [User::MANAGE_EVENTS]
      }.to_json

      expect(response).to have_http_status(:ok)
      expect(another_user.reload.roles).to eq([])
      expect(parsed_response).to eq(data: { roles: another_user.roles })
    end
  end

  describe "POST #grant_roles" do
    context "without JWT" do
      it "raises 401 Unauthorized" do
        post roles_api_v1_user_path(id: 1), headers: headers

        expect(response).to have_http_status(:unauthorized)
      end
    end

    context "without manage_users role" do
      it "raises 403 Forbidden" do
        user = create :user

        post roles_api_v1_user_path(id: 1), headers: auth_headers(headers, user)

        expect(response).to have_http_status(:forbidden)
      end
    end

    it "returns info about a user" do
      user = create :user, roles: [User::MANAGE_USERS]

      post roles_api_v1_user_path(user), headers: auth_headers(headers, user), params: {
        roles: [User::MANAGE_EVENTS]
      }.to_json

      expect(response).to have_http_status(:ok)
      expect(parsed_response).to match(data: { roles: [User::MANAGE_USERS, User::MANAGE_EVENTS]})
      expect(user.reload.has_role?(User::MANAGE_EVENTS)).to eq true
    end
  end
end
