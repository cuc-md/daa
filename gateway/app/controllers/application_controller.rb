class ApplicationController < ActionController::API
  include ActionController::MimeResponds
  include Pundit

  rescue_from Pundit::NotAuthorizedError, with: :forbidden
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

  respond_to :json

  def record_not_found(error)
    render status: :not_found, json: {
      error: { message: error.message }
    }
  end

  def not_found
    render status: :not_found, json: {
      error: { message: "Route #{request.fullpath} not found" }
    }
  end

  def forbidden
    render status: :forbidden, json: {
      error: { message: "Forbidden" }
    }
  end
end
