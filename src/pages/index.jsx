import React, { PureComponent } from 'react'
import { graphql } from 'gatsby'
import { Container, Icon } from 'semantic-ui-react'
import Layout from '../components/layout'
import Header from '../components/Header'
import AlbumsContainer from '../components/AlbumsContainer'
import injectSheet from 'react-jss'

const ALL_FILTER_FIELDS = ['album', 'band', 'recordLabel', 'rank', 'year']
const ALBUMS_COUNT = 500

const styles = {
  arrowContainer: {
    marginBottom: '1.45rem',
  },
  arrowLeft: {
    marginRight: '1.45rem',
  },
}

class IndexPage extends PureComponent {
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

    window.onhashchange = this.handleHashChange
  }

  handleHashChange = () => {
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
          <Container
            textAlign="center"
            className={this.props.classes.arrowContainer}
          >
            <Icon
              inverted
              disabled={this.state.currentAlbumIndex === 0}
              name="angle left"
              size="big"
              onClick={this.decrementAlbum}
              className={this.props.classes.arrowLeft}
            />
            <Icon
              inverted
              disabled={
                this.state.currentAlbumIndex === filteredAlbums.length - 1
              }
              name="angle right"
              size="big"
              onClick={this.incrementAlbum}
            />
          </Container>

          <AlbumsContainer
            albums={filteredAlbums}
            bookmarkedId={this.state.bookmarkedId}
            currentAlbumIndex={this.state.currentAlbumIndex}
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

export default injectSheet(styles)(IndexPage)
