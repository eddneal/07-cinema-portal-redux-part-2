import React, {Component} from 'react';
import MovieItem from './MovieItem';
import {Item, Container, Message, Button, Grid} from 'semantic-ui-react';
import axios from './../api/axios';

class MovieList extends Component {
  constructor (props) {
    super(props);

    this.handleReload = this.handleReload.bind(this);

    this.state = {
      movies: [],
      error: null,
      isLoading: false
    };
  }

  componentDidMount () {
    this.loadMovies();
  }

  handleReload () {
    this.loadMovies();
  }

  loadMovies () {
    this.setState({isLoading: true});

    // called on success response from the server
    const onSuccess = (response) => {
      const movies = response.data;

      this.setState({movies, isLoading: false, error: null});
    };

    // called when request fails
    const onReject = (response) => {
      const error = response.data && response.data.error
        ? response.data.error.message
        : 'Unknown server error';
      this.setState({error, isLoading: false, movies: []})
    };

    axios.get('/movies').then(onSuccess, onReject);
  }

  renderMovies (movie) {
    return (
      <MovieItem key={movie.id} movie={movie}/>
    );
  }

  render () {
    const {
      movies,
      error,
      isLoading
    } = this.state;

    if (error) {
      return (
        <Grid centered>
          <Grid.Column width={8}>
            <Message negative>
              <Message.Header>Error while loading movies.</Message.Header>
              <p>{error.message}</p>
              <Button loading={isLoading} basic color='red'
                      onClick={this.handleReload}>reload</Button>
            </Message>
          </Grid.Column>
        </Grid>
      );
    }

    return (
      <Container>
        <Item.Group divided>
          {movies.map(this.renderMovies)}
        </Item.Group>
      </Container>
    );
  }
}

export default MovieList;