describe('Login', () => {
  it('ensure login works for ADMIN user', () => {
    cy.login(Cypress.expose('environment'), 'ADMIN')
  })

  it('ensure login works for FREE user', () => {
    cy.login(Cypress.expose('environment'), 'FREE')
  })

  it('ensure login works for PRO user', () => {
    cy.login(Cypress.expose('environment'), 'PRO')
  })
})
