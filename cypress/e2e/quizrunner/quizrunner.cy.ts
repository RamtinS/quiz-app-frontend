describe('Navigate website page test', () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/quiz-browser")
    });

    it("Navbar buttons should open left dropdown menus and be visible", () => {
        cy.get("#login-link")
        cy.get("#browser-link")
        cy.get("#register-link")
        cy.get('#contact-link')
        cy.get("#creator-link")
    });

    it("Navbar buttons should open right dropdown menus and be visible", () => {
        cy.get("#user-profile").click()
        cy.get("#log-out").should("be.visible")
    });

    it("Clicking on 'Login' button should navigate to login page.", () => {
        cy.get('#hamburger-icon').click()
        cy.get('#login-link').click()
        cy.get('#login').should('be.disabled');
    });

    it("Clicking on the 'Quiz-Browser' button should navigate to quiz-browser page.", () => {
        cy.get('#hamburger-icon').click()
        cy.get("#browser-link").click()
        cy.get('#quiz-browser').should('be.visible');
    });

    it("Clicking on the 'Register' button should navigate to contact form page.", () => {
        cy.get('#hamburger-icon').click()
        cy.get("#register-link").click()
        cy.get("#register-button").should("be.visible");
    });

    it("Clicking on the 'Contact Us' button should navigate to contact form page.", () => {
        cy.get('#hamburger-icon').click()
        cy.get('#contact-link').click()
        cy.get("#headline").should("be.visible")
    });


    it("Clicking on the 'Quiz-creator' button should navigate to quiz-creator page.", () => {
        cy.get('#hamburger-icon').click()
        cy.get("#creator-link").click()
        cy.get("#quiz-info").should("be.visible")
    });

})