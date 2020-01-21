/**
 * Meta boxes Tests.
 */

describe('Posts', () => {

	before(() => {
		let url = Cypress.env( Cypress.env('ENV') );
		url = `${url}/wp-admin`
		cy.visit(url);
		cy.request(url).then(() => {
			cy.get( '#user_login' ).type( Cypress.env( 'admin_user' ) );
			cy.get( '#user_pass' ).type( Cypress.env( 'admin_pass' ) );
			cy.get( '#wp-submit' ).click();
		})

		Cypress.Cookies.defaults({
			whitelist: /wordpress_.*/
		})
	})

	after( () => {
		cy.get('#wp-admin-bar-logout a').click({ force: true })
	})

	it('Should have Greenlet meta boxes', () => {
		let url = Cypress.env( Cypress.env('ENV') );
		url = `${url}/wp-admin/post-new.php`
		cy.visit(url).then((contentWindow) => {
			expect(contentWindow.find('#postparentdiv')).to.exist
			expect(contentWindow.find('#page_template')).to.exist
			expect(contentWindow.find('#sequence')).to.exist
		})
	})

	it('Should update sequence on template change', () => {
		cy.get('#page_template').select('templates/6-6.php')
		cy.wait(2000)
		cy.get('.of-input').should('have.value', 'main')
		cy.get('.of-input').should('have.value', 'sidebar-1')
	})
})
