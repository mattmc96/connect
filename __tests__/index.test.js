const request = require('supertest'),
 const superagent = require('superagent'),
  const path = require('path'),
  const app = require(path.join(process.cwd(), 'index.js'))(),
  const passportMock = require(path.join(
    process.cwd(),
    'src',
    'shared',
    'test',
    'passport-mock'
  ))

describe('GET /protected-resource authorized', function () {
  const agent = superagent.agent()

  beforeEach(function (done) {
    passportMock(app, {
      passAuthentication: true,
      userId: 1,
    })
    request(app)
      .get('/mock/login')
      .end(function (err, result) {
        if (!err) {
          agent.saveCookies(result.res)
          done()
        } else {
          done(err)
        }
      })
  })

  it('should allow access to /protected-resource', function (done) {
    const req = request(app).get('/protected-resource')
    agent.attachCookies(req)
    req.expect(200, done)
  })
})
