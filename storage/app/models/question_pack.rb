class QuestionPack < ApplicationRecord
  has_one_attached :document

  validates_presence_of :author
  validates_presence_of :difficulty
  validates_presence_of :user_id
end
