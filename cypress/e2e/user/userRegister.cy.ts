/**
 * Cypress test for testing the CreateUser component.
 */
describe("Register page test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/register-user");
  });

  it("Displays registration form elements", () => {
    cy.get('[data-cy="username"]').should("exist");
    cy.get('[data-cy="email"]').should("exist");
    cy.get('[data-cy="first-name"]').should("exist");
    cy.get('[data-cy="surname"]').should("exist");
    cy.get('[data-cy="password"]').should("exist");
    cy.get('[data-cy="confirm-password"]').should("exist");
    cy.get('[data-cy="register-button"]').should("exist");
    cy.get('[data-cy="error-message"]').should("not.exist");
    cy.get('[data-cy="login-link"]').should("exist");
  });

  it("Button should be deactivated when input fields are empty", () => {
    cy.get('[data-cy="username"]').clear();
    cy.get('[data-cy="email"]').clear();
    cy.get('[data-cy="first-name"]').clear();
    cy.get('[data-cy="surname"]').clear();
    cy.get('[data-cy="password"]').clear();
    cy.get('[data-cy="confirm-password"]').clear();
    cy.get('[data-cy="register-button"]').should("be.disabled");
  });

  it("Button should be activated when input fields are not empty", () => {
    generateTestData(
      "Test",
      "test@test.com",
      "Test",
      "Test",
      "password",
      "password",
    );
    cy.get("#register-button").should("not.be.disabled");
  });

  it("Different passwords should give error.", () => {
    generateTestData(
      "Test",
      "test@test.com",
      "Test",
      "Test",
      "password",
      "different",
    );
    cy.get('[data-cy="error-message"]').should("not.be.disabled");
  });

  it("Short passwords should give error.", () => {
    generateTestData(
      "Test",
      "test@test.com",
      "Test",
      "Test",
      "password",
      "password",
    );
    cy.get('[data-cy="error-message"]').should("not.be.disabled");
  });

  it("Bad format on email should give error.", () => {
    generateTestData(
      "Test",
      "testtest.com",
      "Test",
      "Test",
      "password",
      "password",
    );
    cy.get('[data-cy="error-message"]').should("not.be.disabled");
  });

  function generateTestData(
    username: string,
    email: string,
    firstName: string,
    surname: string,
    password: string,
    confirmPassword: string,
  ): void {
    cy.get('[data-cy="username"]').type(username);
    cy.get('[data-cy="email"]').type(email);
    cy.get('[data-cy="first-name"]').type(firstName);
    cy.get('[data-cy="surname"]').type(surname);
    cy.get('[data-cy="password"]').type(password);
    cy.get('[data-cy="confirm-password"]').type(confirmPassword);
    cy.get('[data-cy="register-button"]').click();
  }
});
