class Api::V1::UsersController < ApplicationController
  before_action :authenticate_user!

  def me
    render_user(current_user)
  end

  def index
    authorize :user
    users = User.pluck(:id, :name, :email, :roles).map do |id, name, email, roles|
      {
        id:    id,
        name:  name,
        email: email
      }
    end

    render json: {
      data: { users: users }
    }
  end

  def show
    authorize :user
    render_user(user)
  end

  def update
    authorize :user

    user.assign_attributes(permitted_params)
    user.save!

    render_user(user)
  end

  def destroy
    authorize :user
    user.destroy!
    render_user(user)
  end

  def roles
    authorize :user, :list_roles?
    render_roles(user)
  end

  def revoke_roles
    authorize :user
    user.remove_roles(permitted_roles)
    user.save!
    render_roles(user)
  end

  def grant_roles
    authorize :user
    binding.pry
    user.add_roles(permitted_roles)
    user.save!
    render_roles(user)
  end

  private

  def user
    @user ||= User.find(params[:id])
  end

  def permitted_params
    params.require(:user).permit(:name, :email)
  end

  def permitted_roles
    params.require(:roles)
  end

  def render_user(user)
    render json: {
      data: {
        user: {
          id:    user.id,
          name:  user.name,
          email: user.email,
          roles: user.roles
        }
      }
    }
  end

  def render_roles(user)
    render json: { data: { roles: user.roles  } }
  end
end
