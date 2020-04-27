User.create!(
  name:                  "Test user",
  email:                 "foo@bar.baz",
  password:              "12345678",
  password_confirmation: "12345678",
  roles:                 User::ROLES
)
