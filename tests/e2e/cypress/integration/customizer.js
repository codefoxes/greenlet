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
		cy.get('#customize-header-actions a.customize-controls-close').click()
		cy.get('#wp-admin-bar-logout a').click({ force: true })
	})

	it('Should have Greenlet Section: Framework', () => {
		cy.get('#accordion-section-framework').contains('Framework')
	})

	it('Should have Greenlet Section: Layout', () => {
		cy.get('#accordion-panel-layout').contains('Layout')
	})

	it('Should have Greenlet Section: Colors', () => {
		cy.get('#accordion-section-colors').contains('Colors')
	})

	describe('Site Identity', () => {
		before( () => {
			cy.get('#accordion-section-title_tagline').click()
		})

		after( () => {
			const initHeight = Cypress.config( 'viewportHeight' )
			cy.viewport( Cypress.config( 'viewportWidth' ), 300 )
			cy.get('#customize-controls .control-section:visible').scrollTo(0, 0 )
			cy.get('.customize-section-back:visible').click( { force: true } )
			cy.viewport( Cypress.config( 'viewportWidth' ), initHeight )
		})

		it('Can hide title', () => {
			cy.get('#_customize-input-show_title').click()

			cy.waitUntil(() => cy.get('#customize-preview iframe').then(($iframe) => {
				return $iframe.contents().find('.site-name').css( 'display' ) === 'none'
			}), { timeout: 5000 })
		})

		it('Can show title', () => {
			cy.get('#_customize-input-show_title').click()

			cy.waitUntil(() => cy.get('#customize-preview iframe').then(($iframe) => {
				return $iframe.contents().find('.site-name').css( 'display' ) !== 'none'
			}), { timeout: 5000 })
		})

		it('Can show tagline', () => {
			cy.get('#_customize-input-show_tagline').click()

			cy.waitUntil(() => cy.get('#customize-preview iframe').then(($iframe) => {
				return $iframe.contents().find('.site-tagline').css( 'display' ) !== 'none'
			}), { timeout: 5000 })
		})
	})

	describe('Performance', () => {
		before( () => {
			cy.get('#accordion-section-performance').click()
		})

		after( () => {
			cy.get('.customize-section-back:visible').click()
		})

		it('Contains Enabled Inline CSS', () => {
			cy.get('#_customize-input-inline_css:checkbox').should('be.enabled')
		})

		it('Contains Enabled Defer CSS', () => {
			cy.get('#_customize-input-defer_css:checkbox').should('be.enabled')
		})
	})

	describe('Layout', () => {
		before( () => {
			cy.get('#accordion-panel-layout').click()
		})

		after( () => {
			cy.get('.customize-panel-back:visible').click()
		})

		it('Contains Layout Sections', () => {
			cy.get('.control-subsection')
				.should('contain', 'Header Layout')
				.and('contain', 'Main Layout')
				.and('contain', 'Footer Layout')
		})

		describe('Framework', () => {
			before( () => {
				cy.get('#accordion-section-framework').click()
			})

			after( () => {
				cy.get('.customize-section-back:visible').click()
			})

			it('Contains Framework Radio', () => {
				cy.get('#customize-control-css_framework').find('label')
					.should('contain', 'Greenlet')
					.and('contain', 'Bootstrap')
			})

			it('Contains CSS Path Input', () => {
				cy.get('#_customize-input-css_path').should('have.attr', 'type', 'url')
			})
		})

		describe('Main Layout', () => {
			before( () => {
				cy.get('#accordion-section-main_layout').click()
			})

			after( () => {
				cy.get('#customize-controls .control-section:visible').scrollTo(0, 0)
				cy.get('.customize-section-back:visible').click()
			})

			it('Contains Number of Sidebars: 3', () => {
				cy.get('#_customize-input-sidebars_qty').should('have.value', '3')
			})

			it('Updates Template on Sidebars change', () => {
				cy.get('#_customize-input-sidebars_qty').select('4')
				cy.get('.gl-sequence-content').each(($el) => {
					cy.wrap($el).contains('Sidebar 4')
				})
			})

			it('Contains Home Templates as 8-4', () => {
				cy.get('#customize-control-home_template').find('[value="8-4"]').should('be.checked')
			})

			it('Updates Home Template Sequence to 6-3-3', () => {
				cy.get('#customize-control-home_template').find('[value="6-3-3"]').check({ force: true }).should('be.checked')
				cy.get('#customize-control-home_template .gl-sequence-content').each(($el, index) => {
					if (index === 0) {
						cy.wrap($el).should('have.value', 'main')
					}
					if (index === 1) {
						cy.wrap($el).should('have.value', 'sidebar-1')
					}
					if (index === 2) {
						cy.wrap($el).should('have.value', 'sidebar-2')
					}
				})
			})
		})
	})
})
