describe('LogOut', () => {
    beforeEach(() => {
        cy.login()
    })
    it('logs out successfully', () => {
        cy.logout()

        cy.url().should('be.equal', `${Cypress.config('baseUrl')}/users/sign_in`)
        cy.get('#login-pane').should('be.visible')
    })
})