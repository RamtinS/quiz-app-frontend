/**
 * Cypress test for testing the UserProfile component.
 */
describe("User Profile Component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/user-profile");
    cy.login(
      "http://localhost:3000/login?redirect=/user-profile",
      "TestUser",
      "password",
    );
  });

  it("displays user profile information", () => {
    cy.get('[data-cy="profile-info"]').should("exist");

    cy.get('[data-cy="first-name"]').should("contain", "Test");
    cy.get('[data-cy="surname"]').should("contain", "Test");
    cy.get('[data-cy="email"]').should("contain", "test@test.no");
  });
});
