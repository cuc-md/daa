class EventsController < ApplicationController
  before_action :authenticate_user!, only: [:index]

  def index
    render json: { data: [] }
  end
end
