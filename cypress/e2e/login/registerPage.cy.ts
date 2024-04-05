describe('Register page test', () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/register-user")
    });

    it("Button should be deactivated when input fields are empty", () => {
        cy.get('#username').type(' ');
        cy.get('#password').type(' ');
        cy.get("#email").type(' ');
        cy.get('#first-name').type(' ');
        cy.get('#sur-name').type(' ');
        cy.get("#confirm-password").type(' ');
        cy.get("#register-button").should("be.disabled");
    });

    it("Button should be activated when input fields are empty", () => {
        cy.get('#username').type('a ');
        cy.get('#password').type('a');
        cy.get("#email").type('a');
        cy.get('#first-name').type('a');
        cy.get('#sur-name').type('a ');
        cy.get("#confirm-password").type('a');
        cy.get("#register-button").should("not.be.disabled");
    });

    it("Different passwords should give error.", () => {
        cy.get('#username').type('a ');
        cy.get('#password').type('a');
        cy.get("#email").type('a');
        cy.get('#first-name').type('a');
        cy.get('#sur-name').type('a ');
        cy.get("#confirm-password").type('Alla');
        cy.get("#register-button").click()
        cy.get("#error").should("not.be.disabled");
    });

    it("Short passwords should give error.", () => {
        cy.get('#username').type('Jake324');
        cy.get('#password').type('pass');
        cy.get("#email").type('test@ntnu.no');
        cy.get('#first-name').type('Jake');
        cy.get('#sur-name').type('GyllenHal');
        cy.get("#confirm-password").type('pass');
        cy.get("#register-button").click()
        cy.get("#error").should("not.be.disabled");
    });


    it("Bad format on email should give error.", () => {
        cy.get('#username').type('Alice123');
        cy.get('#password').type('testPassword');
        cy.get("#email").type('ntnu.no');
        cy.get('#first-name').type('Alice');
        cy.get('#sur-name').type('Wonderland');
        cy.get("#confirm-password").type('testPassword');
        cy.get("#register-button").click()
        cy.get("#error").should("not.be.disabled");
    });


    it("Correct register format should route to homeView.", () => {
        cy.get('#username').type('Alice123');
        cy.get('#password').type('testPassword');
        cy.get("#email").type('email@ntnu.no');
        cy.get('#first-name').type('Alice');
        cy.get('#sur-name').type('Wonderland');
        cy.get("#confirm-password").type('testPassword');
        cy.get("#register-button").click()
        cy.get("#welcome").should('not.be.hidden')
    });


})

