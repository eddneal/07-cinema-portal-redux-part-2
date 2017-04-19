import React, {Component, PropTypes} from 'react';
import {
  Container,
  Header,
  Segment,
  Divider,
  Item
} from 'semantic-ui-react';
import Order from './Order';
import Price from './utils/Price';

class Checkout extends Component {
  constructor (props) {
    super(props);

    this.state = {
      isLoading: false,
      orders: []
    };
  }

  /*
    TODO:

    When this component is rendered, call REST API to retrieve all orders (GET /orders).
    You also need movies to display images & titles (GET /movies)

    Please note that you need to be logged in to perform the API request.
   */

  handleOrderDelete (order) {
    // TODO call REST API to delete order (DELETE /orders/:id)
    console.log(order);
  }

  renderOrder (order) {
    return (
      <Order key={order.id} order={order} onRemoveOrder={this.handleOrderDelete} />
    );
  }

  render() {
    /*
     * TODO display orders
     */
    const orders = [{id: 1}, {id: 2}].map((order) => this.renderOrder(order));

    return (
      <Container>
        <Header as='h2' attached='top'>
          Your orders
        </Header>
        <Segment attached>
          <Item.Group>
            {orders}
          </Item.Group>
          <Divider section/>
          <div style={{float: 'right'}}>
            <Price price={NaN} label='Total amount' />
          </div>
          <div style={{clear: 'both'}}></div>
        </Segment>
      </Container>
    );
  }
}

Checkout.propTypes = {
  user: PropTypes.object
};

export default Checkout;