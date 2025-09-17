describe('Login Flow', () => {
  beforeEach(() => {
    // Clear any existing auth state
    cy.window().then((win) => {
      win.localStorage.clear();
      win.sessionStorage.clear();
    });
  });

  describe('Login Page', () => {
    beforeEach(() => {
      cy.visit('/login');
    });

    it('displays login page correctly', () => {
      cy.get('h1').should('contain.text', 'Sign in');
      cy.get('a[href="https://www.themoviedb.org"]')
        .should('contain.text', 'The Movie Database')
        .should('have.attr', 'target', '_blank')
        .should('have.attr', 'rel', 'noopener noreferrer');
      cy.get('button').contains('Sign in').should('be.visible');
    });

    it('has back navigation to movies page', () => {
      cy.get('a[href="/movies"]').should('be.visible');
      cy.get('[data-lucide="chevron-left"]').should('be.visible');
    });

    it('displays authentication explanation text', () => {
      cy.contains('You will be securely authenticated through').should(
        'be.visible'
      );
      cy.contains("We'll redirect you to TMDB to log in").should('be.visible');
    });

    it('renders decorative grid elements', () => {
      cy.get('.bg-primary').should('be.visible');
      cy.get('.bg-secondary').should('be.visible');
      cy.get('.bg-white').should('be.visible');
      cy.get('.bg-tertiary').should('be.visible');
    });
  });

  describe('Responsive Design', () => {
    const viewports = [
      { device: 'mobile', width: 375, height: 667 },
      { device: 'tablet', width: 768, height: 1024 },
      { device: 'desktop', width: 1280, height: 800 },
    ];

    viewports.forEach(({ device, width, height }) => {
      it(`displays correctly on ${device}`, () => {
        cy.viewport(width, height);
        cy.visit('/login');

        cy.get('h1').should('be.visible');
        cy.get('button').contains('Sign in').should('be.visible');

        // Check that grid layout adapts
        if (device === 'mobile') {
          cy.get('.grid-cols-1').should('exist');
        } else {
          cy.get('.md\\:grid-cols-2').should('exist');
        }
      });
    });
  });

  describe('Navigation', () => {
    it('navigates back to movies page', () => {
      cy.visit('/login');

      cy.get('a[href="/movies"]').click();
      cy.url().should('include', '/movies');
    });

    it('opens TMDB link in new tab', () => {
      cy.visit('/login');

      cy.get('a[href="https://www.themoviedb.org"]').should(
        'have.attr',
        'target',
        '_blank'
      );
    });
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      cy.visit('/login');
    });

    it('has proper heading structure', () => {
      cy.get('h1').should('contain.text', 'Sign in');
    });

    it('has accessible form elements', () => {
      cy.get('button').should('be.enabled');
      cy.get('button').should('not.have.attr', 'disabled');
    });

    it('has proper link attributes', () => {
      cy.get('a[href="/movies"]').should('be.visible');
      cy.get('a[href="https://www.themoviedb.org"]').should(
        'have.attr',
        'rel',
        'noopener noreferrer'
      );
    });

    it('maintains focus management', () => {
      cy.get('button').contains('Sign in').focus();
      cy.focused().should('contain.text', 'Sign in');
    });
  });
});
