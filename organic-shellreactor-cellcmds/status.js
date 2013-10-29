module.exports = function(c, next) {
  next("ssh "+c.remote, [
    "cd "+c.cwd,
    "Tissue -action status -target "+c.target
  ])
}