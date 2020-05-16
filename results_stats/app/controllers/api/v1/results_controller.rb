class Api::V1::ResultsController < ApplicationController
  before_action :set_result

  def create
    render_result
  end

  def update
    if @result.update(result_params)
      render json: @result
    else
      render json: @result.errors, status: :unprocessable_entity
    end
  end

  def show
    render json: @result
  end

  def destroy
    @result.destroy
  end

  def details
    render json: {
      data: {
        result: [
            {
              team_name: "team1",
              total_score: 3,
               score: [
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
              team_name: "team1",
              total_score: 3,
              score: [
                { round: 1, count: 0},
                { round: 2, count: 3}
              ]
            }
         ]
      }
    }

  def set_result
    @result = Result.find_or_create(params[:id])
  end

  def result_params
    params.require(:result).permit(:event_id, :event_name)
  end
end
