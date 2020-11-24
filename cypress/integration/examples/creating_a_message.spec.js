describe('Creating a post', () => {
  it('Displays the post in the list', () => {
    cy.visit('http://localhost:3002');

		cy.get('[data-testid="postTitle"]')
		.type('New title');

    cy.get('[data-testid="postText"]')
      .type('New post');

    cy.get('[data-testid="sendButton"]')
      .click({force: true});

    cy.get('[data-testid="postText"]')
      // .should('have.value', 'New Post');

    cy.contains('New post');
  });
});