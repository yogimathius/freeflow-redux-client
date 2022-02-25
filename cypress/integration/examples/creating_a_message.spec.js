describe.skip('Creating a post', () => {
  it('Displays the post in the list', () => {
    cy.visit('/')

    cy.get('[data-testid="postTitle"]')
      .type('This is a New title')

    cy.get('select')
      .select('Test FreeFlow')

    cy.get('[data-testid="postText"]')
      .type('This is a New post')

    cy.get('[data-testid="sendButton"]')
      .click({ force: true })

    cy.get('[data-testid="postText"]')

    cy.contains('This is a New post')

    cy.get('.post-excerpt > p')

    cy.contains('This is a New title')

    cy.contains('This is a New post')
  })
})
