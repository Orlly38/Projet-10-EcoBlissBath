describe('login page with api', ()=> {
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
    
    it('login test false', () => {
        cy.request ({
            method: 'POST',
            url:'http://localhost:8081/login',
            body: {
                username: 'test2@test.fr',
                password: '1234'},
            failOnStatusCode:false
        }).then((response) => {
            expect(response.status).to.eq(401); 
        })
    })
})
