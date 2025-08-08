describe('Home page e2e', () => {
  const basePath = 'http://localhost:3000/';
  beforeEach(() => {
    cy.intercept({
      method: 'GET',
      url: '**/gateway.marvel.com/v1/public/comics?**',
      query: {
        offset: '0',
      },
    }, {
      fixture: 'marvel/comics-page-1.json',
    })
    cy.intercept({
      method: 'GET',
      url: '**/gateway.marvel.com/v1/public/comics?**',
      query: {
        offset: '25',
      },
    }, {
      fixture: 'marvel/comics-page-2.json',
    })
  })

  it('renders the home page', () => {
    cy.visit(basePath)

    cy.contains('h1', 'Marvel Comics')
      .should('be.visible')
  })

  it('should render the comic list', () => {
    cy.visit(basePath)

    cy.contains('Marvel Previews (2017)')
      .should('exist')
      .and('be.visible')
  })

  it('should search next page api', () => {
    cy.visit(basePath)

    cy.get('[data-testid="next-page-desktop"]')
      .should('exist')
      .and('be.visible')
      .first()
      .click()

    cy.contains('Ant-Man (2003) #3')
      .should('exist')
      .and('be.visible')
  })

  before(() => {
    cy.intercept({
      method: 'GET',
      url: '**/gateway.marvel.com/v1/public/comics/376**',
    }, {
      fixture: 'marvel/comic-376.json',
    })
  })

  it('should visit the comic page', () => {

    cy.visit(basePath)

    cy.contains('Ant-Man (2003) #3')
      .should('exist')
      .and('be.visible')
      .click()

    cy.url().should('include', '/comic/376')
    cy.contains('Ant-Man (2003) #3')
      .should('exist')
      .and('be.visible')
  })
})