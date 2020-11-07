describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Akash Mehta',
      username: 'akash',
      password: 'salainen',
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })
  it('Login form is shown', function () {
    cy.contains('Login').click()
    cy.contains('Log in')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('Login').click()
      cy.contains('Log in').click()
      cy.get('#username').type('akash')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('Akash Mehta is loged in')
    })
    it('fails with wrong credentials', function () {
      cy.contains('Login').click()
      cy.contains('Log in').click()
      cy.get('#username').type('blag')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.get('.error').contains('Wrong')
      cy.get('html').should('not.contain', 'Akash Mehta loged in')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'akash', password: 'salainen' })
    })

    it('a new blog can be created', function () {
      cy.contains('Add New Blog').click()
      cy.get('#title').type('Waking Up')
      cy.get('#author').type('Sam Harris')
      cy.get('#url').type('http://waking-up.com')
      cy.contains('Save').click()
      cy.contains('Waking Up')
    })

    describe('when a blog exists', function () {
      beforeEach(function () {
        cy.createNote({
          title: 'Another Blog',
          author: 'Another Author',
          url: 'Some URL',
        })
      })
      it('a user can like a blog', function () {
        cy.contains('View').click()
        cy.get('.likesButton').click()
        cy.contains('Likes: 1')
      })
      it('a user can delete a blog', function () {
        cy.contains('View').click()
        cy.contains('Delete').click()
        cy.get('html').should('not.contain', 'Another Blog')
      })
    })
    describe.only('When multiple blogs exist', function () {
      beforeEach(function () {
        cy.createNote({
          title: 'First Blog',
          author: 'Another Author',
          url: 'Some URL',
        })
        cy.createNote({
          title: 'Second Blog',
          author: 'Another Author',
          url: 'Some URL',
        })
        cy.createNote({
          title: 'Third Blog',
          author: 'Another Author',
          url: 'Some URL',
        })
      })
      it('a user can like a blog', function () {
        cy.get('.blogContainer').then((blogs) => {
          cy.wrap(blogs[0]).contains('View').click()
          cy.contains(/^Like$/).click()
          cy.wrap(blogs[1]).contains('View').click()
          cy.wrap(blogs[1])
            .contains(/^Like$/)
            .click()
          cy.wrap(blogs[1])
            .contains(/^Like$/)
            .click()
          cy.contains('Likes: 2').parent().parent()
          cy.get('.blogContainer').then((blog) => {
            cy.wrap(blog[0]).contains('Second Blog')
            cy.wrap(blog[1]).contains('First Blog')
            cy.wrap(blog[2]).contains('Third Blog')
          })
        })
      })
    })
  })
})
