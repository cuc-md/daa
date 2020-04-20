FactoryBot.define do
  factory :user do
    sequence(:email) { |n| "email#{n}@mail.com" }
    sequence(:name)  { |n| "user#{n}" }
    password { "P@ss1234" }
  end
end
