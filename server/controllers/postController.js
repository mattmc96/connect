const getAllPosts = async (db) => {
  const posts = await db.get_posts()
  return posts
}

module.exports = {
  getPosts: async (req, res) => {
    const db = req.app.get('db')
    const posts = await db.get_posts(db)
    res.status(200).send(posts)
  },
  editPost: async (req, res) => {
    const db = req.app.get('db')
    const { post_id } = req.params
    await db.edit_post([content, post_id])
    const posts = await getAllPosts(db)
    res.status(200).send(posts)
  },
  deletePost: async (req, res) => {
    const db = req.app.get('db')
    const { post_id } = req.params
    await db.delete_post([post_id])
    const posts = await getAllPosts(db)
    res.status(200).send(posts)
  },
  // addPosts: (req, res) => {
  //   const db = req.app.get('db')
  //   const { id } = req.params
  //   const { content, image_url, created_at } = req.body

  //   db.add_post(id, content, image_url, created_at)
  //     .then((posts) => {
  //       res.status(200).send(posts)
  //     })
  //     .catch((err) => console.log('error on posts'))
  // },
}
