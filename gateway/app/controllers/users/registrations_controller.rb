# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  def create
    super

    if resource.errors.any?
      render json: { error: { details: resource.errors } }
    else
      render json: resource
    end
  end
end
