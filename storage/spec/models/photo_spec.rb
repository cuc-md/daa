require 'rails_helper'

RSpec.describe Photo do
  describe "validations" do
    it { is_expected.to validate_presence_of(:user_id) }
  end
end
