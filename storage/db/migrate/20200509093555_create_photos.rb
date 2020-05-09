class CreatePhotos < ActiveRecord::Migration[6.0]
  def change
    create_table :photos do |t|
      t.string :event_name
      t.string :event_id
      t.string :user_id, null: false

      t.timestamps
    end
  end
end
