var childp = require('child_process')

window.DockpitTermConfig = {
  terminals: {
    osx: {
      terminal: {
        script: '\ntell application "Terminal" to activate\ndelay 0.4\ntell application "System Events" to keystroke "t" using command down\ntell application "Terminal"\n  do script "export DOCKER_HOST={DOCKER_HOST}; export DOCKER_CERT_PATH={DOCKER_CERT_PATH}; export DOCKER_TLS_VERIFY=1; clear" in window 1\nend tell\n\n'
      }
      //@todo, add iterm, commander etc
    }
  }
}

//Uses platform specific logic to open a terminal window
window.dpOpenTerminal = function(conf, platform, app, ctx, cb) {
  var runner
  var appConf
  if(platform == "osx") {
    runner = childp.spawn("osascript", ["-ss", "-"], {})
    appConf = conf.terminals.osx[app]
  } else {
    //@todo implement for windows/linux
    return cb(new Error("platform '"+platform+"' is not yet supported"))
  }

  if(!appConf) {
    return cb(new Error("app '"+app+"' is not available for platform '"+platform+"'"))
  }

  runner.on('close', cb)
  runner.stdout.on('data', function(chunk){ console.log("terminal runner: "+chunk.toString()) })
  runner.stderr.on('data', function(chunk){ console.error("terminal runner: "+chunk.toString()) })

  //replace 'template' variables
  var script = appConf.script
  Object.keys(ctx).forEach(function(key) {
    script = script.replace("{"+key+"}", ctx[key])
  });

  //pass script to runner
  if(platform == "osx") {
    runner.stdin.write(script);
    runner.stdin.end()
  } else {
    //@todo implement for windows/linux
  }
}
