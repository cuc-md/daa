Rails.application.routes.draw do
 namespace :api do
    namespace :v1 do
      resources :question_packs, except: [:new, :edit] do
        get :random, on: :collection
        get :document, on: :member
      end
      resources :photos, only: [:show, :create, :destroy]
    end
  end

  root "application#not_found"
  match "/*pages", to: "application#not_found", via: :all
end
