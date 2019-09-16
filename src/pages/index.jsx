import React, { PureComponent } from 'react'
import { graphql } from 'gatsby'
import { Container } from 'semantic-ui-react'
import ArrowButtons from '../components/ArrowButtons'
import Layout from '../components/layout'
import Header from '../components/Header'
import AlbumsContainer from '../components/AlbumsContainer'

const ALL_FILTER_FIELDS = ['album', 'band', 'recordLabel', 'rank', 'year']
const ALBUMS_COUNT = 500

export default class IndexPage extends PureComponent {
  state = {
    bookmarkedId: null,
    filter: '',
    currentAlbumIndex: null,
  }

  componentDidMount() {
    const bookmarkedId = this.getBookmarkedId()
    this.setState({
      bookmarkedId,
      currentAlbumIndex: bookmarkedId ? ALBUMS_COUNT - bookmarkedId : 0,
    })
  }

  incrementAlbum = () => {
    this.setState(({ currentAlbumIndex }) => ({
      currentAlbumIndex: currentAlbumIndex + 1,
    }))
  }

  decrementAlbum = () => {
    this.setState(({ currentAlbumIndex }) => ({
      currentAlbumIndex: currentAlbumIndex - 1,
    }))
  }

  getBookmarkedId() {
    // Only reference window in componentDidMount
    // https://www.gatsbyjs.org/docs/debugging-html-builds/#how-to-check-if-code-classlanguage-textwindowcode-is-defined
    const { hash } = window.location
    return Number(hash.slice(1))
  }

  handleChangeFilter = filter => {
    this.setState({ filter, currentAlbumIndex: 0 })
  }

  getFilteredAlbums = () => {
    const { edges } = this.props.data.allAlbumsJson
    if (this.state.filter === '') return edges

    return edges.filter(({ node }) => {
      for (const field of ALL_FILTER_FIELDS) {
        if (this.matchesFilter(node[field])) {
          return true
        }
      }
      return false
    })
  }

  matchesFilter = value => {
    if (!value) return false

    let valueStr = Number.isInteger(value) ? value.toString() : value
    const lowerCaseStr = valueStr.toLowerCase()
    return lowerCaseStr.match(this.state.filter.toLowerCase())
  }

  handleBookmark = albumId => {
    window.location.hash = `#${albumId}`
    this.setState({ bookmarkedId: albumId })
  }

  render() {
    const filteredAlbums = this.getFilteredAlbums()

    return (
      <Layout>
        <Header
          siteTitle={this.props.data.site.siteMetadata.title}
          onChangeFilter={this.handleChangeFilter}
          filter={this.state.filter}
        />
        <Container>
          <ArrowButtons
            onDecrement={this.decrementAlbum}
            onIncrement={this.incrementAlbum}
            decrementDisabled={this.state.currentAlbumIndex === 0}
            incrementDisabled={
              this.state.currentAlbumIndex === filteredAlbums.length - 1
            }
          />
          <AlbumsContainer
            albums={filteredAlbums}
            bookmarkedId={this.state.bookmarkedId}
            currentAlbumIndex={this.state.currentAlbumIndex}
            onBookmark={this.handleBookmark}
          />
        </Container>
      </Layout>
    )
  }
}

export const query = graphql`
  query IndexPageQuery {
    allAlbumsJson {
      edges {
        node {
          id
          band
          album
          imageHref
          rank
          recordLabel
          year
          description
        }
      }
    }

    site {
      siteMetadata {
        title
      }
    }
  }
`
