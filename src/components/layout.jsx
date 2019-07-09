import 'normalize.css'
import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import injectSheet from 'react-jss'

const styles = {
  base: {
    background: 'rgb(4, 6, 12)',
    height: '100%',
  },
}

const Layout = ({ children, classes }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: '500 Greatest Albums of all time' },
            {
              name: 'keywords',
              content: 'music, albums, top, greatest, best, artists, musicians',
            },
          ]}
        >
          <html lang="en" />
          <link
            rel="stylesheet"
            href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.0/dist/semantic.min.css"
          />
        </Helmet>
        <div className={classes.base}>{children}</div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default injectSheet(styles)(Layout)
