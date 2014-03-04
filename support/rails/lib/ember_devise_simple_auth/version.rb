require 'json'
module EmberDeviseSimpleAuth
  def self.version_from_package_json
    pkg = File.read(File.expand_path("dist/bower.json").tap{|u| puts u.inspect})
    JSON.parse(pkg)["version"]
  end

  VERSION = version_from_package_json
end
