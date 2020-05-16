class Api::V1::ResultsController < ApplicationController
  def create
    result              = Result.new
    result.event_id     = permitted_params[:event_id]
    result.event_name   = permitted_params[:event_name]
    result.user_id      = permitted_params[:user_id]
    teams               = permitted_params[:teams].map { |name, points| TeamResult.new(name: name, points: points) }
    result.team_results = teams
    result.save!

    render_result(result)
  end

  def update
    result.event_name   = permitted_params[:event_name] if permitted_params[:event_name]
    result.user_id      = permitted_params[:user_id] if permitted_params[:user_id]
    if permitted_params[:teams]
      teams               = permitted_params[:teams].map { |name, points| TeamResult.new(name: name, points: points) }
      result.team_results = teams
    end
    result.save!

    render_result(result)
  end

  def show
    render_result(result)
  end

  def destroy
    result.destroy
    render_result(result)
  end

  def details
    render_result(result, true)
  end

  private

  def render_result(result, detailed = false)
    render json: {
      data: {
        event_name: result.event_name,
        result: result.team_results.map do |t|
          {
            team_name:   t.name,
            total_score: t.points.sum,
            score:       score(t, detailed)
          }
        end
      }
    }
  end

  def result
    @result ||= Result.find_by(event_id: params[:id])
  end

  def permitted_params
    params.require(:result).permit(:event_id, :event_name, :user_id, teams: {}).as_json.deep_symbolize_keys
  end

  def score(team_results, detailed = false)
    (0..3).map do |round|
      round_range = (round * 10)...((round + 1) * 10)
      round_score = {
        round: round + 1,
        count: team_results.points[round_range].sum
      }

      round_score.merge!(score: team_results.points[round_range]) if detailed
      round_score
    end
  end
end
