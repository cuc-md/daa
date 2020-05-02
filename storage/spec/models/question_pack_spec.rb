require 'rails_helper'

describe QuestionPack do
  describe "validations" do
    it { is_expected.to validate_presence_of(:author) }
    it { is_expected.to validate_presence_of(:user_id) }
    it { is_expected.to validate_inclusion_of(:difficulty).in_array(QuestionPack::DIFFICULTIES) }
  end
end
