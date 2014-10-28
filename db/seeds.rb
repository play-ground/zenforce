# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
require "#{Rails.root}/db/gioco/db.rb"

Rank.create!(name:'zengling',  min_points: '0')
Rank.create!(name:'zendawan',  min_points: '25')
Rank.create!(name:'zendi',  min_points: '50')
Rank.create!(name:'zendi master',  min_points: '70')

