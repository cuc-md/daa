require 'rails_helper'

describe QuestionPack do
  describe "validations" do
    it { is_expected.to validate_presence_of(:author) }
    it { is_expected.to validate_presence_of(:user_id) }
    it { is_expected.to validate_presence_of(:difficulty) }
  end
end
