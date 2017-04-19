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
import {connect} from 'react-redux';
import {getMovie} from '../actions/movies';
import {addOrder} from '../actions/orders';
import BuyButton from './../components/buttons/BuyButton';
import Price from './../components/utils/Price';

class PurchasePage extends Component {
  constructor (props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleBuy = this.handleBuy.bind(this);

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
    const {
      movie,
      onAddOrder,
      history
    } = this.props;

    onAddOrder(
      {movieId: movie.id, noOfTickets: this.state.noOfTickets},
      history
    );
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
      movie,
      canBuyTickets
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
                src={this.getImageSrc()}/>
            </Grid.Column>
            <Grid.Column width={8}>
              {this.getDescription()}
            </Grid.Column>
            <Grid.Column width={4}>
              <div>
                {canBuyTickets ? <Input
                  value={noOfTickets}
                  onChange={this.handleChange}
                  size='mini'
                  action={<BuyButton onClick={this.handleBuy}/>}
                  type='number'
                /> : 'Log-in to buy tickets'}
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
  }).isRequired,
  movie: PropTypes.object,
  error: PropTypes.string,
  isLoading: PropTypes.bool,
  canBuyTickets: PropTypes.bool,
  getMovie: PropTypes.func,
  onAddOrder: PropTypes.func
};

const mapStateToProps = (state) => ({
  isLoading: state.movies.isLoading,
  movie: state.movies.movie,
  error: state.movies.error,
  canBuyTickets: Boolean(state.login.user)
});

const mapDispatchToProps = {
  getMovie,
  onAddOrder: addOrder
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PurchasePage);
