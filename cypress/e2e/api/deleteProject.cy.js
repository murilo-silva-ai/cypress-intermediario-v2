import { faker } from '@faker-js/faker'

describe('Delete project by API', () => {
    const project = {
        name: `Project-${faker.datatype.uuid()}`,
        description: faker.random.words(5)
    }

    it('Delete project successfully using API', () => {
        cy.api_createProject(project)
        cy.api_deleteProject()
    })
})