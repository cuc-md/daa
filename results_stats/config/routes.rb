Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :results, only: [:update, :show, :destroy] do
        get :details, on: :member
      end
    end
  end
end
