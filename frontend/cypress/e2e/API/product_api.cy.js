describe('product info ', ()=> {
    it('product sheet', () => {
            cy.request ({
                method: 'GET',
                url:'http://localhost:8081/products/3',
            }).then((response) => {
                expect(response.status).to.eq(200);
                const productSheet = response.body;
                expect(productSheet.name).to.eq('Sentiments printaniers');
                expect(productSheet.skin).to.eq('Propre, fraîche');
                expect(productSheet.aromas).to.eq('Frais et fruité');
                expect(productSheet.ingredients).to.eq('Framboise, zeste de citron et feuille de menthe');
                expect(productSheet.description).to.eq('Savon avec une formule douce à base d’huile de framboise, de citron et de menthe qui nettoie les mains efficacement sans les dessécher.');
                expect(productSheet.price).to.eq(60);
            })
    })  
})