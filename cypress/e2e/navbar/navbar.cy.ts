describe('Navigate website page test', () => {

    //Open the right and left navigation bars.
    beforeEach(() => {
        cy.visit("http://localhost:3000")
        cy.get('#hamburger-icon').click()
        cy.get("#my-account-preview").click()
    });

    it("Buttons in left navbar should be visible.", () => {
        cy.get("#login-link")
        cy.get("#register-link")
        cy.get("#browser-link")
        cy.get("#contact-link")
        cy.get("#creator-link")
    });

    it("Buttons in right navbar should be visible.", () => {
        cy.get("#user-profile")
        cy.get("#log-out")
    });

    it("Login button should route to login page.", () => {
        cy.get("#login-link").click()
        cy.url().should('include', '/login')
    });

    it("Register button should route to register-user page.", () => {
        cy.get("#register-link").click()
        cy.url().should('include', '/register-user')
    });

    it("Browser button should route to quiz browser page.", () => {
        cy.get("#browser-link").click()
        cy.url().should('include', '/quiz-browser')
    });

    it("Contact button should route to quiz browser page.", () => {
        cy.get("#contact-link").click()
        cy.url().should('include', '/contact')
    });

    it("Quiz creator button should route to quiz browser page.", () => {
        cy.get("#browser-link").click()
        cy.url().should('include', '/quiz-browser')
    });

    it("Quiz creator button should route to quiz browser page.", () => {
        cy.get("#browser-link").click()
        cy.url().should('include', '/quiz-browser')
    });

    it("Log-out button should route to quiz browser page.", () => {
        cy.get("#log-out").click()
        cy.url().should('include', '/logout')
    });

})