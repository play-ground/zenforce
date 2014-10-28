class CreateRanks < ActiveRecord::Migration
  def change
    create_table :ranks do |t|
      t.string  :name
      t.integer :min_points

      t.timestamps
    end
  end
end
