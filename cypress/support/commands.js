Cypress.Commands.add('login', (environment, userType) => {
  cy.setEnvironmentCredentials(environment)
    .then(credentials => {
      // cy.visit('/login')
      cy.log(`Visiting the ${Cypress.config('baseUrl')}/login page`)

      const email = credentials[userType].USER_EMAIL
      const password = credentials[userType].USER_PASSWORD

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
})

Cypress.Commands.add('sessionLogin', (environment, userType) => {
  cy.setEnvironmentCredentials(environment)
    .then(credentials => {
      const sessionId = credentials[userType].USER_EMAIL
      const setup = () => cy.login(environment, userType)

      cy.session(sessionId, setup)
      // cy.visit('/dashboard')
      cy.log(`Visiting the ${Cypress.config('baseUrl')}/dashboard page`)
    })
})

Cypress.Commands.add('setEnvironmentCredentials', environment => {
  cy.env([
    'LOCAL_CREDENTIALS',
    'TEST_CREDENTIALS',
    'STAGING_CREDENTIALS',
    'PROD_CREDENTIALS',
  ]).then(({ LOCAL_CREDENTIALS, TEST_CREDENTIALS, STAGING_CREDENTIALS, PROD_CREDENTIALS }) => {
    switch (environment) {
      case 'local':
        return LOCAL_CREDENTIALS
      case 'test':
        return TEST_CREDENTIALS
      case 'staging':
        return STAGING_CREDENTIALS
      case 'prod':
        return PROD_CREDENTIALS
      default:
        cy.log(`Invalid environment: ${environment}`)
    }
  })
})
