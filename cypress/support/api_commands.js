const accessToken = `Bearer ${Cypress.env('gitlab_access_token')}`

Cypress.Commands.add('api_createProject', project => {
    cy.request({
        method: 'POST',
        url: '/api/v4/projects/',
        body: {
            name: project.name,
            description: project.description,
            initialize_with_readme: true
        },
        header: { Authorization: accessToken },
    })
})