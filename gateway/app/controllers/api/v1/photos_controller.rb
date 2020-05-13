class Api::V1::PhotosController < ApplicationController
  before_action :authenticate_user!, only: [:create, :destroy]

  def create
    authorize :photo
    render json: service.create
  end

  def show
    send_data service.show
  end

  def destroy
    authorize :photo
    render json: service.destroy
  end

  private

  def service
    @service ||= if current_user
      PhotoService.new(params.as_json.deep_merge!("photo" => { "user_id" => current_user.id }))
    else
      PhotoService.new(params)
    end
  end
end
