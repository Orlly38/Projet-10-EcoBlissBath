describe('adding a product to the cart', ()=> {
    let stockAvant;
    let stockCart
    let stockApres;
    
    it('adding a product to the cart', () => {
        cy.visit ('http://localhost:8080/#/')

    // On se connecte en tant que client pour avoir accès au panier
        cy.get ('[data-cy="nav-link-login"]').click()
        cy.get ('[data-cy="login-input-username"]').type('test2@test.fr')
        cy.get ('[data-cy="login-input-password"]').type('testtest')
        cy.get ('[data-cy="login-submit"]').click()
        cy.contains ('Mon panier').should('be.visible');

    //On va sur la page des produits pour en sélectionner un
        cy.get ('[data-cy="nav-link-products"]').click()
        cy.get ('button').eq(2).should('contain', 'Consulter').click()

    //On vérifie la quantité en stock avant ajout au panier
        cy.wait (2000)
        cy.get('[data-cy="detail-product-stock"]').invoke('text').then((qttAvant) => {alert(qttAvant)
            stockAvant = parseInt(qttAvant.split(' ')[0]);
        })

    //On ajoute au panier    
        cy.get ('[data-cy="detail-product-add"]').click()

    //On va sur le panier vérifier que le produit a bien été ajouté    
        cy.contains ('Poussière de lune').should('be.visible');
        cy.get('[data-cy="cart-line-quantity"]').invoke('text').then((qttCart) => {
            stockCart = parseInt(qttCart.split(' ')[0]);
        })

    //On retourne sur la page du produit pour vérifier que la quantité a bien diminué    
        cy.get ('[data-cy="nav-link-products"]').click()
        cy.get ('button').eq(2).should('contain', 'Consulter').click()
        cy.wait (2000)
        cy.get('[data-cy="detail-product-stock"]').invoke('text').then((qttApres) => {alert(qttApres)
            stockApres = parseInt(qttApres.split(' ')[0]);
        
        expect(stockAvant - stockCart).to.equal(stockApres);
    })
    })  

})
