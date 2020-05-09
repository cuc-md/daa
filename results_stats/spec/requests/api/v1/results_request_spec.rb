require 'rails_helper'

RSpec.describe "Api::V1::Results", type: :request do

  describe "GET /update" do
    it "returns http success" do
      get "/api/v1/results/update"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /show" do
    it "returns http success" do
      get "/api/v1/results/show"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /destroy" do
    it "returns http success" do
      get "/api/v1/results/destroy"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /details" do
    it "returns http success" do
      get "/api/v1/results/details"
      expect(response).to have_http_status(:success)
    end
  end

end
