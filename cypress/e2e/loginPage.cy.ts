

describe('Feedback page test', () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/login")
    });

    it("Button should be deactivated when input fields are empty", () => {

        cy.get('#username').type(' ');
        cy.get('#password').type(' ');
        cy.get('input[type="submit"]').should('be.disabled');
    });

})

