/**
 * Cypress tests for testing components in frontend.
 */
describe('Login page test', () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/login")
    });

    it('displays the login form', () => {
        cy.get('[data-cy=username-input]').should('exist');
        cy.get('[data-cy=password-input]').should('exist');
        cy.get('[data-cy=login-button]').should('exist');
    });

    it('allows user to log in with valid credentials', () => {
        cy.get('[data-cy=username-input]').type('TestUser');
        cy.get('[data-cy=username-input]').type('password');
        cy.get('[data-cy=login-button]').click();
    });

    it("Button should be deactivated on empty input.", () => {
        cy.get('[data-cy=username-input]').clear();
        cy.get('[data-cy=username-input]').clear();
        cy.get('[data-cy=login-button]').should('be.disabled');
    });

    it("Button should be activated on filled input.", () => {
        cy.get('[data-cy=username-input]').type('Text');
        cy.get('[data-cy=username-input]').type('Text');
        cy.get('[data-cy=login-button]').should('not.be.disabled');
    });

    it("Display error on incorrect input.", () => {
        cy.get('[data-cy=username-input]').type('tes');
        cy.get('[data-cy=username-input]').type('test');
        cy.get('[data-cy=login-button]').click()
        cy.get('[data-cy=error-message]').should('not.be.hidden')
    });
})

