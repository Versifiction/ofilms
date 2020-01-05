/* eslint-disable no-undef */
// ignore uncaught exceptions
Cypress.on("uncaught:exception", err => {
  return false;
});

// patch Cypress top.onerror
Object.defineProperty(top, "onerror", {
  value: window.onerror
});

describe("Mon premier test", function() {
  it("Ca fait rien de spécial", function() {
    expect(true).to.equal(true);
  });
});

describe("Un autre test", function() {
  it("Ca va sur la landing page du projet", function() {
    cy.visit("http://localhost:3000");
  });

  it("Il y a 10 li dans le ul, et ils contiennent des termes précis", function() {
    cy.get(".sidenav-trigger").should($liste => {
      expect($liste, "10 items").to.have.length(4);

      expect($liste.eq(0), "first item").to.contain("O'Films");

      expect($liste.eq(1), "second item").to.contain("Films");

      expect($liste.eq(2), "third item").to.contain("Séries");
    });
  });

  it("Le h1 doit avoir la classe accueil-title", function() {
    cy.get("h1").should("have.class", "accueil-title");
  });

  it("Au clic sur l'icone chat, le chat doit apparaitre", function() {
    cy.get(".floating-chat-button").trigger("click");

    cy.get(".floating-chat-container").should("be.visible");
  });

  it("Scroller à la position voulue", function() {
    cy.scrollTo(0, 0);
  });

  //   it("Remplit les 2 inputs et prends un screenshot", function() {
  //     cy.get('[name="Email"]').type("marc.charpentier@scpp.fr");

  //     cy.get('[name="Password"]').type("mot de passe");

  //     cy.screenshot({
  //       blackout: ['[name="Email"]', '[name="Password"]'],

  //       clip: { x: 0, y: 0, width: 100, height: 100 }
  //     });

  //     cy.get("form").submit();
  //   });

  //   it("Obtenir les 5 dernières lettres de la SCPP, vérifier ses propriétés et sa longueur", function() {
  //     cy.request(Cypress.env("GET_5_LAST_LETTERS")).should(response => {
  //       if (response.status === 200) {
  //         expect(response).to.have.property("headers");

  //         expect(response).to.have.property("duration");

  //         expect(response.body).to.have.length(6);

  //         expect(response.body[5]).to.have.property(
  //           "titre",

  //           "Lettre de Février 2019"
  //         );
  //       }
  //     });
  //   });

  it("Mettre en place un cookie dans le navigateur", function() {
    cy.setCookie("Cookie", "au chocolat");
  });

  //   it("Lire le contenu d'un fichier", function() {
  //     cy.readFile("cypress/hi.txt").should("eq", "Hello");
  //   });

  //   it("Écrire dans un fichier", function() {

  //     cy.writeFile("cypress/hi.txt", "Hello")

  //   })

  it("Régler la taille du viewport en iPhone 6 (en pixels ou avec des appareils prédéfinis)", function() {
    cy.viewport("iphone-6");

    cy.wait(1500);
  });

  it("Remettre le viewport en desktop", function() {
    cy.viewport(1400, 900);
  });

  //   it("Clear les values d'un input", function() {
  //     cy.get('[name="Email"]').clear();

  //     cy.get('[name="Password"]').clear();
  //   });

  it("Scroller à la position voulue", function() {
    cy.scrollTo(0, 0);
  });
});
