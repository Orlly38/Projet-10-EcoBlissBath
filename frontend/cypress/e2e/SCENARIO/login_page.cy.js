describe('login page ', ()=> {
    it('password error should be visible', () => {
        cy.visit ('http://localhost:8080/#/')
        cy.get ('[data-cy="nav-link-login"]').click()
        cy.get ('[data-cy="login-input-username"]').type('test2@test.fr')
        cy.get ('[data-cy="login-input-password"]').type('1234')
        cy.get ('[data-cy="login-submit"]').click()
        cy.contains ('Identifiants incorrects').should('be.visible');
    })  

    it('the empty fields error should be visible', () => {
        cy.visit ('http://localhost:8080/#/')
        cy.get ('[data-cy="nav-link-login"]').click()
        cy.get ('[data-cy="login-submit"]').click()
        cy.contains ('Merci de remplir correctement tous les champs').should('be.visible');
    })  
    
    it('correct username and password', () => {
        cy.visit ('http://localhost:8080/#/')
        cy.get ('[data-cy="nav-link-login"]').click()
        cy.get ('[data-cy="login-input-username"]').type('test2@test.fr')
        cy.get ('[data-cy="login-input-password"]').type('testtest')
        cy.get ('[data-cy="login-submit"]').click()
        cy.contains ('Mon panier').should('be.visible');
    })  
})
