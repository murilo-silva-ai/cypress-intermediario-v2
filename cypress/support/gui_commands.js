Cypress.Commands.add('login', (
    user = Cypress.env('user_name'),
    password = Cypress.env('user_password'),
    { cacheSession = true } = {},
) => {
    const login = () => {
        cy.visit('/users/sign_in')

        cy.get("[data-qa-selector='login_field']").type(user)
        cy.get("[data-qa-selector='password_field']").type(password, { log: false })
        cy.get("[data-qa-selector='sign_in_button']").click()
    }

    const validate = () => {
        cy.visit('/')
        cy.location('pathname', { timeout: 1000 })
            .should('not.eq', '/users/sign_in')
    }

    const options = {
        cacheAcrossSpecs: true,
        validate,
    }

    if (cacheSession) {
        cy.session(user, login, options)
    } else {
        login()
    }
})

Cypress.Commands.add('logout', () => {
    cy.visit('/')
    cy.get('[data-qa-selector="user_menu"]').click()
    cy.get('[data-qa-selector="sign_out_link"]')
        .should('be.visible')
        .click()
})

Cypress.Commands.add('gui_createProject', (project) => {
    cy.visit('/projects/new')
    cy.get('#project_name')
        .should('be.visible')
        .type(project.name)
    cy.get('#project_description').type(project.description)
    cy.get('[id="project_initialize_with_readme"]').check()
    cy.contains('input[value="Create project"]', 'Create project')
        .scrollIntoView()
        .click()
})

Cypress.Commands.add('gui_createIssue', (issue) => {
    cy.visit(`/${Cypress.env('user_name')}/${issue.project.name}/issues/new`)
    cy.get('#issue_title')
        .should('be.visible')
        .type(issue.title)
    cy.get('#issue_description').type(issue.description)
    cy.get('.js-assignee-search').click()
    cy.contains('span', 'Select assignee').should('be.visible')
    cy.contains('span', '@root').click()
    cy.get('.qa-issuable-milestone-dropdown').click()
    cy.contains('span', 'Select milestone').should('be.visible')
    cy.contains('a', 'No Milestone').click()
    cy.get('.qa-issuable-label').click()
    cy.contains('span', 'Select label').should('be.visible')
    cy.contains('a', 'No Label').click()
    cy.get('[class="dropdown-title-button dropdown-menu-close"]')
        .eq(2)
        .click()
    cy.get('#issuable-due-date').type('01/01/2050')
    cy.get('input[value="Submit issue"]').click()
})

Cypress.Commands.add('gui_createLabel', (label) => {
    cy.visit(`/${Cypress.env('user_name')}/${label.project.name}/-/labels`)
    cy.get('.qa-label-create-new').click()
    cy.get('#label_title').type(label.title)
    cy.get('#label_description').type(label.description)
    cy.get('#label_color')
        .clear()
        .type('#69D100')
    cy.get('input[value="Create label"]').click()
})
