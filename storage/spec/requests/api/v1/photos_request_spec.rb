require 'rails_helper'

RSpec.describe "Api::V1::Photos", type: :request do
  describe "POST #create" do
    it "save photo" do
      data = File.read("spec/placeholder.png")
      blob = Base64.strict_encode64(data)

      post api_v1_photos_path, params: {
        photo: {
          user_id:    "123",
          event_name: "world championship",
          event_id:   "456",
          blob:       blob
        }
      }

      expect(response).to have_http_status(:created)
      expect(Photo.count).to eq 1
      photo = Photo.last

      expect(parsed_response).to match(
        data: {
          photo: {
            user_id:    photo.user_id,
            event_name: photo.event_name,
            event_id:   photo.event_id,
            id:         photo.id
          }
        }
      )
    end
  end

  describe "GET #show" do
    it "returns photo thumbnail" do
      data = File.read("spec/placeholder.png")

      photo = create :photo
      photo.document.attach(io: StringIO.new(data), filename: "name.png")

      get api_v1_photo_path(photo)

      expect(response).to have_http_status(:success)
    end
  end

  describe "DELETE #destroy" do
    it "deletes a question photo" do
      photo = create :photo
      photo.document.attach(io: StringIO.new("data"), filename: "name.png")

      expect do
        delete api_v1_photo_path(photo)
      end.to change(Photo, :count).by(-1)

      expect(response).to have_http_status(:success)
    end
  end
end
