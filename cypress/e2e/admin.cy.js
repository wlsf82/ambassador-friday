describe('ADMIN Features', () => {
  beforeEach(() => {
    cy.sessionLogin(Cypress.expose('environment'), 'ADMIN')
  })

  it('does something as an ADMIN user', () => {
    // Test logic here
  })

  it('does something else as an ADMIN user', () => {
    // Test logic here
  })
})
