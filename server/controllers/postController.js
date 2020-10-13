module.exports = {
  getPosts: (req, res) => {
    const db = req.app.get('db')

    db.get_posts()
      .then((feed) => res.status(200).send(feed))
      .catch((err) => console.log('err'))
  },
  editPost: (req, res) => {
    const db = req.app.get('db')
    const { post_id } = req.params
    const { content, image_url, created_at } = req.body

    db.edit_post(post_id, content, image_url, created_at)
      .then(() => {
        res.status(200).send()
      })
      .catch((err) => console.log('err'))
  },
  deletePost: (req, res) => {
    const db = req.app.get('db')
    const { post_id } = req.params

    db.delete_post(post_id)
      .then(() => {
        res.send(200).send(feed)
      })
      .catch((err) => console.log('err'))
  },
  addPost: (req, res) => {
    const db = req.app.get('db')
    const { content, image_url, created_at } = req.body

    db.add_post(content, image_url, created_at)
      .then((feed) => {
        res.status(200).send(feed)
      })
      .catch((err) => console.log('err'))
  },
  getOne: (req, res) => {
    const db = req.app.get('db')
    const { id } = req.params

    db.get_one(id)
      .then((feed) => {
        feed = feed[0]
        res.status(200).send(feed)
      })
      .catch((err) => console.log('Dont worry bud try again later 4'))
  },
}
