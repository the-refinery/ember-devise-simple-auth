$(document).on("ajaxComplete", function(event, xhr, settings) {
  var csrf_param = xhr.getResponseHeader('X-CSRF-Param'),
      csrf_token = xhr.getResponseHeader('X-CSRF-Token');

  if (csrf_param) {
    $('meta[name="csrf-param"]').attr('content', csrf_param);
  }
  if (csrf_token) {
    $('meta[name="csrf-token"]').attr('content', csrf_token);
  }
});

