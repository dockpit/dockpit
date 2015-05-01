var fs = require('fs')
var remote = require('remote')
var path = require('path')
var osenv = remote.require('osenv')

var confDir = path.join(osenv.home(), '.dockpit')
var confFile = path.join(confDir, 'dockpit.json')

var defaultConfig = {
  user: {},
}

//writes box's tls info (ca, key, cert) to a tmp directory
//and return the path to it, if the path already exists its a NOOP
window.dpWriteBoxTLS = function(boxid, ca, cert, key, cb) {
  var dir = path.join(osenv.tmpdir(), "dpbox-"+boxid)

  fs.mkdir(dir, function(err){
    if(err && err.code != 'EEXIST') return cb(err, dir) //other error
    if(err && err.code == 'EEXIST') return cb(null, dir) //already exist, consider up-to-date

    fs.writeFileSync(path.join(dir, "ca.pem"), ca)
    fs.writeFileSync(path.join(dir, "cert.pem"), cert)
    fs.writeFileSync(path.join(dir, "key.pem"), key)
    cb(null, dir)
  })
}

//write given configuration to the dockpit file, assumes
//directory is already there
window.dpWriteHomeConfig = function(conf, cb) {
  fs.writeFile(confFile, JSON.stringify(conf), function (err) {
    if(!err) {
      window.DockpitConf = conf
    }

    cb(err, conf)
  });
}

//read dockpit configuration, lazily initiates and writes default
//configuration if path or file doesnt exist
window.dpReadHomeConfig = function(cb) {
  fs.mkdir(confDir, 0777, function(err){
    if(err && err.code != 'EEXIST') return cb(err, dir)

    fs.readFile(confFile, function (err, data) {
      if(err && err.code != 'ENOENT') return cb(err, null)

      if(err && err.code == 'ENOENT') {
        return window.dpWriteHomeConfig(defaultConfig, cb)
      }

      var conf = defaultConfig
      try {
        conf = JSON.parse(data)
      } catch(syntError) {
        console.log("Failed to read config: " + syntError)
        return
      }

      window.DockpitConf = conf
      cb(null, conf)
    });
  })
}

//read configuration when app is started
window.dpReadHomeConfig(function(err, conf){
  if(err) return console.log("Failed to read configuration: " + err)
  console.log("Use configuration: "+JSON.stringify(window.DockpitConf))
})
