describe('Navigate website page test', () => {

    beforeEach(() => {
        cy.visit("http://localhost:3000/quiz-browser")
    })

    it('Displays quiz browser with search options and navigation', () => {

        cy.get('[data-cy="quiz-browser"]').should('exist');

        cy.get('[data-cy="options-container"]').should('exist');

        cy.get('[data-cy="search-input"]').should('exist');
        cy.get('[data-cy="search-button"]').should('exist');

        cy.get('[data-cy="search-by-tags"]').should('exist');
        cy.get('[data-cy="search-by-category"]').should('exist');

        cy.get('[data-cy="quiz-grid"]').should('exist');

        cy.get('[data-cy="previous-button"]').should('exist');
        cy.get('[data-cy="next-button"]').should('exist');

        cy.get('[data-cy="page-number"]').should('exist');
    });
})