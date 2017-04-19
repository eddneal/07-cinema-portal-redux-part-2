import React, {Component, PropTypes} from 'react';
import {
  Container,
  Grid,
  Image,
  Segment,
  Header,
  Input,
  Divider,
  Dimmer,
  Loader
} from 'semantic-ui-react';
import { connect } from 'react-redux'
import { getMovie } from '../actions/movies'
import BuyButton from './buttons/BuyButton';
import Price from './utils/Price';

class PurchasePage extends Component {
  constructor (props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    // TODO 2: use mapStateToProps function from Redux to pass data into props instead of state
    this.state = {
      noOfTickets: 1
    };
  }

  componentDidMount () {
    const movieId = this.props.match.params.id;
    this.props.getMovie(movieId)
  }

  handleChange (e) {
    this.setState({noOfTickets: e.target.value});
  }

  handleBuy () {
    // TODO 3: call Redux action that calls REST API (POST /orders) to save order
    // then you can redirect to homepage by calling this.props.history.push('/');
  }

  getImageSrc () {
    const {movie} = this.props;

    if (movie) {
      return movie.image;
    }

    return 'https://react.semantic-ui.com/assets/images/wireframe/image.png';
  }

  getDescription () {
    const {movie} = this.props;

    if (movie) {
      return movie.description;
    }

    return (
      <Image
        src='https://react.semantic-ui.com/assets/images/wireframe/paragraph.png'/>
    );
  }

  render () {
    const {
      isLoading,
      movie
    } = this.props;
    const {
      noOfTickets
    } = this.state;
    let loadingIndicator = null;

    if (isLoading) {
      loadingIndicator = (
        <Dimmer active inverted>
          <Loader>Loading...</Loader>
        </Dimmer>
      );
    }

    return (
      <Container>
        <Header as='h2' attached='top'>
          {movie && movie.title ? movie.title : '...'}
        </Header>
        <Segment attached>
          {loadingIndicator}
          <Grid>
            <Grid.Column width={4}>
              <Image
                src={this.getImageSrc()} />
            </Grid.Column>
            <Grid.Column width={8}>
              {this.getDescription()}
            </Grid.Column>
            <Grid.Column width={4}>
              <div>
                <Input
                  value={noOfTickets}
                  onChange={this.handleChange}
                  size='mini'
                  action={<BuyButton onClick={this.handleBuy}/>}
                  type='number'
                />
              </div>
              <Divider hidden/>
              <div>
                <Price price={movie && movie.price ? movie.price : NaN}/>
              </div>
            </Grid.Column>
          </Grid>
        </Segment>
      </Container>
    );
  }
}

PurchasePage.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

const mapStateToProps = (state) => ({
  isLoading: state.movies.isLoading,
  movie: state.movies.movie,
  error: state.movies.error,
});

const mapDispatchToProps = {
  getMovie
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PurchasePage);
