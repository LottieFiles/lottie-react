/**
 * Copyright 2022 Design Barn Inc.
 */

context("Player methods", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/methods");
  });

  it("Player-one should have play toggled.", function (done) {
    cy.wait(3000);
    cy.window().then( (win) => {
      if (!win.lottie.getRegisteredAnimations()[0].isPaused)
        done();
    });
  });

  it.skip("Player-two should have loop toggled.", function (done) {
    cy.wait(3000);
    cy.window().then( (win) => {
      if (!win.lottie.getRegisteredAnimations()[1].loop)
        done();
    });
  });

  it("Player-three should play at x5 the speed", function(done) {
    cy.wait(3000);
    cy.window().then( (win) => {
      if (win.lottie.getRegisteredAnimations()[2].playSpeed === 5)
        done();
    });
  });

  it.skip("Player-four Should have a green background.", () => {
    cy.get("#player-four lottie-player")
      .should("have.css", "background-color")
      .and("eq", "rgb(0, 255, 107)");
  });

  it("Player-five should be paused.", function (done) {
    cy.wait(3000);
    cy.window().then( (win) => {
      if (win.lottie.getRegisteredAnimations()[4].isPaused)
        done();
    });
  });
});