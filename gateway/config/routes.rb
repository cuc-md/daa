Rails.application.routes.draw do
  devise_for :users, defaults: { format: :json }, controllers: {
    sessions:      'users/sessions',
    registrations: 'users/registrations'
  }

  devise_scope :users do
    namespace :api do
      namespace :v1 do
        resources :events,  except: [:edit, :new] do
          post :registration, on: :member
        end
        resources :clubs,   except: [:edit, :new]
        resources :teams,   except: [:edit, :new]
        resources :results, only: [:create, :show, :update, :destroy] do
          get :details, on: :member
          get :sample, on: :collection
        end
        resources :users, except: [:create] do
          get :me, on: :collection
          member do
            get :roles
            delete :roles, action: :revoke_roles
            post :roles,   action: :grant_roles
          end
        end
        resources :question_packs, except: [:edit, :new] do
          get :random, on: :collection
          get :document, on: :member
        end
        resources :photos, only: [:create, :show, :destroy]
      end
    end
  end

  root "application#not_found"
  match "/*pages", to: "application#not_found", via: :all
end
