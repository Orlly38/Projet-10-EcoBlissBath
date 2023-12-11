describe('adding a product to the cart', ()=> {
    let authToken;
    let orderLines;
    let stockAvant1;
    let stockCart1;
    let stockApres1;
    let stockAvant2;
    let stockCart2;
    let stockApres2;

    //On connecte l'utilisateur via l'API
    it('login test true', () => {
        cy.request ({
            method: 'POST',
            url:'http://localhost:8081/login',
            body: {
                username: 'test2@test.fr',
                password: 'testtest'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('token');

            authToken = response.body.token;
        })
    })

    //On vérifie si il y a des produits dans le panier et si oui, on les supprime
    it('verify order lines', () => {
        cy.request({
          method: 'GET',
          url: 'http://localhost:8081/orders',
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        }).then((response) => {
            expect(response.status).to.eq(200);
            orderLines = response.body.orderLines;
            orderLines.forEach(line => {
                cy.request({
                    method: 'DELETE',
                    url: 'http://localhost:8081/orders/'+line.id+'/delete',
                    headers: {
                      Authorization: `Bearer ${authToken}`
                    }
                })
            });
        }) 
    })

    //On va sur le site 
    it('adding a product to the cart', () => {
        cy.visit ('http://localhost:8080/#/')

        // On se connecte en tant que client pour avoir accès au panier
        cy.get ('[data-cy="nav-link-login"]').click();
        cy.get ('[data-cy="login-input-username"]').type('test2@test.fr');
        cy.get ('[data-cy="login-input-password"]').type('testtest');
        cy.get ('[data-cy="login-submit"]').click();
        cy.contains ('Mon panier').should('be.visible');

        //On va sur la page des produits pour sélectionner le premier
        cy.get ('[data-cy="nav-link-products"]').click();
        cy.get ('button').eq(0).should('contain', 'Consulter').click();

        //On vérifie la quantité en stock avant ajout au panier
        cy.wait (1000)
        cy.get('[data-cy="detail-product-stock"]').invoke('text').then((qttAvant1) => {
            stockAvant1 = parseInt(qttAvant1.split(' ')[0]);
        })

        //On ajoute au panier plusieurs quantités d'un même produit  
        cy.get ('[data-cy="detail-product-quantity"]').click();
        cy.get ('[data-cy="detail-product-quantity"]').clear();
        cy.get ('[data-cy="detail-product-quantity"]').type('22');
        cy.get ('[data-cy="detail-product-add"]').click();

        //On va sur le panier vérifier que le produit a bien été ajouté 
        cy.wait(2000)
        cy.get ('[data-cy="nav-link-cart"]').click() ;
        cy.wait(1000)
        cy.contains ('Sentiments printaniers').should('be.visible');
        cy.get ('input').eq(0).invoke('val').then((qttCart1) => {
            stockCart1 = parseInt(qttCart1.split(' ')[0]);
        })

        //On va sur la page des produits pour sélectionner le second
        cy.get ('[data-cy="nav-link-products"]').click();
        cy.get ('button').eq(4).should('contain', 'Consulter').click();

        //On vérifie la quantité en stock avant ajout au panier
        cy.wait (1000)
        cy.get('[data-cy="detail-product-stock"]').invoke('text').then((qttAvant2) => {
            stockAvant2 = parseInt(qttAvant2.split(' ')[0]);
        })

        //On ajoute au panier plusieurs quantités d'un même produit
        cy.get ('[data-cy="detail-product-quantity"]').click();
        cy.get ('[data-cy="detail-product-quantity"]').clear();
        cy.get ('[data-cy="detail-product-quantity"]').type('22');
        cy.get ('[data-cy="detail-product-add"]').click();

        //On va sur le panier vérifier que le produit a bien été ajouté 
        cy.wait(2000)
        cy.get ('[data-cy="nav-link-cart"]').click() ;
        cy.wait(1000)
        cy.contains ('Extrait de nature').should('be.visible');
        cy.get ('input').eq(1).invoke('val').then((qttCart2) => {
            stockCart2 = parseInt(qttCart2.split(' ')[0]);
        })
    })
})