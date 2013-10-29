module.exports = function(c, next) {
  next("ssh "+c.remote, [
    "cd "+c.cwd,
    "git pull origin "+c.branch,
    "npm install --production",
    "Tissue -action restart -target "+c.target
  ])
}