class CreateQuestionPacks < ActiveRecord::Migration[6.0]
  def change
    create_table :question_packs do |t|
      t.string :event_name
      t.string :event_id
      t.string :difficulty, null: false
      t.string :user_id,    null: false
      t.string :author,     null: false

      t.timestamps
    end
  end
end
