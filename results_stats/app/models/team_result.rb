class TeamResult
  include Mongoid::Document
  include Mongoid::Timestamps
  field :name, type: String
  field :points, type: Array
end
