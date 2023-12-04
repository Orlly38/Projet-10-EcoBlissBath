describe('addind a review', ()=> {
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

    it('adding a review', () => {
        cy.request ({
            method: 'POST',
            url:'http://localhost:8081/reviews',
            headers: {
                Authorization: `Bearer ${authToken}`
              },
            body: {
                title: 'Ceci est le titre de mon avis',
                comment: 'Ceci est un commentaire pour tester les avis',
                rating: '5'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
        })
    })
})