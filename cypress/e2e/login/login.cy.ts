/**
 * Cypress tests for testing components in frontend.
 */
describe('Login page test', () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/login")
    });

    it("Button should be deactivated on empty input.", () => {
        cy.get('#username').type(' ');
        cy.get('#password').type(' ');
        cy.get('#login').should('be.disabled');
    });

    it("Button should be activated on filled input.", () => {
        cy.get('#username').type('Text');
        cy.get('#password').type('Text');
        cy.get('#login').should('not.be.disabled');
    });

    it("Display error on incorrect input.", () => {
        cy.get('#username').type('Text');
        cy.get('#password').type('Text');
        cy.get('#login').click()
        cy.get("#error").should('not.be.hidden')
    });

    it("Correct login credentials should push you to a new route.", () => {
        cy.get('#username').type('admin');
        cy.get('#password').type('password');
        cy.get('#login').click()
        cy.get("#welcome").should('not.be.hidden')
    });

    it("Create-Account button pushes you to a new route.", () => {
        cy.get('#register-link').click()
        cy.url().should('include', '/register-user')
    });
})

