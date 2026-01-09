Cypress.Commands.add('login', (environment, userType) => {
  setEnvironmentCredentials(environment)

  cy.visit('/login')

  const email = Cypress.env('credentials')[userType].USER_EMAIL
  const password = Cypress.env('credentials')[userType].USER_PASSWORD

  cy.get('input[placeholder="Email"]').type(email)
  cy.get('input[placeholder="Password"]').type(password, { log: false })
  cy.contains('button', 'Login').click()

  cy.url().should('be.equal', `${Cypress.config('baseUrl')}/dashboard`)
  cy.get('[data-testid="avatar"]').should('be.visible')
})

Cypress.Commands.add('sessionLogin', (environment, userType) => {
  setEnvironmentCredentials(environment)

  const setup = () => {
    cy.login(environment, userType)
  }

  const sessionId = Cypress.env('credentials')[userType].USER_EMAIL

  cy.session(sessionId, setup)
  cy.visit('/dashboard')
})

function setEnvironmentCredentials(environment) {
  switch (environment) {
    case 'local':
      Cypress.env('credentials', Cypress.env('LOCAL_CREDENTIALS'))
      break
    case 'test':
      Cypress.env('credentials', Cypress.env('TEST_CREDENTIALS'))
      break
    case 'staging':
      Cypress.env('credentials', Cypress.env('STAGING_CREDENTIALS'))
      break
    case 'prod':
      Cypress.env('credentials', Cypress.env('PROD_CREDENTIALS'))
      break
    default:
      cy.log(`Invalid environment: ${environment}`)
  }
}
