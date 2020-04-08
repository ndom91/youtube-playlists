/// <reference types="cypress" />

describe('Server Running', () => {
  it('successfully loads', () => {
    cy.visit('http://localhost:3000') // change URL to match your dev URL
  })
})

context('Network Requests', () => {
  it('cy.request() - make an XHR request', () => {
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

context('Window', () => {
  it('cy.title() - get the title', () => {
    cy.server()
    cy.title().should('include', 'Dynamic Playlists')
  })
})

context('Files', () => {
  beforeEach(() => {
    cy.fixture('video.json').as('video1')
  })

  it('Add Video', () => {
    cy.server()
    cy.route('GET', 'https://yt-details.ndo.workers.dev/*', '@video1').as('getVideo')


    const URL = 'https://www.youtube.com/watch?v=0oPAJfDgUUM'
    const dataTransfer = {
      files: [{ path: URL }],
      getData: () => { return URL }
    }

    cy.get('.container')
      .trigger('dragover', { dataTransfer })

    cy.get('#droptarget')
      .should('contain.text', 'Drop Video Here')
      .trigger('drop', { dataTransfer })

    cy.get('#videocard').first()
      .should('contain.text', 'Techquickie')

  })
})