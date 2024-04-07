// https://on.cypress.io/api

describe('Feedback page test', () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/contact")
  });

  it("Button should be deactivated when input fields are empty", () => {

    cy.get('[data-cy="email"]').clear().type(' ');
    cy.get('[data-cy="first-name"]').clear().type(' ');
    cy.get('[data-cy="last-name"]').clear().type(' ');
    cy.get('[data-cy="message"]').clear().type(' ')

    cy.get('[data-cy="submit-button"]').should('be.disabled');
  });

  it("Button should be enabled when input fields are filled", () => {

    cy.get('[data-cy="email"]').type("marias@ntnu.com");
    cy.get('[data-cy="first-name"]').type('Maria');
    cy.get('[data-cy="last-name"]').type("Scott");
    cy.get('[data-cy="message"]').type("Test message")

    cy.get('[data-cy="submit-button"]').should('not.be.disabled');
  });

  it("Should display success message on successful submission", () => {
    cy.get('[data-cy="email"]').type("marias@ntnu.com");
    cy.get('[data-cy="first-name"]').type('Maria');
    cy.get('[data-cy="last-name"]').type("Scott");
    cy.get('[data-cy="message"]').type("Test message")

    cy.get('form').submit();

    cy.get('form').should('not.be.visible');

    cy.contains('Form successfully submitted!').should('be.visible');
  });
})