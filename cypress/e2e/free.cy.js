describe('FREE Features', () => {
  beforeEach(() => {
    cy.sessionLogin(Cypress.env('environment'), 'FREE')
  })

  it('does something as a FREE user', () => {
    // Test logic here
  })

  it('does something else as a FREE user', () => {
    // Test logic here
  })
})
