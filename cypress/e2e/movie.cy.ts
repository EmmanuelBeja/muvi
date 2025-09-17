describe('Movie Page', () => {
  const movieId = 1311031;

  beforeEach(() => {
    // Clear storage
    cy.clearLocalStorage();
    cy.clearAllSessionStorage();

    // Intercept movie details and recommendations
    cy.intercept('GET', `**/api.themoviedb.org/3/movie/${movieId}**`, {
      fixture: 'movie-1.json',
    }).as('getMovie');

    cy.intercept(
      'GET',
      `**/api.themoviedb.org/3/movie/${movieId}/recommendations**`,
      { fixture: 'movie-1-recommendations.json' }
    ).as('getRecommendations');

    // Visit movie page after auth and intercepts are ready
    cy.visit(`http://localhost:5173/movies/${movieId}`);
  });

  it('renders movie details', () => {
    cy.wait('@getMovie');
    cy.get('h1').should('contain.text', 'Fake Movie');
    cy.get('p').should('contain.text', 'This is a fake movie overview.');
    cy.get('img').should('have.attr', 'alt', 'Fake Movie');
    cy.get('[data-testid="learn-more"]')
      .should('have.attr', 'href')
      .and('eq', 'https://fakehomepage.com');
  });

  it('shows toast message when clicking favorite button(User not authenticated)', () => {
    cy.wait('@getMovie');

    // Initially shows "Favourite"
    cy.get('[data-testid="favorite-movie"]').contains('Favourite').click();
    cy.get('[role="status"]').should(
      'contain.text',
      'Please login to favourite movies'
    );
  });

  it('renders recommendations', () => {
    cy.wait('@getMovie');
    cy.wait('@getRecommendations');
    cy.get('[data-testid="recommendations"]')
      .first()
      .should('contain.text', 'Recommended Movie');
  });

  it('renders Cast & Crew', () => {
    cy.wait('@getMovie');
    cy.get('h2').contains('Cast').should('exist');
    cy.get('h2').contains('Crew').should('exist');
  });
});
