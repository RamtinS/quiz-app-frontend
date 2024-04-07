Cypress.Commands.add(
  "login",
  (path: string, username: string, password: string) => {
    cy.visit(path);
    cy.get("#username").type(username);
    cy.get("#password").type(password);
    cy.get("#login").click();
  },
);

declare global {
  namespace Cypress {
    interface Chainable {
      login(path: string, username: string, password: string): Chainable<void>;
    }
  }
}

export {};
