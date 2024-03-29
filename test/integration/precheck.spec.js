/// <reference types="cypress" />

describe('Check Server', () => {
  it('Page Load', () => {
    cy.visit('http://localhost:3000') // change URL to match your dev URL
  })
})

context('Check CF Worker', () => {
  it('Cloudflare Worker - Response Test', () => {
    cy.intercept('GET', 'https://yt-details.ndo.workers.dev/?vid=UqyeVUCwfk4', (req) => {
      expect(JSON.parse(req.body)).to.be.an('object')
      expect(JSON.parse(req.body)).to.have.a.property('channel')
      expect(JSON.parse(req.body)).to.include({
        channel: 'The Daily Show with Trevor Noah',
      })
    })
  })
})

context('Check Window', () => {
  it('Page Title', () => {
    cy.title().should('include', 'Dynamic Playlists')
  })
})
