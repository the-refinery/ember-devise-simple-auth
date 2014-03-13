require 'json'
module EmberDeviseSimpleAuth
  def self.version_from_package_json
    pkg = File.read(File.expand_path("dist/bower.json"))
    JSON.parse(pkg)["version"]
  end

  VERSION = version_from_package_json
end
