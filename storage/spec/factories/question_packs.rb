FactoryBot.define do
  factory :question_pack do
    author     { "anonymous" }
    difficulty { QuestionPack::SIMPLE }
  end
end
