require 'rails_helper'

describe "Api::V1::Results" do
  let(:headers) { { 'Accept' => 'application/json', 'Content-Type' => 'application/json' } }

  describe "GET #index" do
    it "returns a list of results" do
      get api_v1_results_path, headers: headers

      expect(parsed_response).to eq(
        data: {
          results: []
        }
      )
    end
  end

  describe "POST #create" do
    context "without JWT" do
      it "raises 401 Unauthorized" do
        post api_v1_results_path, headers: headers, params: {
          result: {}
        }

        expect(response).to have_http_status(:unauthorized)
        expect(parsed_response).to eq(error: { message: "Unauthorized" })
      end
    end

    context "when user has manage_events role" do
      it "creates an result" do
        user = create :user, roles: [User::MANAGE_EVENTS]

        post api_v1_results_path, headers: auth_headers(headers, user), params: {
          result: {}
        }

        expect(response).to have_http_status(:ok)
        expect(parsed_response).to eq(data: { result: {} })
      end
    end

    context "without manage_events role" do
      it "raises 403 Forbidden" do
        user = create :user

        post api_v1_results_path, headers: auth_headers(headers, user), params: {
          result: {}
        }

        expect(response).to have_http_status(:forbidden)
        expect(parsed_response).to eq(error: { message: "Forbidden" })
      end
    end
  end

  describe "GET #show" do
    it "returns an result events" do
      get api_v1_result_path(id: 1), headers: headers

      expect(parsed_response).to eq(
        data: {
          result: {}
        }
      )
    end
  end

  describe "PUT #update" do
    context "without JWT" do
      it "raises 401 Unauthorized" do
        put api_v1_result_path(id: 1), headers: headers, params: {
          result: {}
        }

        expect(response).to have_http_status(:unauthorized)
        expect(parsed_response).to eq(error: { message: "Unauthorized" })
      end
    end

    context "without manage_events role" do
      it "raises 403 Forbidden" do
        user = create :user

        put api_v1_result_path(id: 1), headers: auth_headers(headers, user), params: {
          result: {}
        }

        expect(response).to have_http_status(:forbidden)
        expect(parsed_response).to eq(error: { message: "Forbidden" })
      end
    end

    context "with manage_events role" do
      it "updates an result" do
        user = create :user, roles: [User::MANAGE_EVENTS]

        put api_v1_result_path(id: 1), headers: auth_headers(headers, user), params: {
          result: {}
        }

        expect(parsed_response).to eq(
          data: {
            result: {}
          }
        )
      end
    end
  end

  describe "DELETE #destroy" do
    context "without JWT" do
      it "raises 401 Unauthorized" do
        delete api_v1_result_path(id: 1), headers: headers

        expect(response).to have_http_status(:unauthorized)
        expect(parsed_response).to eq(error: { message: "Unauthorized" })
      end
    end

    context "without manage_events role" do
      it "raises 403 Forbidden" do
        user = create :user

        delete api_v1_result_path(id: 1), headers: auth_headers(headers, user)

        expect(response).to have_http_status(:forbidden)
        expect(parsed_response).to eq(error: { message: "Forbidden" })
      end
    end

    context "with manage_events role" do
      it "deletes an result" do
        user = create :user, roles: [User::MANAGE_EVENTS]

        delete api_v1_result_path(id: 1), headers: auth_headers(headers, user)

        expect(parsed_response).to eq(
          data: {
            result: {}
          }
        )
      end
    end
  end
end
