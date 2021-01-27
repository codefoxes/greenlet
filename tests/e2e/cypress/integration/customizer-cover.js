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

	it('Should have Greenlet Section: Framework', () => {
		cy.get('#accordion-section-framework').contains('Framework')
	})

	describe('Layout', () => {
		before( () => {
			cy.get('#accordion-panel-layout').click()
		})

		after( () => {
			cy.get('.customize-panel-back:visible').click( { force: true } )
		})

		describe('Header Layout', () => {
			before( () => {
				cy.get('#accordion-section-header_section').click()
			})

			after( () => {
				const initHeight = Cypress.config( 'viewportHeight' )
				cy.viewport( Cypress.config( 'viewportWidth' ), 300 )
				cy.get('#customize-controls .control-section:visible').scrollTo(0, 0 )
				cy.get('.customize-section-back:visible').click( { force: true } )
				cy.viewport( Cypress.config( 'viewportWidth' ), initHeight )
			})

			it('Contains correct control settings', () => {
				let settings = []
				cy.window().then( win => {
					settings = win.wp.customize.control('header_layout').setting._value
				}).then(() => {
					console.log( settings )
					expect( settings ).to.deep.equal( [ {
						"columns":"3-9",
						"primary":true,
						"items":{"1":["logo","widgets"],"2":[{"id":"menu","meta":{"slug":false,"toggler":"enable"}},"widgets"]}
					} ] )
				})
			})

			it('Contains Add before & after', () => {
				cy.get('.add-before').should('be.visible')
				cy.get('.add-after').should('exist')
			})

			it('Contains Default header', () => {
				cy.get('.row').contains('Header 1')
			})

			it('Updates Header columns', () => {
				cy.get('.row:first [type="radio"]').check('2-10', { force: true })

				cy.waitUntil(() => cy.get('#customize-preview iframe').then(($iframe) => {
					const body = $iframe.contents().find('body')
					if (body.length > 0) {
						return (body.find('.row:first .header-column-1').hasClass('col-2')
							&& body.find('.row:first .header-column-2').hasClass('col-10'))
					}
					return false;
				}), { timeout: 5000 })
			})

			it('Adds Header', () => {
				cy.get('.add-after:visible button').click( { force: true } )

				cy.waitUntil(() => cy.get('#customize-preview iframe').then(($iframe) => {
					const body = $iframe.contents().find('body')
					if (body.length > 0) {
						return body.find('.header-2 .header-column-1').hasClass('col-12')
					}
					return false;
				}), { timeout: 5000 })
			})

			it('Deletes Header', () => {
				cy.get('#header_layout-root .row:nth-child(2)').click( { force: true } )
				cy.get('#header_layout-root .row:nth-child(2) [type="checkbox"]').check( { force: true } )
				cy.get('#header_layout-root .row:nth-child(2) button.delete').click( { force: true } )

				cy.waitUntil(() => cy.get('#customize-preview iframe').then(($iframe) => {
					const body = $iframe.contents().find('body')
					if (body.length > 0) {
						return body.find('.header-2').length === 0
					}
					return false;
				}), { timeout: 5000 })
			})

			// Todo: Test other header options like custom input, vertical, header contents etc.
		})
	})
})
