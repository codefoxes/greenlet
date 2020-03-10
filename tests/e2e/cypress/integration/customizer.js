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

	describe('Site Identity', () => {
		before( () => {
			cy.get('#accordion-section-title_tagline').click()
		})

		after( () => {
			cy.get('.customize-section-back:visible').click()
		})

		it('Contains Logo Width', () => {
			cy.get('#length-size-logo_width').should('have.attr', 'type', 'range')
		})

		it('Contains Logo Height', () => {
			cy.get('#length-size-logo_height').should('have.attr', 'type', 'range')
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

			it('Contains Enabled Defer CSS', () => {
				cy.get('#_customize-input-defer_css:checkbox').should('be.enabled')
			})
		})

		describe('Header Layout', () => {
			before( () => {
				cy.get('#accordion-section-header_layout').click()
			})

			after( () => {
				cy.get('#customize-controls .control-section:visible').scrollTo(0, 0)
				cy.get('.customize-section-back:visible').click()
			})

			it('Contains Disabled Topbar', () => {
				// Why not directly accessible via should('be.disabled')
				cy.get('#_customize-input-show_topbar').then(($st) => {
					expect($st.prop('checked')).to.be.false
				})
			})

			it('Contains Header Template Placeholder', () => {
				cy.get('#customize-control-header_template .gl-radio-images').should('be.visible')
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

				cy.waitUntil(() => cy.get('#customize-preview iframe').then(($iframe) => {
					const topbar = $iframe.contents().find('body .topbar')
					return topbar.length > 0;
				}), { timeout: 10000 })

				// cy.get('#customize-preview iframe').then(($iframe) => {
				// 	const $body = $iframe.contents().find('body')
				// 	cy.wrap($body).find('.topbar').should('be.visible')
				// 	cy.wrap($body).find('.topbar').should('have.css', 'position', 'sticky')
				// })
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
				cy.get('#customize-control-topbar_template [type="radio"]').check('2-10', { force: true })
				// cy.get('#_customize-input-topbar_template').type('5-7')
				cy.wait(2000)
				cy.get('#customize-preview iframe').then(($iframe) => {
					const $body = $iframe.contents().find('body')
					cy.wrap($body).find('.topbar .topbar-1').should('have.class', 'col-2')
					cy.wrap($body).find('.topbar .topbar-2').should('have.class', 'col-10')
				})
			})

			// Test manual template Input.

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
				cy.get('.gl-template-selection').each(($el) => {
					cy.wrap($el).contains('Sidebar 4')
				})
			})

			it('Contains Home Templates as 8-4', () => {
				cy.get('#customize-control-home_template').find('[value="8-4"]').should('be.checked')
			})

			it('Updates Home Template Sequence to 6-3-3', () => {
				cy.get('#customize-control-home_template').find('[value="6-3-3"]').check({ force: true }).should('be.checked')
				cy.get('#customize-control-home_template .gl-template-selection').each(($el, index) => {
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
