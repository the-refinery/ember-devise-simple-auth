module EmberDeviseSimpleAuth
  class InstallGenerator < Rails::Generators::Base
    source_root File.expand_path('../templates', __FILE__)

    def install_devise_routes

      route_addition = "devise_scope :user do"
      route_addition << %Q(\n    get "/sessions/current" => "ember_devise_simple_auth/sessions#show")
      route_addition << %Q(\n  end\n)
      route route_addition

      gsub_file "config/routes.rb",
        "devise_for :users",
        "devise_for :users, controllers: { sessions: 'ember_devise_simple_auth/sessions' }"

    end

  end
end
