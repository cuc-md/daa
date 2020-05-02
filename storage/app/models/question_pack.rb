class QuestionPack < ApplicationRecord
  has_one_attached :document

  DIFFICULTIES = %w(simple medium hard)
  DIFFICULTIES.each do |e|
    const_set(e.upcase, e)
  end

  validates_presence_of :author
  validates_presence_of :user_id
  validates_inclusion_of :difficulty, in: DIFFICULTIES
end
