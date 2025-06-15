Feature: Saucedemo Web UI Functionalities

  Scenario: Successful login
    Given I open the login page
    When I enter username "standard_user" and password "secret_sauce"
    Then I should see the products page

  Scenario: Failed login with wrong password
    Given I open the login page
    When I enter username "standard_user" and password "wrong_password"
    Then I should see an error message

  Scenario: Add item to shopping cart
    Given I am logged in
    When I add the "Sauce Labs Backpack" to the cart
    Then the cart badge should show "1"

  Scenario: Complete checkout process
    Given I have "Sauce Labs Backpack" in the cart
    When I checkout with valid info
    Then I should see a confirmation message
