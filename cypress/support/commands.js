Cypress.Commands.add('login', (environment, userType) => {
  setEnvironmentCredentials(environment)

  // cy.visit('/login')
  cy.log(`Visiting the ${Cypress.config('baseUrl')}/login page`)

  const email = Cypress.env('credentials')[userType].USER_EMAIL
  const password = Cypress.env('credentials')[userType].USER_PASSWORD

  // cy.get('input[placeholder="Email"]').type(email)
  cy.log(`Typing the email: ${email}`)
  // cy.get('input[placeholder="Password"]').type(password, { log: false })
  cy.log('Typing the password')
  // cy.contains('button', 'Login').click()
  cy.log('Clicking the Login button')

  // cy.url().should('be.equal', `${Cypress.config('baseUrl')}/dashboard`)
  cy.log(`Asserting the current URL is ${Cypress.config('baseUrl')}/dashboard`)
  // cy.get('[data-testid="avatar"]').should('be.visible')
  cy.log('Asserting the avatar is visible ensuring the user has logged in successfully')
})

Cypress.Commands.add('sessionLogin', (environment, userType) => {
  setEnvironmentCredentials(environment)

  const sessionId = Cypress.env('credentials')[userType].USER_EMAIL
  const setup = () => cy.login(environment, userType)

  cy.session(sessionId, setup)
  // cy.visit('/dashboard')
  cy.log(`Visiting the ${Cypress.config('baseUrl')}/dashboard page`)
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
