class Users::EventsController < ApplicationController
  def index
    render json: { data: [] }
  end
end
