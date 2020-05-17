class Api::V1::EventsController < ApplicationController
  before_action :authenticate_user!, only: [:create, :update, :destroy]

  def index
    render json: {
      data: {
        events: [
          {
            id:          123,
            name:        "World championship",
            long_name:   "World championship 2020",
            description: "description",
            cover_photo: "/api/v1/photos/1234",
            dates: {
              start_date: "2010-01-01 10:00",
              end_date:   "2010-01-01 15:00"
            },
            registration: {
              status:          "open",
              fee:             "10 MDL/person",
              registation_end: "2010-01-01 09:  00"
            }
          }
        ]
      }
    }
  end

  def create
    authorize :event
    render_event
  end

  def show
    render_event
  end

  def update
    authorize :event
    render_event
  end

  def destroy
    authorize :event
    render_event
  end

  def registration
    render json: {
      data: {
        registered: true
      }
    }
  end

  private

  def permitted_params
    params.require(:event).permit!
  end

  def render_event
    render json: {
      data: {
        event: {
          id:          123,
          name:        "World championship",
          long_name:    "World championship 2020",
          description: "description",
          cover_photo: "/api/v1/photos/1234",
          dates: {
            start_date: "2010-01-01 10:00",
            end_date:   "2010-01-01 15:00"
          },
          registration: {
            status:          "open",
            fee:             "10 MDL/person",
            registation_end: "2010-01-01 09:00"
          },
          teams: [
            {
              id:    456,
              name: "Echipa Racheta"
            }
          ]
        }
      }
    }
  end
end
