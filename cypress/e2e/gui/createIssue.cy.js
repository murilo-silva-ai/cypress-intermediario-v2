import { faker } from '@faker-js/faker'

const options = { env: { snapshotOnly: true } }

describe('Issue', options, () => {
    const issue = {
        title: `issue-${faker.datatype.uuid()}`,
        description: faker.random.words(5),
        project: {
            name: `Project-${faker.datatype.uuid()}`,
            description: faker.random.words(5)
        }
    }

    beforeEach(() => {
        cy.api_deleteProject()
        cy.api_createProject(issue.project)
        cy.login()
    })

    it('Create an issue successfully', () => {
        cy.gui_createIssue(issue)

        cy.contains(issue.title).should('be.visible')
        cy.contains(issue.description).should('be.visible')
    })
})