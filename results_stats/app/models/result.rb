class Result
  include Mongoid::Document
  include Mongoid::Timestamps
  field :event_id, type: String
  field :event_name, type: String
end
