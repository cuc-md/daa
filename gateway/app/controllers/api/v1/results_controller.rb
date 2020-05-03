class Api::V1::ResultsController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]

  def index
    render json: {
      data: {
        results: []
      }
    }
  end

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

  private

  def render_result
    render json: {
      data: {
        result: {}
      }
    }
  end
end
