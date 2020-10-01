/// <reference types="cypress" />

describe('Server', () => {
  it('Page Load', () => {
    cy.visit('http://localhost:3000') // change URL to match your dev URL
  })
})

context('Network', () => {
  it('Cloudflare Worker - Response Test', () => {
    cy.server()
    cy.request({
      url: 'https://yt-details.ndo.workers.dev/?vid=UqyeVUCwfk4',
    }).should(req => {
      expect(JSON.parse(req.body)).to.be.an('object')
      expect(JSON.parse(req.body)).to.have.a.property('channel')
      expect(JSON.parse(req.body)).to.include({
        channel: 'The Daily Show with Trevor Noah',
      })
    })
  })
})

context('Window', () => {
  it('Page Title', () => {
    cy.server()
    cy.title().should('include', 'Dynamic Playlists')
  })
})

context('Joyride', () => {
  it('First Action', () => {
    cy.get('.react-joyride__beacon').click()

    cy.get('.react-joyride__tooltip').should(
      'contain.text',
      'To begin, drag and drop a YouTube video onto this area.'
    )

    cy.get('.react-joyride__tooltip > button[data-action="close"]').click()
  })
})

context('Actions', () => {
  beforeEach(() => {
    cy.fixture('video.json').as('video1')
  })

  it('Add Video', () => {
    cy.server()
    cy.route('GET', 'https://yt-details.ndo.workers.dev/*', '@video1').as(
      'getVideo'
    )

    const URL = 'https://www.youtube.com/watch?v=0oPAJfDgUUM'
    const dataTransfer = {
      files: [{ path: URL }],
      getData: () => {
        return URL
      },
    }

    cy.get('.container').trigger('dragover', { dataTransfer })

    cy.get('#droptarget')
      .should('contain.text', 'Drop Video Here')
      .trigger('drop', { dataTransfer })

    cy.get('#videocard').first().should('contain.text', 'Techquickie')
  })

  it('Remove Video', () => {
    cy.get('#videocard > button').click()

    cy.get('#videocard').should('not.exist')
  })
})
