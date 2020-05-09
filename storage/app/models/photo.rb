class Photo < ApplicationRecord
  has_one_attached :document

  validates_presence_of :user_id
end
