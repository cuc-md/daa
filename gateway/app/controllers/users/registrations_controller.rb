# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  before_action :configure_sign_up_params, only: [:create]
  respond_to :json

  def create
    build_resource(sign_up_params)
    resource.save
    if resource.errors.any?
      render json: { error: { details: resource.errors } }
    else
      render json: { data: resource.slice("name", "email") }
    end
  end

  protected

  def configure_sign_up_params
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
  end
end
