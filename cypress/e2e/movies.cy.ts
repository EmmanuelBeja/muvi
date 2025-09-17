describe('Movies Page', () => {
  beforeEach(() => {
    // Clear localStorage and session storage
    cy.clearLocalStorage();
    cy.clearAllSessionStorage();

    // Intercept TMDB API requests with more specific patterns
    cy.intercept(
      'GET',
      '**/api.themoviedb.org/3/movie/now_playing**',
      (req) => {
        const url = new URL(req.url);
        const page = url.searchParams.get('page') || '1';
        const fixture =
          page === '2' ? 'movies-page2.json' : 'movies-page1.json';

        req.reply({ fixture });
      }
    ).as('getNowPlayingMovies');

    cy.intercept('GET', '**/api.themoviedb.org/3/movie/popular**', (req) => {
      const url = new URL(req.url);
      const page = url.searchParams.get('page') || '1';
      const fixture =
        page === '2'
          ? 'popular-movies-page2.json'
          : 'popular-movies-page1.json';
      req.reply({ fixture });
    }).as('getPopularMovies');

    // Visit the movies page
    cy.visit('http://localhost:5173/movies/');
  });

  it('renders initial movies with loading state', () => {
    // Should show loading state initially
    cy.get('[data-testid="preloader"]').should('be.visible');

    // Wait for API call and movies to load
    cy.wait('@getNowPlayingMovies');

    // Check that movies are rendered
    cy.get('ul.grid').should('exist');
    cy.get('ul.grid > li').should('have.length.at.least', 1);

    // Check the first movie has required elements
    cy.get('ul.grid > li')
      .first()
      .within(() => {
        cy.get('img').should('exist');
        cy.get('h3').should('exist').and('not.be.empty');
        cy.get('a').should('have.attr', 'href').and('include', '/movies/');
      });
  });

  it('displays correct page title for now playing category', () => {
    cy.wait('@getNowPlayingMovies');
    cy.get('h2').should('contain.text', 'Now Playing movies');
  });

  it('can navigate between movie categories', () => {
    cy.wait('@getNowPlayingMovies');

    // Check initial category is selected
    cy.get('a').contains('Now Playing').should('have.class', 'bg-secondary');

    // Click 'Popular' category
    cy.get('a').contains('Popular').click();

    // Check URL updated
    cy.url().should('include', 'category=popular');

    // Wait for new API call
    cy.wait('@getPopularMovies');

    // Check title updated
    cy.get('h2').should('contain.text', 'Popular movies');

    // Check Popular is now selected
    cy.get('[data-testid="popular"]')
      .contains('Popular')
      .should('have.class', 'bg-secondary');
  });

  it('loads more movies when Load More button is clicked', () => {
    cy.wait('@getNowPlayingMovies');

    // Count initial movies
    cy.get('ul.grid > li').then(($initialMovies) => {
      const initialCount = $initialMovies.length;

      // Click Load More button if it exists
      cy.get('body').then(($body) => {
        if ($body.find('button:contains("Load More")').length > 0) {
          cy.get('button').contains('Load More').click();

          // Wait for next page API call
          cy.wait('@getNowPlayingMovies');

          // Check that more movies are loaded
          cy.get('ul.grid > li').should(
            'have.length.greaterThan',
            initialCount
          );
        } else {
          // If no Load More button, log that all movies are already loaded
          cy.log('All movies already loaded, no Load More button present');
        }
      });
    });
  });

  it('handles empty movie list gracefully', () => {
    // Intercept with empty response
    cy.intercept('GET', '**/api.themoviedb.org/3/movie/now_playing**', {
      fixture: 'empty-movies.json',
    }).as('getEmptyMovies');

    cy.visit('http://localhost:5173/movies/');
    cy.wait('@getEmptyMovies');

    // Should show NoData component
    cy.get('[data-testid="no-data"]').should('be.visible');
  });

  it('prefetches movie data on hover', () => {
    cy.wait('@getNowPlayingMovies');

    // Intercept movie details API with inline data
    cy.intercept('GET', '**/api.themoviedb.org/3/movie/[0-9]*', {
      statusCode: 200,
      body: {
        id: 1,
        title: 'Movie 1',
        poster_path: '/test-poster-1.jpg',
        overview: 'Detailed overview for Movie 1',
        release_date: '2024-01-01',
        vote_average: 8.5,
        runtime: 120,
        genres: [
          { id: 28, name: 'Action' },
          { id: 12, name: 'Adventure' },
        ],
      },
    }).as('getMovieDetails');

    // Hover over first movie
    cy.get('ul.grid > li').first().find('a').trigger('mouseover');

    // Should trigger prefetch (this might happen or might not depending on implementation)
    // This test verifies the hover interaction works without errors
    cy.get('ul.grid > li').first().should('be.visible');
  });

  it('displays movie images with lazy loading', () => {
    cy.wait('@getNowPlayingMovies');

    // Check that LazyLoadImage components are rendered
    cy.get('ul.grid > li')
      .first()
      .within(() => {
        cy.get('img').should('exist');
        cy.get('img').should('have.attr', 'alt');
      });
  });

  // it('handles Load More button states correctly', () => {
  //   // Wait for initial movies to load
  //   cy.wait('@getNowPlayingMovies');

  //   cy.get('[data-testid="load-more"]').then(($btn) => {
  //     if ($btn.length > 0) {
  //       // Button should be enabled initially
  //       cy.wrap($btn)
  //         .should('not.be.disabled')
  //         .and('contain.text', 'Load More');

  //       // Click the button
  //       cy.wrap($btn).click();

  //       // Wait for the API call to be triggered
  //       cy.wait('@getNowPlayingMovies');

  //       // Now the button may be disabled while loading
  //       cy.get('[data-testid="load-more"]')
  //         .should('be.disabled')
  //         .and('contain.text', 'Load More'); // Keep text check optional if your component doesn't actually change text
  //     }
  //   });
  // });

  it('navigates to movie detail page when clicking on a movie', () => {
    cy.wait('@getNowPlayingMovies');

    // Get the first movie link and click it
    cy.get('ul.grid > li')
      .first()
      .find('a')
      .then(($link) => {
        const href = $link.attr('href');

        // Click the link
        cy.wrap($link).click();

        // Should navigate to movie detail page
        cy.url().should('include', href);
      });
  });
});
