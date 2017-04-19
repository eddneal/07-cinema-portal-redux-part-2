import React, {PropTypes} from 'react';
import { Item } from 'semantic-ui-react';
import RemoveButton from './buttons/RemoveButton';

const Order = ({order, onRemoveOrder}) => {
  const onClick = () => onRemoveOrder(order);

  return (
    <Item>
      <Item.Image size='tiny' src='http://www.hans-zimmer.com/~hybrid/zimmer/12YEARSASLAVE.jpg' />

      <Item.Content>
        <Item.Header as='a'>Movie title</Item.Header>
        <Item.Meta>Price: ###</Item.Meta>
        <Item.Extra>
          Date: DD. MM. YYYY HH:ii
        </Item.Extra>
        <RemoveButton onClick={onClick} />
      </Item.Content>
    </Item>
  );
};

Order.propTypes = {
  order: PropTypes.object.isRequired,
  onRemoveOrder: PropTypes.func.isRequired
};

export default Order;