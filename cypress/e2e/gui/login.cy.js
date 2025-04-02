describe('Login', () => {
  it('logs in successfully', () => {
    const user = Cypress.env('user_name')
    const password = Cypress.env('user_password')
    const options = { cacheSession: false }

    cy.login(user, password, options)

    cy.get('.navbar-gitlab').should('be.visible')
  })
})