import { faker } from '@faker-js/faker'

const options = { env: { snapshotOnly: true } }

describe('Milestone', options, () => {
    const milestone = {
        title: `Milestone-${faker.datatype.uuid()}`,
        issue: {
            title: `Issue - ${faker.datatype.uuid()}`,
            description: faker.random.words(5),
            project: {
                name: `Project-${faker.datatype.uuid()}`,
                description: faker.random.words(5)
            }
        }
    }

    beforeEach(() => {
        cy.login()
        cy.api_deleteProject()
        cy.api_createIssue(milestone.issue).then(res => {
            cy.api_createMilestone(res.body.project_id, milestone)
            cy.visit(`${Cypress.env('user_name')}/${milestone.issue.project.name}/issues/${res.body.iid}`)
        })
    })

    it('Adds a milestone sucessfully into an issue', () => {
        cy.gui_setMilestoneOnIssue(milestone)

        cy.get('.block.milestone').should('contain', milestone.title)
    })
})