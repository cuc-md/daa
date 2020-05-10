FactoryBot.define do
  factory :photo do
    sequence :user_id do |n| n.to_s end
  end
end
