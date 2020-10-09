/* eslint-disable import/prefer-default-export */
import React from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text',
  },
  {
    title: 'Calendar',
    path: '/calendar',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text',
  },
  {
    title: 'Profile',
    path: '/profile',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text',
  },
  {
    title: 'Chat',
    path: '/join',
    icon: <FaIcons.FaRegCommentDots />,
    cName: 'nav-text',
  },
  {
    title: 'Post',
    path: '/post',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text',
  },
  {
    title: 'ReadME',
    path: 'https://github.com/mattmc96/connect',
    icon: <FaIcons.FaGithub />,
    cName: 'nav-text',
  },
]
