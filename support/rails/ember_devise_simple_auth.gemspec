$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "ember_devise_simple_auth/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "ember_devise_simple_auth"
  s.version     = EmberDeviseSimpleAuth::VERSION
  s.authors     = ["TODO: Your name"]
  s.email       = ["TODO: Your email"]
  s.homepage    = "TODO"
  s.summary     = "TODO: Summary of EmberDeviseSimpleAuth."
  s.description = "TODO: Description of EmberDeviseSimpleAuth."

  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.rdoc"]
  s.test_files = Dir["test/**/*"]

  s.add_dependency "rails", "~> 4.0.2"

  s.add_development_dependency "sqlite3"
end
