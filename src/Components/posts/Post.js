import React, { Component } from 'react'
import axios from 'axios'

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

  componentDidMount() {}
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
          value={this.state.img}
          onChange={(e) => this.handleImg(e.target.value)}
        />
        <p>Content:</p>
        <input
          type="text"
          className="form"
          value={this.state.name}
          onChange={(e) => this.handleName(e.target.value)}
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
