describe('Search Drawer UI', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('displays search button correctly', () => {
    cy.get('[data-testid="search-nav-bar-button"]').should('be.visible');
  });

  it('opens search drawer when search button is clicked', () => {
    cy.get('[data-testid="search-nav-bar-button"]').click();

    cy.get('[data-testid="search-drawer"]').should('be.visible');
    cy.get('[data-testid="search-input"]').should('be.visible');
    cy.get('[data-testid="search-drawer-close-button"]').should('be.visible');
  });

  it('closes drawer when X button is clicked', () => {
    cy.get('[data-testid="search-nav-bar-button"]').click();
    cy.get('[data-testid="search-drawer-close-button"]').click();
    cy.get('[data-testid="search-drawer"]').should('not.exist');
  });

  it('has correct initial state', () => {
    cy.get('[data-testid="search-nav-bar-button"]').click();
    cy.get('[data-testid="search-input"]').should('have.value', '');
    cy.get('[data-testid="search-result"]').should('not.exist');
  });
});

describe('Search Drawer Data Fetching', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.intercept('GET', '**/search/movie**', {
      statusCode: 200,
      body: {
        results: [
          {
            id: 1,
            title: 'Test Movie 1',
            poster_path: '/test-poster-1.jpg',
            release_date: '2023-01-01',
            overview: 'Test movie description 1',
          },
          {
            id: 2,
            title: 'Test Movie 2',
            poster_path: '/test-poster-2.jpg',
            release_date: '2023-01-02',
            overview: 'Test movie description 2',
          },
        ],
      },
    }).as('searchMovies');

    // Open drawer
    cy.get('[data-testid="search-nav-bar-button"]').click();
  });

  // it('fetches movies when typing into search input', () => {
  //   cy.get('[data-testid="search-input"]').type('avengers');

  //   // Shows loading state
  //   cy.get('[data-testid="preloader"]').should('be.visible');

  //   // Wait for mocked API call
  //   cy.wait('@searchMovies');

  //   // Add a fixed delay before assertions
  //   cy.wait(800); // 800 milliseconds

  //   // doesn't Shows loading state
  //   cy.get('[data-testid="preloader"]').should('not.be.visible');

  //   // Results should render
  //   cy.get('[data-testid="search-result"]').should('have.length', 2);
  //   cy.get('[data-testid="media-title-1"]').contains('Test Movie 1');
  //   cy.get('[data-testid="media-title-2"]').contains('Test Movie 2');
  // });

  // it('handles empty search results', () => {
  //   cy.get('[data-testid="search-input"]').type('avengers');
  //   // Wait for mocked API call
  //   cy.wait('@searchMovies');

  //   cy.get('[data-testid="search-result"]').should('be.visible');
  //   cy.get('[data-testid="search-input"]').clear();
  //   cy.get('[data-testid="search-input"]').clear().should('have.value', '');

  //   cy.get('[data-testid="search-result"]').should('not.exist');
  // });
});
