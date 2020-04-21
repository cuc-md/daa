# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  respond_to :json

  private

  def respond_with(resource, _opts = {})
    render json: { data: resource.slice(:email) }
  end

  def respond_to_on_destroy
    head :no_content
  end
end