class HomePage {
    elements = {
        contactTab: () => cy.xpath("//a[@href='#/contact']"),
        welcomeContact: () => cy.xpath("//div[strong[text()='We welcome your feedback']]"),
        startShoppingBtn: () => cy.xpath('//a[contains(@class,"btn-success") and contains(text(),"Start Shopping")]'),
    }
    goToContact(){
        this.elements.contactTab().click();
        this.elements.welcomeContact().should("be.visible");
    }

    goToShopping(){
        this.elements.startShoppingBtn().click();
    }
}
module.exports = new HomePage();