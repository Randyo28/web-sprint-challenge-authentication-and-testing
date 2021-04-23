const { findBy } = require('./auth-model')

async function checkUsernameExists(req, res, next) {
  const { username } = req.body

  const [user] = await findBy({ username })

  if (!user) {
    res.status(401).json({ message: 'Invalid credentials' })
  } else {
    req.user = user
    next()
  }
}

module.exports = {
  checkUsernameExists,
}
