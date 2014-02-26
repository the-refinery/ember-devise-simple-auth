# EmberDeviseSimpleAuth

Rails support for the [ember-devise-simple-auth](http://github.com/d-i/ember-devise-simple-auth) plugin.

## What it does

This gem enhances the stock `Devise::SessionsController` to be slightly more ajax friendly. This means two things:

1. Supports json responses by adding `respond_to :json`
2. Renders new CSRF tokens in response headers ([see why?][why_csrf_tokens])

## Why it does this

### Why support JSON?

APIs speak JSON better than HTML. It's just that simple.

### Why CSRF tokens?

Devise _really_, _really_ wants to do redirects after you sign in and sign out. This is because Rails creates new CSRF tokens every time you POST/DELETE. Most JavaScript solutions with Rails already write the CSRF token to a meta tag. This gem renders those new tokens in response headers when they change on sign in/sign out. On the Ember side, the plugin will take those headers and rewrite them to the meta tag.

[&copy;2014 D-I](http://www.d-i.co)
