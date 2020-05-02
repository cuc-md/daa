class ApplicationController < ActionController::API
  include ActionController::MimeResponds

  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  def not_found
    render status: :not_found, json: {
      error: { message: "Not found" }
    }
  end
end
