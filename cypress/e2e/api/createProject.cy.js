import { faker } from '@faker-js/faker'

describe('Project by API', () => {
    const project = {
        name: `Project-${faker.datatype.uuid()}`,
        description: faker.random.words(5)
    }

    it('Create project successfully using API', () => {
        cy.api_createProject(project).then(response => {
            expect(response.status).to.eq(201)
            expect(response.body.name).to.eq(project.name)
            expect(response.body.description).to.eq(project.description)
        })
    })
})