import React from 'react'
import injectSheet from 'react-jss'
import { Button, Container } from 'semantic-ui-react'

const styles = {
  container: {
    marginBottom: '1.4rem',
  },
}

const ArrowButtons = ({
  classes,
  onDecrement,
  onIncrement,
  incrementDisabled,
  decrementDisabled,
}) => (
  <Container textAlign="center" className={classes.container}>
    <Button.Group>
      <Button
        onClick={onDecrement}
        circular
        icon="chevron left"
        disabled={decrementDisabled}
        inverted
      />
      <Button
        circular
        disabled={incrementDisabled}
        icon="chevron right"
        inverted
        onClick={onIncrement}
      />
    </Button.Group>
  </Container>
)

export default injectSheet(styles)(ArrowButtons)
