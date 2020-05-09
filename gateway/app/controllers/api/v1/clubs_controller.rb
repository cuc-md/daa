class Api::V1::ClubsController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]

  def index
    render json: {
      data: {
        clubs: [
          {
            id:       123,
            city:     "Chisinau",
            address:  "Chisinau, some street",
            contacts: {
              representative: "John Doe",
              phone:          "+123456789",
              email:          "foo@bar.baz"
            },
          }
        ]
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
        club: {
          id:           123,
          city:         "Chisinau",
          address:      "Chisinau, some street",
          founded_on:   "2010-10-10",
          description:  "very long description + html",
          active_teams: 10,
          total_teams:   50,
          contacts:     {
            representative: "John Doe",
            phone:          "+123456789",
            email:          "foo@bar.baz"
          }
        }
      }
    }
  end
end
