FactoryBot.define do
  factory :question_pack do
    author     { "anonymous" }
    difficulty { QuestionPack::SIMPLE }
    sequence :user_id do |n| n.to_s end
  end
end
