class ContactPage {
    elements = {
        submitBtn: () => cy.xpath('//a[contains(@class, "btn-contact") and text()="Submit"]'),
        alertError: () => cy.xpath('//div[contains(@class,"alert-error")]'),
        forenameError: () => cy.xpath('//span[contains(@class,"help-inline") and contains(text(),"Forename is required")]'),
        emailError: () => cy.xpath("//span[contains(@class, 'help-inline') and contains(text(), 'Email is required')]"),
        messageRequired: () => cy.xpath('//span[contains(@class,"help-inline") and contains(text(),"Message is required")]'),
        inputForename: () => cy.xpath('//input[@id="forename"]'),
        inputEmail: () => cy.xpath('//input[@id="email"]'),
        inputMessage: () => cy.xpath('//textarea[@id="message"]'),
        sendingFeedback: () => cy.xpath('//div[contains(@class,"popup") and contains(@class,"modal")]//h1[text()="Sending Feedback"]', { timeout: 90000 }),
        successfulMessageSubmit: () => cy.xpath('//div[contains(@class,"alert-success") and contains(., "Thanks")]', { timeout: 90000 }),

    }
    clickSubmit() {
        this.elements.submitBtn().click();
    }

    errorMessagesForManFields() {
        this.elements.alertError().should("be.visible");
        this.elements.forenameError().should("be.visible");
        this.elements.emailError().should("be.visible");
        this.elements.messageRequired().should("be.visible");
    }

    inputMandatoryFields() {
        cy.fixture("datasource").then((data) => {
            this.elements.inputForename().type(data.forename);
            this.elements.inputEmail().type(data.email);
            this.elements.inputMessage().type(data.message);
        });

    }

    validateRemoveErrorMessages() {
        this.elements.alertError().should('not.exist');
        this.elements.forenameError().should('not.exist');
        this.elements.emailError().should('not.exist');
        this.elements.messageRequired().should('not.exist');
    }

    successfulSumbit() {
        this.elements.sendingFeedback().should("be.visible");
        this.elements.successfulMessageSubmit().should("be.visible");
    }
}
module.exports = new ContactPage();