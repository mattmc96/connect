import React, { Component } from 'react'
import axios from 'axios'
import Post from './Post'

class Feed extends Component {
  constructor(props) {
    super(props)

    this.state = {
      posts: [],
    }
    this.getAllPosts = this.getAllPosts.bind(this)
    this.deletePost = this.deletePost.bind(this)
  }
  componentDidMount() {
    this.getAllPosts()
  }

  getAllPosts = () => {
    axios.get('/api/posts').then((res) => {
      this.setState({
        posts: res.data,
      })
    })
  }

  deletePost = (id) => {
    axios
      .delete(`/api/post/${post_id}`)
      .then((res) => this.getAllPosts())
      .catch((err) => console.log('Dont worry bud try again later', err))
  }

  render() {
    return (
      <div>
        {this.state.posts.map((e) => {
          return <APost allPosts={e} key={e.id} deletePost={this.deletePost} />
        })}
      </div>
    )
  }
}
export default Feed
