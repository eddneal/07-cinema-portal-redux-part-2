import React, {Component} from 'react';
import {connect} from 'react-redux';
import MovieItem from './../components/MovieItem';
import {Item, Container, Message, Button, Grid} from 'semantic-ui-react';
import {getAllMovies} from './../actions/movies';

class MovieList extends Component {
  constructor (props) {
    super(props);

    this.handleReload = this.handleReload.bind(this);
  }

  componentDidMount () {
    this.props.getAllMovies();
  }

  handleReload () {
    this.props.getAllMovies(true);
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
    } = this.props; // TODO "isLoading" & "error" not implemented correctly, fix it

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

const mapStateToProps = (state) => ({
  movies: state.movies.movies
});

const mapDispatchToProps = {
  getAllMovies
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);
