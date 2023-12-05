describe('access to shopping cart with api', ()=> {
    let authToken;

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
    
    
    it('unauthorized', () => {
        cy.request ({
            method: 'GET',
            url:'http://localhost:8081/orders',
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401);
        })
    })

    it('authorized', () => {
        cy.request({
          method: 'GET',
          url: 'http://localhost:8081/orders',
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        }).then((response) => {
            expect(response.status).to.eq(200);
        })
    })

    it('verify order lines', () => {
        cy.request({
          method: 'GET',
          url: 'http://localhost:8081/orders',
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        }).then((response) => {
            expect(response.status).to.eq(200);
            const orderLines = response.body.orderLines;
            expect(orderLines).length.to.be.greaterThan(0);
        })
    })

    it('view cart products', () => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:8081/orders',
            headers: {
            Authorization: `Bearer ${authToken}`
              }
        }).then((response) => {
            expect(response.status).to.eq(200);
            response.body.orderLines.forEach((orderLine) => {
                expect(orderLine.product).to.be.an('object'); 
            })
        })
    })

    it('adding a product with stock to the cart', () => {
        cy.request ({
            method: 'PUT',
            url:'http://localhost:8081/orders/add',
            headers: {
                Authorization: `Bearer ${authToken}`
                  },
            body: {
                product: '10',
                quantity: '1'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
        })
    })

    it('adding a product without stock to the cart', () => {
        cy.request ({
            method: 'PUT',
            url:'http://localhost:8081/orders/add',
            headers: {
                Authorization: `Bearer ${authToken}`
                  },
            body: {
                product: '3',
                quantity: '1'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
        })
    })


})