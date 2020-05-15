class Api::V1::PhotosController < ApplicationController
  def create
    photo = Photo.create!(permitted_create_params)
    photo.document.attach(io: blob_io, filename: photo.event_name + SecureRandom.uuid)
    render_photo(photo, :created)
  end

  def show
    send_data photo.document.download, filename: photo.document.filename.to_s, type: photo.document.content_type, disposition: "inline"
  end

  def destroy
    photo.document.purge
    photo.destroy!
    render_photo(photo)
  end

  private

  def permitted_create_params
    params.require(:photo).permit(:event_id, :event_name, :user_id)
  end

  def permitted_update_params
    params.require(:photo).permit(:event_id, :event_name)
  end

  def photo
    @photo ||= Photo.find(params[:id])
  end

  def blob_io
    @blob_io ||= StringIO.new(Base64.strict_decode64(blob))
  end

  def blob
    @blob ||= params.dig(:photo, :blob)
  end

  def render_photo(photo, status = :ok)
    render status: status, json: {
      data: {
        photo: {
          id:         photo.id,
          event_name: photo.event_name,
          event_id:   photo.event_id
        }
      }
    }
  end
end
