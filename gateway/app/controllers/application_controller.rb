class ApplicationController < ActionController::API
  include ActionController::MimeResponds
  include Pundit

  rescue_from Pundit::NotAuthorizedError, with: :forbidden

  respond_to :json

  private

  def forbidden
    render status: :forbidden, json: {
      error: { message: "Forbidden" }
    }
  end
end
