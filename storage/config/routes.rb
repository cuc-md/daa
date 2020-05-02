Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :question_packs, except: [:new, :edit] do
        get :random, on: :collection
        get :document, on: :member
      end
    end
  end
end
