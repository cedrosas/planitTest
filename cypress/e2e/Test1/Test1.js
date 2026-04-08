const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
import homepage from "../../pages/HomePage";
import contactpage from "../../pages/ContactPage";
import shoppingpage from "../../pages/ShoppingPage";
import cartpage from "../../pages/CartPage";

Given("I am on the home page", () => {
    cy.fixture("datasource").then((data) => {
        cy.visit(data.baseUrl);
    });
});

When("I navigate to the contact page", () => {
    homepage.goToContact();
});

When("I click the submit button", () => {
    contactpage.clickSubmit();
});

Then("I should see validation error messages for mandatory fields", () => {
    contactpage.errorMessagesForManFields();
});

When("I populate all mandatory fields with valid data", () => {
    contactpage.inputMandatoryFields();
});

Then("all validation error messages should disappear", () => {
    contactpage.validateRemoveErrorMessages();
});

Then('I should see a successful submission message', () => {
    contactpage.successfulSumbit();
});

When("I navigate to the Shopping Page", () => {
    homepage.goToShopping();
});

When('I add the following products to the cart', (dataTable) => {
    dataTable.hashes().forEach(row => {
        const productName = row.Product;
        const quantity = parseInt(row.Quantity);

        cy.contains('h4.product-title', productName)
            .parents('.product')
            .within(() => {
                for (let i = 0; i < quantity; i++) {
                    cy.get('a.btn.btn-success').click();
                }
            });
    });

});

When("I go to Cart Page", () => {
    shoppingpage.gotToCart();
});

Then('I should see correct pricing details', (dataTable) => {
    cartpage.validateProductPrices(dataTable.hashes());
    cartpage.validateProductSubtotals(dataTable.hashes());
});


Then('the total should equal the sum of all product subtotals', () => {
     cartpage.validateTotal('.total');
});