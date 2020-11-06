import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  title: 'Waking up',
  author: 'Sam Harris',
  url: 'https://samharris.org/',
  likes: 10,
  user: {
    username: 'testUser',
    name: 'Test Person',
    id: '5f9ad5805c9dfc38c61a9b3d',
  },
}
const user = {
  username: 'testUser',
  name: 'Test Person',
  id: '5f9ad5805c9dfc38c61a9b3d',
}

test('Only displays blogs title and author initially', () => {
  const component = render(<Blog blog={blog} user={user} />)
  const div = component.container.querySelector('.blogTogglingComponent')

  expect(div).toHaveStyle('display: none')
})

test('blogs url and number of likes are displayed when like button clicked', () => {
  //   const mockHandler = jest.fn()
  const component = render(<Blog blog={blog} user={user} />)
  const button = component.getByText('View')
  fireEvent.click(button)

  const div = component.container.querySelector('.blogTogglingComponent')

  expect(div).not.toHaveStyle('display: none')
})

test('If button is clicked twice ', () => {
  const mockHandler = jest.fn()

  const component = render(<Blog blog={blog} user={user} updateLikes={mockHandler}/>)
  const likesButton = component.container.querySelector('.likesButton')

  fireEvent.click(likesButton)
  fireEvent.click(likesButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
