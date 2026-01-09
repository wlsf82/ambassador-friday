describe('PRO Features', () => {
  beforeEach(() => {
    cy.sessionLogin(Cypress.env('environment'), 'PRO')
  })

  it('does something as a PRO user', () => {
    // Test logic here
  })

  it('does something else as a PRO user', () => {
    // Test logic here
  })
})
