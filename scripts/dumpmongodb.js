module.exports = function(c, next){
  var timestamp = require("moment")().format("y-m-d")
  next("ssh "+c.remote, [
    "mongodump ~/tmp/mongodump",
    "tar -zcvf mongodump-"+timestamp+".tar.gz ~/tmp/mongodump",
    "rm -rf ~/tmp/mongodump"
  ], function(r, next){
    if(r.code == 0)
      next([
        "scp "+c.remote+":~/mongodump-"+timestamp+".tar.gz ~/tmp/mongodump.tar.gz",
        "mkdip -p ~/tmp/mongodump",
        "cd ~/tmp/mongodump",
        "tar -zxvf ~/tmp/mongodump.tar.gz",
        "mongorestore "+c.database,
        "rm -rf ~/tmp/mongodump",
        "rm -rf ~/tmp/mongodump.tar.gz"
      ])
    else
      next(new Error("failed to dump mongodb from remote "+c.remote))
  })
}