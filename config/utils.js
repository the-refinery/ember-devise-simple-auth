// Checks message for string from unhandled action error.
//
// "Nothing handled the action '" + name + "'. If you did handle the action, this error can be caused by returning true from an action handler in a controller, causing the action to bubble."
//
function isUnhandledAction(message) {
  return message.match(/^Nothing handled the action/);
}

function tryAction(target, action) {
  var args = Array.prototype.slice.call(arguments, 1, arguments.length);
  var possibleCb = args[args.length - 1];

  try {
    target.send.apply(target, args);
  } catch(error) {
    // Swallow 'Nothing handled action' errors
    if(!isUnhandledAction(error.message)) {
      throw error;
    } else if(typeof possibleCb === "function") {
      possibleCb.apply(target, args);
    }
  }
}

export {tryAction};
