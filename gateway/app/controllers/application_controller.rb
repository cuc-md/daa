class ApplicationController < ActionController::API
  include ActionController::MimeResponds
  include Pundit

  rescue_from Pundit::NotAuthorizedError, with: :forbidden
  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  respond_to :json

  def not_found
    render status: :not_found, json: {
      error: { message: "Not found" }
    }
  end

  def forbidden
    render status: :forbidden, json: {
      error: { message: "Forbidden" }
    }
  end
end
