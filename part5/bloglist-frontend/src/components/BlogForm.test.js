import React from 'react'
import BlogForm from './BlogForm'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

test('<BlogForm> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()
  const component = render(<BlogForm createBlog={createBlog} />)

  const titleInput = component.container.querySelector('#title')
  const authorInput = component.container.querySelector('#author')
  const urlInput = component.container.querySelector('#url')

  const form = component.container.querySelector('form')

  fireEvent.change(titleInput, {
    target: { value: 'Title of new blog' },
  })
  fireEvent.change(authorInput, {
    target: { value: 'Author of be blog' },
  })
  fireEvent.change(urlInput, {
    target: { value: 'URL of new blog' },
  })

  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)

  expect(createBlog.mock.calls[0][0].title).toBe('Title of new blog')
  expect(createBlog.mock.calls[0][0].author).toBe('Author of be blog')
  expect(createBlog.mock.calls[0][0].url).toBe('URL of new blog')
})
