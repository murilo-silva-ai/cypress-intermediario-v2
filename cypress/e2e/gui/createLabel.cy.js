import { faker } from '@faker-js/faker'

const options = { env: { snapshotOnly: true } }

describe('Create Label - GUI', options, () => {
    const label = {
        title: `Label - ${faker.datatype.uuid()}`,
        description: faker.random.words(5),
        project: {
            name: `Project-${faker.datatype.uuid()}`,
            description: faker.random.words(5)
        }
    }

    beforeEach(() => {
        cy.api_deleteProject()
        cy.api_createProject(label.project)
        cy.login()
    })

    it('Create a Label sucessfuly - GUI', () => {
        cy.gui_createLabel(label)

        cy.get('[class="badge color-label "]')
            .should('be.visible')
            .and('contain.text', label.title)
        cy.get('.description-text')
            .should('be.visible')
            .and('contain.text', label.description)
    })
})

describe('Create label - API', options, () => {
    const label = {
        name: `Label - ${faker.datatype.uuid()}`,
        description: faker.random.words(5),
        color: '#ffaabb',
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
        cy.api_deleteProject()
        cy.login()
        cy.api_createIssue(label.issue)
            .then(res => {
                cy.api_createLabel(res.body.project_id, label)
                cy.visit(`${Cypress.env('user_name')}/${label.issue.project.name}/issues/${res.body.iid}`)
            })
    })

    it('Add label to an issue successfully - GUI', () => {
        cy.get('.qa-edit-link-labels').click()
        cy.get('.label-item')
            .should('be.visible')
            .and('contain.text', label.name)
            .click()
        cy.get('body').click()

        cy.get('.qa-labels-block').should('contain', label.name)
        cy.get('.qa-labels-block span')
            .should('have.attr', 'style', `background-color: ${label.color}; color: #333333;`)
    })
})