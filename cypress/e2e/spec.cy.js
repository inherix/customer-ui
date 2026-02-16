describe('My First test', () => {
  it('Gets, types and asserts', () => {
    cy.visit('http://localhost:5000')
    cy.visit('http://localhost:5000/signin')

    cy.get('input[name="email"]').type('bandaruy119@gmail.com')
    cy.get('input[name="password"]').type('Yashu@12345')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/dashboard')
  })
})
