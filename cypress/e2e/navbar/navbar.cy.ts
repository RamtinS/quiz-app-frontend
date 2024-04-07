/**
 * Cypress test for testing NavigationBar component.
 */
describe("Navigate website page test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("displays search bar", () => {
    cy.get('[data-cy="search-bar"]').should("exist");
  });

  it("Displays hamburger sidebar", () => {
    cy.get('[data-cy="hamburger-sidebar"]').should("exist");
  });

  it("Displays my account preview", () => {
    cy.get('[data-cy="my-account-preview"]').should("exist");
  });
});
