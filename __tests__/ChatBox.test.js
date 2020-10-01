import React from 'react'
import { mount } from 'enzyme'
import users from './dummy-user-data'
import ChatBox from '../Components/Chat/ChatBox'

describe('ChatBox', () => {
  describe('when targetUser is null', () => {
    it('should render Jumbotron', () => {
      const wrapper = mount(<ChatBox signedInUser={users[1]} />)
      expect(wrapper.find('.jumbotron').exists()).toBe(true)
      wrapper.unmount()
    })
  })

  describe('when targetUser is not null', () => {
    it('should render chatbox not Jumbotron', () => {
      const wrapper = mount(
        <ChatBox targetUser={users[0]} signedInUser={users[1]} />
      )
      expect(wrapper.find('.jumbotron').exists()).toBe(false)
      expect(wrapper.find('.navBarText').exists()).toBe(true)
      expect(wrapper.find('.message-list').exists()).toBe(true)
      expect(wrapper.find('.messageTextBox').exists()).toBe(true)
      expect(wrapper.find('.sendButton').exists()).toBe(true)
      wrapper.unmount()
    })
  })
})
