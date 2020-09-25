module.exports = (req, res, next) => {
  if (req.user) {
    next()
  } else {
    res.status(401).send(`Welcome ${req.user.email}!`)
  }
}
