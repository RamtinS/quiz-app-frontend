describe('Register page test', () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000")
    });

    it("Navbar buttons should open dropdown menus", () => {
        cy.get('#hamburger-icon').click()
        cy.get("#my-account-preview").click()
        cy.get("#hamburger-icon").should("be.visible")
        cy.get("#hamburger-icon").should("be.visible")
    });

    it("Login button in navbar should route to login page", () => {
        cy.get('#hamburger-icon').click()
        cy.get("#my-account-preview").click()
        cy.get("#hamburger-icon").should("be.visible")
        cy.get("#hamburger-icon").should("be.visible")
    });

    it("Quiz Browser button in navbar should route to login page", () => {
        cy.get('#hamburger-icon').click()
        cy.get("#my-account-preview").click()
        cy.get("#hamburger-icon").should("be.visible")
        cy.get("#hamburger-icon").should("be.visible")
    });

    it("Register button in navbar should route to login page", () => {
        cy.get('#hamburger-icon').click()
        cy.get("#my-account-preview").click()
        cy.get("#hamburger-icon").should("be.visible")
        cy.get("#hamburger-icon").should("be.visible")
    });

    it("Contact us button in navbar should route to login page", () => {
        cy.get('#hamburger-icon').click()
        cy.get("#my-account-preview").click()
        cy.get("#hamburger-icon").should("be.visible")
        cy.get("#hamburger-icon").should("be.visible")
    });

    it("Quiz button in navbar should route to login page", () => {
        cy.get('#hamburger-icon').click()
        cy.get("#my-account-preview").click()
        cy.get("#hamburger-icon").should("be.visible")
        cy.get("#hamburger-icon").should("be.visible")
    });






})