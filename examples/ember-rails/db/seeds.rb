# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
password = 'abcd1234'
user = User.create_with(password: 'abcd1234').find_or_create_by(email: 'ember@example.com')

puts
puts "Great! You've created a user!"
puts
puts "Now just fire up a rails server with 'rails s'"
puts "and sign in as:"
puts "\temail: #{user.email}"
puts "\tpassword: #{password}"
