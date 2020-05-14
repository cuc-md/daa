class ApplicationController < ActionController::API
  include ActionController::MimeResponds

  rescue_from ActionController::ParameterMissing, with: :parameter_missing
  rescue_from ArgumentError, with: :argument_error

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

  def parameter_missing(exception)
    render status: :bad_request, json: {
      error: { message: exception.message }
    }
  end

  def argument_error(exception)
    render status: :bad_request, json: {
      error: { message: exception.message }
    }
  end
end
