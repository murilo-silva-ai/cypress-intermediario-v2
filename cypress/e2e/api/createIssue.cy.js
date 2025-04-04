import { faker } from '@faker-js/faker'

const options = { env: { snapshotOnly: true } }

describe('Create Issue - API', () => {
    const issue = {
        title: `Issue - ${faker.datatype.uuid()}`,
        description: faker.random.words(5),
        project: {
            name: `Project - ${faker.datatype.uuid()}`,
            description: faker.random.words(5)
        }
    }
    beforeEach(() => { cy.api_deleteProject() })

    it('Creates an Issue sucessfully with API', options, () => {
        cy.api_createIssue(issue)
            .then(response => {
                expect(response.status).to.equal(201)
                expect(response.body.title).to.equal(issue.title)
                expect(response.body.description).to.equal(issue.description)
            })
    })
})