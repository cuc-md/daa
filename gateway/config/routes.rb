Rails.application.routes.draw do
  devise_for :users, defaults: { format: :json }, controllers: {
    sessions:      'users/sessions',
    registrations: 'users/registrations'
  }

  devise_scope :users do
    namespace :api do
      namespace :v1 do
        resources :events, except: [:edit, :new]

        resources :users, except: [:create] do
          get :me, on: :collection
          member do
            get :roles
            delete :roles, action: :revoke_roles
            post :roles,   action: :grant_roles
          end
        end
      end
    end
  end
end
