import { faker } from '@faker-js/faker'

describe('Issue', () => {
    const issue = {
        title: `issue-${faker.datatype.uuid()}`,
        description: faker.random.words(5),
        project: {
            name: `Project-${faker.datatype.uuid()}`,
            description: faker.random.words(5)
        }
    }

    beforeEach(() => {
        cy.login()
        cy.gui_createProject(issue.project)
    })

    it('Create an issue successfully', () => {
        cy.gui_createIssue(issue)

        cy.contains(issue.title).should('be.visible')
        cy.contains(issue.description).should('be.visible')
    })
})