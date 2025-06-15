import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// LOGIN
Given("I open the login page", () => {
  cy.visit("/");
});

When("I enter username {string} and password {string}", (username, password) => {
  cy.get('[data-test="username"]').type(username);
  cy.get('[data-test="password"]').type(password);
  cy.get('[data-test="login-button"]').click();
});

Then("I should see the products page", () => {
  cy.url().should("include", "/inventory.html");
});

Then("I should see an error message", () => {
  cy.get('[data-test="error"]').should("be.visible");
});

// CART
Given("I am logged in", () => {
  cy.visit("/");
  cy.get('[data-test="username"]').type("standard_user");
  cy.get('[data-test="password"]').type("secret_sauce");
  cy.get('[data-test="login-button"]').click();
});

When("I add the {string} to the cart", (itemName) => {
  cy.contains(itemName).parents('.inventory_item').find('button').click();
});

Then("the cart badge should show {string}", (count) => {
  cy.get('.shopping_cart_badge').should("have.text", count);
});

// CHECKOUT
Given("I have {string} in the cart", (itemName) => {
  cy.visit("/");
  cy.get('[data-test="username"]').type("standard_user");
  cy.get('[data-test="password"]').type("secret_sauce");
  cy.get('[data-test="login-button"]').click();
  cy.contains(itemName).parents('.inventory_item').find('button').click();
  cy.get('.shopping_cart_link').click();
});

When("I checkout with valid info", () => {
  cy.get('[data-test="checkout"]').click();
  cy.get('[data-test="firstName"]').type("John");
  cy.get('[data-test="lastName"]').type("Doe");
  cy.get('[data-test="postalCode"]').type("12345");
  cy.get('[data-test="continue"]').click();
  cy.get('[data-test="finish"]').click();
});

Then("I should see a confirmation message", () => {
  cy.contains("Thank you for your order").should("be.visible");
});
