class Api::V1::ClubsController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]

  def index
    render json: {
      data: {
        clubs: []
      }
    }
  end

  def create
    authorize :club
    render_club
  end

  def show
    render_club
  end

  def update
    authorize :club
    render_club
  end

  def destroy
    authorize :club
    render_club
  end

  private

  def render_club
    render json: {
      data: {
        club: {}
      }
    }
  end
end
