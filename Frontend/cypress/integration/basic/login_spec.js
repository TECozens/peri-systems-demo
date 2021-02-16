const BASE_URL = 'http://localhost:3000'

describe('Login page', () => {
  context('Are the elements rendering correctly?', () => {
    it('Heading', () => {
      cy.visit(`${BASE_URL}/login`)
      cy.contains('Sign into your PERI Dashboard')
    })

    it('Email', () => {
      cy.visit(`${BASE_URL}/login`)
      cy.contains('Email')
    })

    it('Password', () => {
      cy.visit(`${BASE_URL}/login`)
      cy.contains('Password')
    })
  })

  context('User experience', () => {
    it('Email is auto-focused on page load', () => {
      cy.focused().should('have.id', 'email')
    })
  })
})