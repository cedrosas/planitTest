Feature: Contact Form Validation

Scenario: Validate required fields and error messages on Contact page
    Given I am on the home page
    When I navigate to the contact page
    And I click the submit button
    Then I should see validation error messages for mandatory fields
    When I populate all mandatory fields with valid data
    Then all validation error messages should disappear

Scenario: Successfully submitting the contact form
    Given I am on the home page
    When I navigate to the contact page
    And I populate all mandatory fields with valid data
    And I click the submit button
    Then I should see a successful submission message

Scenario: Verify cart pricing and total calculation
  Given I am on the home page
  When I navigate to the Shopping Page
  When I add the following products to the cart
    | Product          | Quantity |
    | Stuffed Frog     | 2        |
    | Fluffy Bunny     | 5        |
    | Valentine Bear   | 3        |
  When I go to Cart Page
  Then I should see correct pricing details
    | Product          | Price  | Quantity | Subtotal |
    | Stuffed Frog     | 10.99  | 2        | 21.98    |
    | Fluffy Bunny     | 9.99   | 5        | 49.95    |
    | Valentine Bear   | 14.99  | 3        | 44.97    |
  And the total should equal the sum of all product subtotals
