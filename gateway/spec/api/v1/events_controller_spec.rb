require "rails_helper"

describe Api::V1::EventsController do
  describe "GET #index" do
    context "when unauthenticated" do
      it "redirects to sign_in page" do
        get api_v1_events_path

        expect(response).to redirect_to new_user_session_path
      end

    end

    it "returns a list of events" do
      user    = create :user
      headers = { 'Accept' => 'application/json', 'Content-Type' => 'application/json' }

      get api_v1_events_path, headers: auth_headers(headers, user)

      expect(parsed_response).to eq({
        data: []
      })
    end
  end
end

