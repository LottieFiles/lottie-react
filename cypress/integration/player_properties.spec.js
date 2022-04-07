/**
 * Copyright 2022 Design Barn Inc.
 */

context("Player properties", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/properties");
  });

  it("Player-one Should have a green background.", () => {
    cy.get("#player-one")
      .should("have.css", "background-color")
      .and("eq", "rgb(0, 255, 107)");
  });

  it("Player-two should play at x5 the speed", () => {
    cy.wait(3000);
    cy.window().then( (win) => {
      if (!win.lottie.getRegisteredAnimations()[1].playSpeed === 5)
        done();
    });
  });

  it("Player-three should autoplay and loop", function (done) {
    cy.wait(3000);
    cy.window().then( (win) => {
      if (!win.lottie.getRegisteredAnimations()[2].isPaused 
      && win.lottie.getRegisteredAnimations()[2].loop)
        done();
    });

  });

  it("Player-four should play on hover", function (done) {
    cy.wait(3000);
    cy.get("#player-four").trigger('mouseenter');
    cy.window().then( (win) => {
      if (!win.lottie.getRegisteredAnimations()[3].isPaused)
        done();
    });
  });
});
