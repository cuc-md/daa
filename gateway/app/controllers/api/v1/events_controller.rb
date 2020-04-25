class Api::V1::EventsController < ApplicationController
  before_action :authenticate_user!, only: [:create, :update, :destroy]

  def index
    render json: { data: { events: [] } }
  end

  def create
    authorize :event
    render json: { data: { event: {} } }
  end

  def show
    render json: { data: { event: {} } }
  end

  def update
    authorize :event
    render json: { data: { event: {} } }
  end

  def destroy
    authorize :event
    render json: { data: { event: {} } }
  end

  private

  def permitted_params
    params.require(:event).permit!
  end
end
