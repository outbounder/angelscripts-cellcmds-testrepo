module.exports = function(c, next){
  next("ssh "+c.rootRemote, [
    "useradd -d /home/node -m node",
    "sed /etc/passwd node:x:1000:1000::/home/node:/bin/dash node:x:1000:1000::/home/node:/bin/bash",
    "apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10",
    "deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen",
    "apt-get update",
    "apt-get install mongodb-10gen"
  ], function(r, next){
    if(r.code)
      next("ssh "+c.remote, [
        "git clone http://github.com/creatonix/nvm ~/.nvm",
        ". ~/.nvm/nvm.sh",
        "nvm install "+c.nodeVersion
      ])
    else
      next(new Error("failed to setup remote "+c.rootRemote))
  })
}