// https://on.cypress.io/api

describe('Feedback page test', () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/contact")
  });

  it("Button should be deactivated when input fields are empty", () => {

    cy.get('#email').type(' ');
    cy.get('#first-name').type(' ');
    cy.get('#last-name').type(' ');
    cy.get('#message').type(' ')

    cy.get('button[type="submit"]').should('be.disabled');
  });

  it("Button should be enabled when input fields are filled", () => {

    cy.get('#email').type("marias@ntnu.com");
    cy.get('#first-name').type('Maria');
    cy.get('#last-name').type("Scott");
    cy.get('#message').type("Test message")

    cy.get('button[type="submit"]').should('not.be.disabled');
  });

  it("Should display success message on successful submission", () => {
    cy.get('#email').type("marias@ntnu.com");
    cy.get('#first-name').type("Maria");
    cy.get('#last-name').type("Scott");
    cy.get('#message').type("Test message")

    cy.get('form').submit();

    cy.get('form').should('not.be.visible');

    cy.contains('Form successfully submitted!').should('be.visible');
  });
})