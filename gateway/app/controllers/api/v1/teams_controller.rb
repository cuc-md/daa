class Api::V1::TeamsController < ApplicationController
  before_action :authenticate_user!, only: [:update, :destroy]

  def index
    render json: {
      data: {
        teams: []
      }
    }
  end

  def create
    render_team
  end

  def show
    render_team
  end

  def update
    authorize :team
    render_team
  end

  def destroy
    authorize :team
    render_team
  end

  private

  def render_team
    render json: {
      data: {
        team: {}
      }
    }
  end
end
