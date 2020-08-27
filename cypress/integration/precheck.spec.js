/// <reference types="cypress" />

describe('Check Server', () => {
  it('Page Load', () => {
    cy.visit('http://localhost:3000') // change URL to match your dev URL
  })
})

context('Check CF Worker', () => {
  it('Cloudflare Worker - Response Test', () => {
    cy.server()
    cy.request({
      url: 'https://yt-details.ndo.workers.dev/?vid=UqyeVUCwfk4',
    })
      .should(req => {
        expect(JSON.parse(req.body)).to.be.an('object')
        expect(JSON.parse(req.body)).to.have.a.property('channel')
        expect(JSON.parse(req.body)).to.include({ "channel": "The Daily Show with Trevor Noah" })
      })
  })
})

context('Check Window', () => {
  it('Page Title', () => {
    cy.server()
    cy.title().should('include', 'Dynamic Playlists')
  })
})

context('Check Joyride', () => {
  it('Joyride Beacons', () => {
    cy.get('.react-joyride__beacon')
      .click()

    cy.get('.react-joyride__tooltip')
      .should('contain.text', 'To begin, drag and drop a YouTube video onto this area.')

    cy.get('.react-joyride__tooltip > button[data-action="close"]')
      .click()
  })

})

