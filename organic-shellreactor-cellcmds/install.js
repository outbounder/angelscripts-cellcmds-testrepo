module.exports = function(c, next) {
  next("ssh "+c.remote, [
    "mkdir -p "+c.cwd,
    "git clone "+c.source+" "+c.cwd,
    "git checkout "+c.branch,
    "npm install --production"
  ])
}