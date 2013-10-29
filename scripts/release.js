module.exports = function(c, next){

  var p = require("../package.json");
  var newVersion = p.version.split(".");
  newVersion[2] = (parseInt(newVersion[2])+1).toString();
  newVersion = newVersion.join(".");
  

  var updatePackageVersion = function(c, next){
    var shelljs = require('shelljs');
    shelljs.cd(__dirname+"/../");
    shelljs.sed('-i', '"version": "'+p.version+'"', '"version": "'+newVersion+'"', "package.json")
    next({code: 0})
  }

  next([
    "git pull --ff origin master",
    updatePackageVersion(),
    "git add --all",
    "git commit -am '"+newVersion+" release'",
    "npm publish",
    "git push origin master",
    "Deploy"
  ])

}
