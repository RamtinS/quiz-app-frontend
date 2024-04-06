describe('Navigate website page test', () => {

    //Open the right and left navigation bars.
    beforeEach(() => {
        cy.visit("http://localhost:3000/quiz-browser")
    })

    it("Quiz browser should load quiz previews", () => {
        cy.get("#quiz-post")
    });

    it("Quiz browser should search and load correct quiz", () => {
        cy.get("#search").type("E2E")
        cy.get("#search-button").click()
        cy.get("#quiz-post")
    });

    it("Quiz browser navigator button 'next' should load quizzes.", () => {
        cy.get("#next").click
        cy.get("#quiz-post")
    });

    it("Quiz browser navigator button 'previous' should load quizzes.", () => {
        cy.get("#next").click
        cy.get("#next").click
        cy.get("#previous").click
        cy.get("#quiz-post")
    });

    it("Quiz browser search with tags should load quizzes.", () => {
        cy.get("#tags").click
        cy.get("#search").type("Draven")
        cy.get("#quiz-post")
    });

    it("Quiz browser search with category should load quizzes.", () => {
        cy.get("#category").click
        cy.get("#search").type("Food")
        cy.get("#quiz-post")
    });

})