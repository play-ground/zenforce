# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
require "#{Rails.root}/db/gioco/db.rb"

User.create!(name: 'Fábio Neves', email: 'fneves@zendesk.com', username: 'fneves' )
Rank.create!(name:'',  min_points: '0')

