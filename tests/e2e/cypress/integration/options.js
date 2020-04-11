/**
 * Options Tests.
 */

describe('Backend', () => {

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

	it('Should have Title', () => {
		cy.title().its('length').should('be.gt', 0)
		cy.log('Verified Title')
	})

	it('Should have Greenlet Options', () => {
		cy.get('#menu-appearance').trigger('mouseover')
		cy.get('#menu-appearance').find('.wp-submenu li').should('contain', 'Greenlet Options')
	})

	it('Navigates to options page on click', () => {
		cy.get('#menu-appearance').trigger('mouseover')
		cy.get('a[href="themes.php?page=greenlet"]').click({ force: true });
	})

	describe('Options Page', () => {
		it('Should have Customizer Controls', () => {
			cy.get('#greenlet-options').find('.settings .heading').should('contain', 'Customizer')
		})

		it('Should have Customizer Link', () => {
			cy.get('#greenlet-options').find('.settings a').should('have.attr', 'href')
				.and('include', 'customize.php?autofocus%5Bsection%5D=title_tagline')
				.then((href) => {
					cy.visit(href).then(() => {
						cy.get('#customize-header-actions a.customize-controls-close').click()
					})
				})
		})
	})
})
