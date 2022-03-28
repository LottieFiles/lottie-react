/**
 * Copyright 2022 Design Barn Inc.
 */

import Lottie from "lottie-web";

context("Player controls", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/controls");
  });

  it("clicks on play button and verifies animation is playing", function (done) {
    cy.wait(2000);
    cy.get("#container-one .lf-player-btn").eq(0).click({force: true});

    cy.window().then( (win) => {
      if (!win.lottie.getRegisteredAnimations()[0].isPaused)
        done();
    });
  });

  it("clicks on pause button and verifies animation is paused", function (done) {
    cy.wait(2000);
    cy.get("#container-two .lf-player-btn").eq(0).click({force: true});

    cy.window().then( (win) => {
      if (win.lottie.getRegisteredAnimations()[1].isPaused)
        done();
    });
  });

  it("clicks on stop button and verififes animation is stopped and at frame 0", function (done) {
    cy.wait(2000);
    cy.get("#container-three .lf-player-btn").eq(1).click({force: true});

    cy.window().then( (win) => {
      if (win.lottie.getRegisteredAnimations()[2].isPaused &&
       win.lottie.getRegisteredAnimations()[2].currentFrame === 0)
        done();
    });
  });

  it("clicks on loop button and verififes animation loops", function (done) {
    cy.get("#container-four .lf-player-btn").eq(2).click();

    cy.wait(3000);
    cy.window().then( (win) => {
      if (!win.lottie.getRegisteredAnimations()[3].loop || win.lottie.getRegisteredAnimations()[3].playCount > 1)
        done();
    });
  });

  it.skip("clicks on color background choice and verifies background color", function () {
    cy.get("#player-five #lottie-controls").find("#lottie-bg-picker-button").click();
    cy.get("#player-five #lottie-controls").find("#lottie-color-choice-4").click();
    cy.get("#player-five lottie-player")
      .should("have.css", "background-color")
      .and("eq", "rgb(58, 146, 218)");
  });
});
