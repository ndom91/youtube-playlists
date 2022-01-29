/// <reference types="cypress" />

context("YT Actions", () => {
  it("Add Video - Drag", () => {
    cy.fixture("video.json").as("video1");
    cy.visit("http://localhost:3000");
    cy.intercept("GET", "https://yt-details.ndo.workers.dev/*", { fixture: "video.json" })

    const URL = "https://www.youtube.com/watch?v=0oPAJfDgUUM";
    const dataTransfer = {
      files: [{ path: URL }],
      getData: () => {
        return URL;
      },
    };

    cy.get(".container").trigger("dragover", { dataTransfer });

    cy.get("#droptarget")
      .should("contain.text", "Drop Video Here")
      .trigger("drop", { dataTransfer });

    cy.get("#videocard").first().should("contain.text", "Boris Johnson");
  });

  it("Remove Video", () => {
    cy.get("#videocard > button").click();

    cy.get("#videocard").should("not.exist");
  });

  it("Add Video - Clipboard", () => {
    cy.visit("http://localhost:3000");
    cy.fixture("video.json").then((video) => {
      navigator.permissions
        .query({ name: "clipboard-write" })
        .then((result) => {
          console.log(resultGstate);
          if (result.state == "granted" || result.state == "prompt") {
            console.log(video.id);
            navigator.clipboard
              .writeText(`https://youtube.com/watch?v=${video.id}`)
              .then(
                () => {
                  cy.get(".btn-clear")
                    .click()
                    .get(".thumb-fade", { timeout: 10000 })
                    .should("exist");
                  cy.get(".btn-add").click().find("#videocard");
                },
                function () {
                  console.error("Clipboard Write Failed");
                }
              );
          }
        });
    });
  });

  // it("Remove Video", () => {
  //   cy.get("#videocard > button").click();

  //   cy.get("#videocard").should("not.exist");
  // });
});
