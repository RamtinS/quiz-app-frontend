// https://on.cypress.io/api

describe('My First Test', () => {
  it('loads homepage', () => {
    cy.visit('/')
    cy.contains('h1', 'Welcome to the home page')
  })
})
