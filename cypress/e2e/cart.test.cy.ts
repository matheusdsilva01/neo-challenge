describe('Cart page e2e', () => {
  const basePath = 'http://localhost:3000/comic/376';

	beforeEach(() => {
		cy.intercept({
      method: 'GET',
      url: '**/gateway.marvel.com/v1/public/comics/376**',
    }, {
      fixture: 'marvel/comic-376.json',
    })
  })

  it('should add a Comic to the cart', () => {
    cy.visit(basePath);
    cy.contains('Adicionar ao carrinho').click();
    cy.contains('Carrinho').click();
		cy.url().should('include', '/cart');
    cy.contains('Ant-Man (2003) #3').should('exist').and('be.visible');
  });
	it('should buy the cart', () => {
		cy.visit(basePath);
		cy.contains('Adicionar ao carrinho').click();
		cy.contains('Carrinho').click();
		cy.url().should('include', '/cart');
		cy.contains('Ant-Man (2003) #3').should('exist').and('be.visible');

		cy.contains('Comprar').click();
		// this will be show a alert on screen
		cy.on('window:alert', (str) => {
			expect(str).to.equal('Compra realizada');
		});
		cy.contains('Ant-Man (2003) #3').should('not.exist');
	});

});