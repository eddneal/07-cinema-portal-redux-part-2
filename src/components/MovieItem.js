import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';
import { Item, Label, Icon, Button } from 'semantic-ui-react';
import BuyTicketsButton from './buttons/BuyTicketsButton';
import dateformat from 'dateformat';

const MovieItem = ({movie, history}) => {
  const handleBuyClick = () => {
    history.push(`/movie/${movie.id}/buy`);
  };
  const date = dateformat(movie.when, 'dd. mm. yyyy HH:MM');
  const label = (
    <Label ribbon color={movie.availableSeats ? 'blue' : 'grey'}>
      Price: {movie.price}
      &nbsp;
      <Icon name='dollar' />
    </Label>
  );
  const tags = movie.tags.map(tag => <Label key={tag}>{tag}</Label>);

  return (
    <Item>
      <Item.Image src={movie.image} label={label} />

      <Item.Content>
        <Item.Header as='a'>{movie.title}</Item.Header>
        <Item.Meta>
          <span className='cinema'>{date} - {movie.venue}</span>
        </Item.Meta>
        <Item.Description>{movie.description}</Item.Description>
        <Item.Extra>
          {tags}
          {movie.availableSeats ?
            <BuyTicketsButton onClick={handleBuyClick} /> :
            <Button floated='right' disabled>Sold out</Button>
          }
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

MovieItem.propTypes = {
  history: PropTypes.object.isRequired,
  movie: PropTypes.object.isRequired
};

export default withRouter(MovieItem);