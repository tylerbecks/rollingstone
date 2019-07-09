import React from 'react'
import FilterInput from './FilterInput'
import injectSheet from 'react-jss'

const styles = {
  base: {
    alignItems: 'center',
    background: 'linear-gradient(rgb(30, 50, 100), rgb(4, 6, 12) 85%)',
    display: 'flex',
    flexFlow: 'column noWrap',
    height: '100%',
    padding: '1.45rem 1.0875rem',
    textAlign: 'center',
  },
  header: {
    color: 'white',
    margin: '0 0 10 0',
  },
}

const Header = ({ classes, siteTitle, onChangeFilter, filter }) => (
  <div className={classes.base}>
    <h2 className={classes.header}>{siteTitle}</h2>
    <FilterInput onChange={onChangeFilter} value={filter} />
  </div>
)

export default injectSheet(styles)(Header)
