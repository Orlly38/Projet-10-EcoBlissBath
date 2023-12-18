export  function  connexion () {
  cy.visit ('http://localhost:8080/#/')
  cy.get ('[data-cy="nav-link-login"]').click();
  cy.get ('[data-cy="login-input-username"]').clear();
  cy.get ('[data-cy="login-input-username"]').type('test2@test.fr');
  cy.get ('[data-cy="login-input-password"]').clear();
  cy.get ('[data-cy="login-input-password"]').type('testtest');
  cy.get ('[data-cy="login-submit"]').click();
  cy.contains ('Mon panier').should('be.visible');

}