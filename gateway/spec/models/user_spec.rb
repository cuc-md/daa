require "rails_helper"

describe User do
  describe "validation" do
    it "validates unknown roles" do
      user = build :user, roles: ["evil role", "superman"]
      user.validate
      expect(user.valid?).to be false
      expect(user.errors[:roles]).to match(["Unknown roles: evil role, superman"])
    end
  end

  describe "#add_role" do
    it "adds new role to user" do
      user = build :user
      user.add_role(User::MANAGE_EVENTS)
      expect(user.roles).to eq([User::MANAGE_EVENTS])
    end

    context "when a role doesn't exist" do
      it "doesn't add it" do
        user = build :user
        user.remove_role("evil role")
        expect(user.roles).to eq([])
      end
    end
  end

  describe "#add_roles" do
    it "adds multiple roles to a user" do
      user = build :user
      user.add_roles([User::MANAGE_EVENTS, User::MANAGE_ALL_EVENTS])
      expect(user.roles).to match([User::MANAGE_EVENTS, User::MANAGE_ALL_EVENTS])
    end
  end

  describe "#remove_role" do
    it "removes a role from user" do
      user = build :user, roles: [User::MANAGE_EVENTS]
      user.remove_role(User::MANAGE_EVENTS)
      expect(user.roles).to eq([])
    end

    context "when a role doesn't exist" do
      it "doesn't remove it" do
        user = build :user, roles: [User::MANAGE_EVENTS]
        user.remove_role("evil role")
        expect(user.roles).to eq([User::MANAGE_EVENTS])
      end
    end
  end

  describe "#add_roles" do
    it "removes multiple roles from a user" do
      user = build :user, roles: [User::MANAGE_ALL_EVENTS]
      user.remove_roles([User::MANAGE_EVENTS, User::MANAGE_ALL_EVENTS])
      expect(user.roles).to eq([])
    end
  end
end
