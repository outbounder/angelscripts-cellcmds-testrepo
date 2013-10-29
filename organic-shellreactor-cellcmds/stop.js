module.exports = function(c, next) {
  next("ssh "+c.remote, "Tissue -action stop -target "+c.target)
}