import React, { PropTypes } from 'react';
import {
  Button,
  Icon
} from 'semantic-ui-react';

const BuyButton = (props) => {
  return (
    <Button animated='vertical' onClick={props.onClick}>
      <Button.Content hidden>Buy</Button.Content>
      <Button.Content visible>
        <Icon name='shop'/>
      </Button.Content>
    </Button>
  );
};

BuyButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default BuyButton;