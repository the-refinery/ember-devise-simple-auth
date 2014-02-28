class EmberDeviseSimpleAuth::SessionsController < Devise::SessionsController
  respond_to :html, :json

  after_action :set_csrf_headers, only: [:create, :destroy]

  before_filter :authenticate_user!, only: [:show]

  def show
    authenticate_user! force: true
    render json: current_user
  end

  protected

  def set_csrf_headers
    if request.xhr?
      response.headers['X-CSRF-Token'] = "#{form_authenticity_token}"
      response.headers['X-CSRF-Param'] = "#{request_forgery_protection_token}"
    end
  end

end
