require "rails_helper"

describe Api::V1::PhotosController do
  let(:headers) { { 'Accept' => 'application/json', 'Content-Type' => 'application/json' } }

  describe "POST #create" do
    context "without JWT" do
      it "raises 401 Unauthorized" do
        post api_v1_photos_path, headers: headers, params: {
          photo: {}
        }

        expect(response).to have_http_status(:unauthorized)
        expect(parsed_response).to eq(error: { message: "Unauthorized" })
      end
    end

    context "when user has manage_events role" do
      it "creates an photo" do
        user = create :user, roles: [User::MANAGE_EVENTS]

        expect_any_instance_of(PhotoService).to receive(:create).and_return(
          data: { photo: {} }
        )

        post api_v1_photos_path, headers: auth_headers(headers, user), params: {
          photo: {}
        }

        expect(response).to have_http_status(:ok)
        expect(parsed_response).to eq(data: { photo: {} })
      end
    end

    context "without manage_events role" do
      it "raises 403 Forbidden" do
        user = create :user

        post api_v1_photos_path, headers: auth_headers(headers, user), params: {
          photo: {}
        }

        expect(response).to have_http_status(:forbidden)
        expect(parsed_response).to eq(error: { message: "Forbidden" })
      end
    end
  end

  describe "GET #show" do
    it "returns a picture thumbnail" do
      expect_any_instance_of(PhotoService).to receive(:show).and_return("data")

      get api_v1_photo_path(id: 1), headers: headers

      expect(response.body).to eq("data")
    end
  end

  describe "DELETE #destroy" do
    context "without JWT" do
      it "raises 401 Unauthorized" do
        delete api_v1_photo_path(id: 1), headers: headers

        expect(response).to have_http_status(:unauthorized)
        expect(parsed_response).to eq(error: { message: "Unauthorized" })
      end
    end

    context "without manage_events role" do
      it "raises 403 Forbidden" do
        user = create :user

        delete api_v1_photo_path(id: 1), headers: auth_headers(headers, user)

        expect(response).to have_http_status(:forbidden)
        expect(parsed_response).to eq(error: { message: "Forbidden" })
      end
    end

    context "with manage_events role" do
      it "deletes a question pack" do
        user = create :user, roles: [User::MANAGE_EVENTS]

        expect_any_instance_of(PhotoService).to receive(:destroy).and_return(
          data: { photo: {} }
        )

        delete api_v1_photo_path(id: 1), headers: auth_headers(headers, user)

        expect(parsed_response).to eq(
          data: {
            photo: {}
          }
        )
      end
    end
  end
end

