Rails.application.routes.draw do
  namespace :api, :defaults => { :format => 'json' } do
    namespace :v1 do
      resources :results, only: [:create, :update, :show, :destroy] do
        get :details, on: :member
      end
    end
  end

  root "application#not_found"
  match "/*pages", to: "application#not_found", via: :all
end
