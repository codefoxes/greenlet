/**
 * Customizer Tests.
 */

describe('Customizer', () => {

	before(() => {
		let url = Cypress.env( Cypress.env('ENV') );
		let adminUrl = `${url}/wp-admin`
		cy.visit(adminUrl);
		cy.request(adminUrl).then(() => {
			cy.get( '#user_login' ).type( Cypress.env( 'admin_user' ) );
			cy.get( '#user_pass' ).type( Cypress.env( 'admin_pass' ) );
			cy.get( '#wp-submit' ).click();
		})

		Cypress.Cookies.defaults({
			whitelist: /wordpress_.*/
		})

		let customizerUrl = `${url}/wp-admin/customize.php`
		cy.visit(customizerUrl);
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

		describe('Header Layout', () => {
			before( () => {
				cy.get('#accordion-section-header_layout').click()
			})

			after( () => {
				cy.get('#customize-controls .wp-full-overlay-sidebar-content:visible').scrollTo(0, 0)
				cy.get('.customize-section-back:visible').click()
			})

			it('Contains Disabled Topbar', () => {
				// Why not directly accessible via should('be.disabled')
				cy.get('#_customize-input-show_topbar').then(($st) => {
					expect($st.prop('checked')).to.be.false
				})
			})

			it('Contains Header Template Placeholder', () => {
				cy.get('#_customize-input-header_template').should('have.attr', 'placeholder', '3-9')
			})

			it('Contains Logo Position as Header 1', () => {
				cy.get('#_customize-input-logo_position').should('have.value', 'header-1')
			})

			it('Contains Menu Position as Header 2', () => {
				cy.get('#_customize-input-mmenu_position').should('have.value', 'header-2')
			})

			it('Contains Secondary Menu Hidden', () => {
				cy.get('#_customize-input-smenu_position').should('have.value', 'dont-show')
			})

			it('Shows Topbar on Toggle', () => {
				cy.get('#_customize-input-show_topbar').click()
				cy.wait(2000)
				cy.get('#customize-preview iframe').then(($iframe) => {
					const $body = $iframe.contents().find('body')
					cy.wrap($body).find('.topbar').should('be.visible')
					cy.wrap($body).find('.topbar').should('have.css', 'position', 'sticky')
				})
			})

			it('Toggles Sticky Topbar', () => {
				cy.get('#_customize-input-fixed_topbar').click()
				cy.wait(2000)
				cy.get('#customize-preview iframe').then(($iframe) => {
					const $body = $iframe.contents().find('body')
					cy.wrap($body).find('.topbar').should('be.visible')
					cy.wrap($body).find('.topbar').should('not.have.css', 'position', 'sticky')
				})
			})

			it('Updates Topbar Template', () => {
				cy.get('#_customize-input-topbar_template').type('5-7')
				cy.wait(2000)
				cy.get('#customize-preview iframe').then(($iframe) => {
					const $body = $iframe.contents().find('body')
					cy.wrap($body).find('.topbar .topbar-1').should('have.class', 'col-5')
					cy.wrap($body).find('.topbar .topbar-2').should('have.class', 'col-7')
				})
			})

			it('Updates Header Template', () => {
				cy.get('#_customize-input-header_template').type('2-10')
				cy.wait(2000)
				cy.get('#customize-preview iframe').then(($iframe) => {
					const $body = $iframe.contents().find('body')
					cy.wrap($body).find('header .header-1').should('have.class', 'col-2')
					cy.wrap($body).find('header .header-2').should('have.class', 'col-10')
				})
			})

			it('Updates Logo Position', () => {
				cy.get('#_customize-input-logo_position').select('topbar-1')
				cy.wait(2000)
				cy.get('#customize-preview iframe').then(($iframe) => {
					expect($iframe.contents().find('body .topbar-1 .site-logo')).to.exist
				})
			})

			it('Updates Menu Position', () => {
				cy.get('#_customize-input-mmenu_position').select('topbar-2')
				cy.wait(2000)
				cy.get('#customize-preview iframe').then(($iframe) => {
					expect($iframe.contents().find('body .topbar-2 nav')).to.exist
				})
			})

			it('Updates Secondary Menu Position', () => {
				cy.get('#_customize-input-smenu_position').select('header-2')
				cy.wait(2000)
				cy.get('#customize-preview iframe').then(($iframe) => {
					expect($iframe.contents().find('body .header-2 nav')).to.exist
				})
			})
		})
	})
})