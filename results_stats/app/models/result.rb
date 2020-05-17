class Result
  include Mongoid::Document
  include Mongoid::Timestamps
  field :event_id, type: String
  field :event_name, type: String
  field :user_id, type: String
  embeds_many :team_results
end
