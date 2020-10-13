import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

class Form extends Component {
  constructor(props) {
    super(props)

    this.state = {
      firstImage:
        'https://image.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-260nw-1037719192.jpg',
      content: '',
      image_url: '',
      edit: 'false',
      created_at: '',
    }
  }

  componentDidMount() {
    let { id } = this.props.match.params
    if (id) {
      axios
        .get(`/api/posts/${id}`)
        .then((res) => {
          this.setState({
            ...res.data,
            edit: true,
          })
        })
        .catch((err) => {
          console.log('Component NOT mounting')
        })
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.match.path !== prevProps.match.path) {
      this.setState({
        content: '',
        image_url: '',
        created_at: '',
      })
    }
  }

  handleContent = (text) => {
    this.setState({
      name: text,
    })
  }

  handleImg = (url) => {
    var img = new Image()
    img.onload = () => {
      this.setState({
        img: url,
      })
    }
    img.src = url
  }

  handleSubmit = () => {
    const { content, image_url, created_at } = this.state
    if (content) {
      const post = {
        content,
        image_url,
        created_at,
      }
      axios
        .post('/api/post', post)
        .then((res) => {
          this.props.history.push('/')
        })
        .catch((err) => console.log('put error'))
    }
  }

  handleEdit = () => {
    const { id, content, image_url, created_at } = this.state
    if (content) {
      const post = {
        content,
        image_url,
        created_at,
      }
      axios
        .put(`/api/post/${id}`, post)
        .then((res) => {
          this.props.history.push('/')
        })
        .catch((err) => console.log('error in edit'))
    }
  }

  handleClear = () => {
    if (this.props.match.params.id) {
      this.props.history.push('/')
    } else {
      this.setState({
        firstImage:
          'https://image.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-260nw-1037719192.jpg',
        content: '',
        image_url: '',
        edit: 'false',
        created_at: '',
      })
    }
  }
  render() {
    return (
      <div className="formula">
        {this.state.img ? (
          <div>
            <img className="f-img" src={this.state.img} />
          </div>
        ) : (
          <div>
            <img className="f-img" src={this.state.firstImage} />
          </div>
        )}
        <p>Carbon URL:</p>
        <input
          type="text"
          className="form"
          value={this.state.image_url}
          onChange={(e) => this.handleImg(e.target.value)}
        />
        <p>Content:</p>
        <input
          type="text"
          className="form"
          value={this.state.content}
          onChange={(e) => this.handleContent(e.target.value)}
        />
        <div className="btn-box">
          <button className="f-btn" onClick={() => this.handleClear()}>
            Cancel
          </button>
          {this.state.edit ? (
            <button className="f-btn" onClick={() => this.handleEdit()}>
              Save Changes
            </button>
          ) : (
            <button className="f-btn" onClick={() => this.handleSubmit()}>
              Submit Your Work!
            </button>
          )}
        </div>
      </div>
    )
  }
}

export default Form
