require "rails_helper"

describe Api::V1::EventsController do
  let(:headers) { { 'Accept' => 'application/json', 'Content-Type' => 'application/json' } }

  describe "GET #index" do
    it "returns a list of events" do
      get api_v1_events_path, headers: headers

      expect(parsed_response).to eq(
        data: {
          events: []
        }
      )
    end
  end

  describe "POST #create" do
    context "without JWT" do
      it "raises 401 Unauthorized" do
        post api_v1_events_path, headers: headers, params: {
          event: {}
        }

        expect(response).to have_http_status(:unauthorized)
        expect(parsed_response).to eq(error: { message: "Unauthorized" })
      end
    end

    context "when user has manage_events role" do
      it "creates an event" do
        user = create :user, roles: [User::MANAGE_EVENTS]

        post api_v1_events_path, headers: auth_headers(headers, user), params: {
          event: {}
        }

        expect(response).to have_http_status(:ok)
        expect(parsed_response).to eq(data: { event: {} })
      end
    end

    context "without manage_events role" do
      it "raises 403 Forbidden" do
        user = create :user

        post api_v1_events_path, headers: auth_headers(headers, user), params: {
          event: {}
        }

        expect(response).to have_http_status(:forbidden)
        expect(parsed_response).to eq(error: { message: "Forbidden" })
      end
    end
  end

  describe "GET #show" do
    it "returns an event events" do
      get api_v1_event_path(id: 1), headers: headers

      expect(parsed_response).to eq(
        data: {
          event: {}
        }
      )
    end
  end

  describe "PUT #update" do
    context "without JWT" do
      it "raises 401 Unauthorized" do
        put api_v1_event_path(id: 1), headers: headers, params: {
          event: {}
        }

        expect(response).to have_http_status(:unauthorized)
        expect(parsed_response).to eq(error: { message: "Unauthorized" })
      end
    end

    context "without manage_events role" do
      it "raises 403 Forbidden" do
        user = create :user

        put api_v1_event_path(id: 1), headers: auth_headers(headers, user), params: {
          event: {}
        }

        expect(response).to have_http_status(:forbidden)
        expect(parsed_response).to eq(error: { message: "Forbidden" })
      end
    end

    context "with manage_events role" do
      it "updates an event" do
        user = create :user, roles: [User::MANAGE_EVENTS]

        put api_v1_event_path(id: 1), headers: auth_headers(headers, user), params: {
          event: {}
        }

        expect(parsed_response).to eq(
          data: {
            event: {}
          }
        )
      end
    end
  end

  describe "DELETE #destroy" do
    context "without JWT" do
      it "raises 401 Unauthorized" do
        delete api_v1_event_path(id: 1), headers: headers

        expect(response).to have_http_status(:unauthorized)
        expect(parsed_response).to eq(error: { message: "Unauthorized" })
      end
    end

    context "without manage_events role" do
      it "raises 403 Forbidden" do
        user = create :user

        delete api_v1_event_path(id: 1), headers: auth_headers(headers, user)

        expect(response).to have_http_status(:forbidden)
        expect(parsed_response).to eq(error: { message: "Forbidden" })
      end
    end

    context "with manage_events role" do
      it "deletes an event" do
        user = create :user, roles: [User::MANAGE_EVENTS]

        delete api_v1_event_path(id: 1), headers: auth_headers(headers, user)

        expect(parsed_response).to eq(
          data: {
            event: {}
          }
        )
      end
    end
  end
end

