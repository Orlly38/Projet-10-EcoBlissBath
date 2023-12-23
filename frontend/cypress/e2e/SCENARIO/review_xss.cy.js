import {connexion} from "../FUNCTIONS/connection"

it('it did not contain XSS vulnerability', () => {
    connexion ()
    cy.get ('[data-cy="nav-link-reviews"]').click();
    cy.get ('[data-cy="review-input-rating-images"] img').first().click();
    cy.get ('[data-cy="review-input-title"]').type("Ceci est un test");
    cy.get ('[data-cy="review-input-comment"]').type('<script>alert("XSS");</script>');
    cy.get ('[data-cy="review-submit"]').click();
    cy.on('window:alert', () => {
        throw new Error('Une fenêtre d\'alerte s\'est affichée !');
    })

})