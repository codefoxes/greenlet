/**
 * Customizer Tests.
 */

import 'cypress-wait-until'

describe('Customizer', () => {

	before(() => {
		let url = Cypress.env( Cypress.env('ENV') );
		let customizerUrl = `${url}/wp-admin/customize.php`
		cy.visit(customizerUrl);
		cy.request(customizerUrl).then(() => {
			cy.get( '#user_login' ).type( Cypress.env( 'admin_user' ) );
			cy.get( '#user_pass' ).type( Cypress.env( 'admin_pass' ) );
			cy.get( '#wp-submit' ).click();
		})

		Cypress.Cookies.defaults({
			whitelist: /wordpress_.*/
		})
	})

	after( () => {
		cy.get('#customize-header-actions a.customize-controls-close').click( { force: true } )
		cy.get('#wp-admin-bar-logout a').click({ force: true })
	})

	it('Should contain Blog settings', () => {
		cy.get('#accordion-panel-blog').contains('Blog')
	})

	it('Should contain Post List', () => {
		cy.get('#accordion-section-blog_list').contains('Post List')
	})

	it('Should contain Single Post', () => {
		cy.get('#accordion-section-blog_single').contains('Single Post')
	})

	it('Should contain Single Page', () => {
		cy.get('#accordion-section-blog_page').contains('Single Page')
	})

	// Todo: add more tests.
})
