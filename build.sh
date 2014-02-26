if [[ ! -d dist ]]; then
  if [[ -d ../ember-devise-simple-auth-bower ]]; then
    ln -s ../ember-devise-simple-auth-bower ./dist
  else
    mkdir dist
  fi
fi

rm -rf output && broccoli build output && cp -r output/* dist/ && rm -rf output
