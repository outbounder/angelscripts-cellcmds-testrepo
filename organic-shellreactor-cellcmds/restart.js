module.exports = function(c, next) {
  next("ssh "+c.remote, "Tissue -action restart -target "+c.target)
}