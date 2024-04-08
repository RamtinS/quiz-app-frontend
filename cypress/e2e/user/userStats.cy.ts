/**
 * Cypress test for testing the UserStats component.
 */
describe("User stats page test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/user-stats");
    cy.login(
      "http://localhost:3000/login?redirect=/user-stats",
      "TestUser",
      "password",
    );
  });

  it("displays user progress graph and stats", () => {
    cy.get('[data-cy="graph"]').should("exist");

    cy.get('[data-cy="y-axis"]').should("exist");

    cy.get('[data-cy="x-axis"]').should("exist");

    cy.get('[data-cy="y-labels"] text').should("have.length", 15);

    cy.get('[data-cy="x-labels"] text').should("have.length", 7);

    cy.get('[data-cy="quiz-point"]').should("have.length.gt", 0);

    cy.get('[data-cy="graph-line"]').should("have.length.gt", 0);

    cy.get('[data-cy="stats-container"]').should("exist");
  });

  it("displays error message on data fetch failure", () => {
    cy.intercept("GET", "http://localhost:8080/api/v1/users/stats", {
      statusCode: 500,
    });

    cy.get('[data-cy="error-message"]').should("exist");

    cy.get('[data-cy="error-message"]').should(
      "contain",
      "An error occurred while retrieving the statistics. Please try again later.",
    );
  });
});
