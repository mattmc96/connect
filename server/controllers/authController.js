const bcrypt = require('bcryptjs')

module.exports = {
  register: async (req, res) => {
    const db = req.app.get('db')

    const { email, password } = req.body

    const [user] = await db.check_user([email])

    if (user) {
      return res.status(409).send('user already exists')
    }
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    const [newUser] = await db.register_user([email.hash])

    req.session.user = newUser
  },
  login: async (req, res) => {
    const db = req.app.get('db')

    const { email, password } = req.body

    const [exsistingUser] = await db.check_user([email])

    if (!exsistingUser) {
      return res.satus(404).send('User not found')
    }

    const isAuthenticated = bcrypt.compareSync(password, exsitingUser.hash)

    if (!isAuthenticated) {
      return res.status(403).send('Incorrect email or password')
    }

    delete exsistingUser.hash

    req.session.user = exsistingUser

    res.status(200).send(req.session.user)
  },
  logout: (req, res) => {
    req.session.destroy()
    res.sendStatus(200)
  },
  getUsers: async (req, res) => {},
}
