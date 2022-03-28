/**
 * Copyright 2022 Design Barn Inc.
 */

context("Player component DOM check", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/load");
  });

  it('Loads an animation on page.', () => {
    cy.get("#player-one").should("have.length", 1);
  });

  it('Checks that loading with an empty URL displays an error.', function () {
    cy.get("#container-two .lf-error")
      .should("have.class", "lf-error");
  });

  it('Loads an animation with invalid url.', function () {
    cy.get("#container-three .lf-error")
      .should("have.class", "lf-error");
  });

  it("Looks for lf-player-container class", () => {
    cy.get("#container-one .lf-player-container")
      .should("have.class", "lf-player-container");
  });

  it("Looks lf-player-controls class", () => {
    cy.get("#container-one .lf-player-controls")
      .should("have.class", "lf-player-controls");
  });

  it.skip("Looks inside shadow-dom for aria-label", () => {
    cy.get("#player-one lottie-player")
      .shadow()
      .find("#animation-container")
      .should("have.attr", "aria-label");
  });

  it("Verifies controls", () => {
    cy.get("#container-one")
      .find(".lf-player-controls")
      cy.get("#container-one")
      .find(".lf-player-btn").should('have.length', 3)
  });
});
