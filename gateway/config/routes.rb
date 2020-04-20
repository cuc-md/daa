Rails.application.routes.draw do
  devise_for :users, defaults: { format: :json }

  namespace :users do
    resources :events, only: [:index]
  end
end
