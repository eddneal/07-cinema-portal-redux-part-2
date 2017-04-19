import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

const BuyTicketsButton = (props) => {
  return (
    <Button primary floated='right' onClick={props.onClick}>
      Buy tickets
      <Icon name='right chevron' />
    </Button>
  );
};

export default BuyTicketsButton;