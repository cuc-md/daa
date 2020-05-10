class Api::V1::ResultsController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show, :details]

  def create
    authorize :result
    render_result
  end

  def show
    render_result
  end

  def update
    authorize :result
    render_result
  end

  def destroy
    authorize :result
    render_result
  end

  def details
    render json: {
      data: {
        result: [
            {
              team_name:   "team1",
              total_score: 3,
              score:       [
                { round: 1, count: 0, score: [0,0,0,0,0,0,0,0,0,0]},
                { round: 2, count: 3, score: [0,1,0,0,0,0,0,1,0,1]}
              ]
            }
         ]
      }
    }
  end

  private

  def render_result
    render json: {
      data: {
        result: [
            {
              team_name:   "team1",
              total_score: 3,
              score:       [
                { round: 1, count: 0 },
                { round: 2, count: 3 }
              ]
            }
         ]
      }
    }
  end
end
