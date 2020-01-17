/**
 * Homepage Tests.
 */

describe('Default Homepage', () => {

    before(() => {
        let url = Cypress.env( Cypress.env('ENV') );
        cy.visit(url);
        cy.request(url).then((response) => { expect(response.status).to.eq(200) })
    })

    it('Should have Title', () => {
        cy.title().its('length').should('be.gt', 0)
        cy.log('Verified Title')
    })

    it('Should have UTF-8 charset', () => {
        cy.document().should('have.property', 'charset').and('eq', 'UTF-8')
    })

    it('Should have Header Section', () => {
        cy.get('header').should('have.id', 'header')
    })

    it('Should have Main Content Section', () => {
        cy.get('section').should('have.id', 'content')
    })

    it('Should have Footer Section', () => {
        cy.get('footer').should('have.id', 'footer')
    })

    it('Should have Menu', () => {
        cy.get('header').find('nav').should('be.visible')
    })

    describe('Layout', () => {
        it('Header should be 12', () => {
            cy.get('header').find('nav').should('be.visible')
        })
    })
})
