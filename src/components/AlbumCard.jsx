import React, { PureComponent } from 'react'
import { Button, Card, Image, Label, Icon, Popup } from 'semantic-ui-react'
import injectSheet from 'react-jss'

const styles = {
  image: {
    height: 290,
  },
}

class AlbumCard extends PureComponent {
  state = {
    isPopupOpen: false,
  }

  showPopup = () => {
    this.setState({ isPopupOpen: true })

    setTimeout(() => {
      this.setState({ isPopupOpen: false })
    }, 1000)
  }

  handleClickCopyButton = () => {
    this.props.onClickActionButton()
    this.showPopup()
  }

  handleBookmark = () => {
    this.props.onBookmark(this.props.id)
  }

  render() {
    return (
      <Card id={this.props.id} raised>
        <Image
          src={this.props.imageHref}
          className={this.props.classes.image}
        />
        <Card.Content>
          <Card.Header content={this.props.header} />
          <Card.Header href={this.props.href} target="_blank">
            {this.props.subHeader}
          </Card.Header>
          <Card.Meta>{this.props.meta}</Card.Meta>
          <Card.Description>{this.props.description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Label
            as="a"
            content={<Icon name="bookmark" />}
            color={this.props.bookmarked ? 'green' : undefined}
            onClick={this.handleBookmark}
            ribbon
          />
          <Popup
            trigger={<Button icon="spotify" floated="right" />}
            content={`Copied Spotify search to clipboard`}
            on="click"
            open={this.state.isPopupOpen}
            onOpen={this.handleClickCopyButton}
            inverted
            position="top center"
          />
        </Card.Content>
      </Card>
    )
  }
}

export default injectSheet(styles)(AlbumCard)
