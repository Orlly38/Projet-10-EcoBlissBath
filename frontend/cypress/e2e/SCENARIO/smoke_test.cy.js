describe('smoke test', ()=> {

    it('check the presence of fields and connection button', () => {
        //On va sur le site et on clique sur l'onglet connexion
        cy.visit ('http://localhost:8080/#/')
        cy.get ('[data-cy="nav-link-login"]').click();
        cy.get ('[data-cy="login-input-username"]').should('exist');
        cy.get ('[data-cy="login-input-password"]').should('exist');
        cy.get ('[data-cy="login-submit"]').should('exist');
    })

    it('check the presence of add to cart and availability', () => {
        //On va sur le site et on se connecte en tant que client pour avoir accès au panier
        cy.visit ('http://localhost:8080/#/')
        cy.get ('[data-cy="nav-link-login"]').click();
        cy.get ('[data-cy="login-input-username"]').type('test2@test.fr');
        cy.get ('[data-cy="login-input-password"]').type('testtest');
        cy.get ('[data-cy="login-submit"]').click();
        cy.contains ('Mon panier').should('be.visible');

        //On va sur la page des produits pour en sélectionner un
        cy.get ('[data-cy="nav-link-products"]').click();
        cy.get ('button').eq(1).should('contain', 'Consulter').click();

        //On vérifie la présence du bouton ajout au panier et la disponibilité
        cy.get ('[data-cy="detail-product-add"]').should('exist');
        cy.get ('[data-cy="detail-product-stock"]').should('exist');
    })
})