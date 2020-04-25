Rails.application.routes.draw do
  devise_for :users, defaults: { format: :json }, controllers: {
    sessions:      'users/sessions',
    registrations: 'users/registrations'
  }

  devise_scope :users do
    namespace :api do
      namespace :v1 do
        resources :events, except: [:edit, :new]
      end
    end
  end
end
