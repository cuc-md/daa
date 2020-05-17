class Api::V1::PhotosController < ApplicationController
  before_action :authenticate_user!, only: [:create, :destroy]

  def create
    authorize :photo
    params[:photo][:user_id] = current_user.id
    render json: service.create, status: service.status
  end

  def show
    send_data service.show, status: service.status
  end

  def destroy
    authorize :photo
    render json: service.destroy, status: service.status
  end

  private

  def service
    @service ||= PhotoService.new(params)
  end
end
