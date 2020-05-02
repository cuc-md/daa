class ApplicationController < ActionController::API
  include ActionController::MimeResponds

  rescue_from ActiveRecord::RecordNotFound, with: :not_found
  rescue_from ActionController::ParameterMissing, with: :parameter_missing

  def not_found
    render status: :not_found, json: {
      error: { message: "Not found" }
    }
  end

  def parameter_missing(exception)
    render status: :bad_request, json: {
      error: { message: exception.message }
    }
  end
end
