class Api::V1::QuestionPacksController < ApplicationController
  before_action :authenticate_user!, only: [:create, :update, :destroy]

  def create
    authorize :question_pack
    render json: service.create
  end

  def index
    render json: service.index
  end

  def show
    render json: service.show
  end

  def destroy
    authorize :question_pack
    render json: service.destroy
  end

  def update
    authorize :question_pack
    render json: service.update
  end

  def random
    render json: service.random
  end

  def document
    render json: service.document
  end

  private

  def service
    @service ||= StorageService.new(params)
  end
end
