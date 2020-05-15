class Api::V1::QuestionPacksController < ApplicationController
  before_action :authenticate_user!, only: [:create, :update, :destroy]

  def create
    authorize :question_pack
    render json: service.create, status: service.status
  end

  def index
    render json: service.index, status: service.status
  end

  def show
    render json: service.show, status: service.status
  end

  def destroy
    authorize :question_pack
    render json: service.destroy, status: service.status
  end

  def update
    authorize :question_pack
    render json: service.update, status: service.status
  end

  def random
    render json: service.random, status: service.status
  end

  def document
    render json: service.document, status: service.status
  end

  private

  def service
    @service ||= if current_user
      StorageService.new(params.as_json.deep_merge!("question_pack" => { "user_id" => current_user.id }))
    else
      StorageService.new(params)
    end
  end
end
