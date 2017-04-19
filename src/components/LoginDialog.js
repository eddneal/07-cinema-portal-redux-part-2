import React, {PropTypes, Component} from 'react';
import {Button, Modal, Header, Form, Message} from 'semantic-ui-react';

class LoginDialog extends Component {
  constructor (props) {
    super(props);

    this.handleChangeUsername = this.handleChange.bind(this, 'username');
    this.handleChangePassword = this.handleChange.bind(this, 'password');
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      username: '',
      password: ''
    };
  }

  handleChange (field, e) {
    const value = e.target.value;

    this.setState({[field]: value});
  }

  handleSubmit () {
    this.props.onSubmit(this.state);
  }

  render () {
    return (
      <Modal
        open
        onClose={this.props.onClose}
        size='small'
      >
        <Header icon='user' content='Log-in'/>
        <Modal.Content>
          <div>
            {this.props.error && <Message color='red'>{this.props.error}</Message>}
            <Form>
              <Form.Field>
                <label>Username</label>
                <input
                  placeholder='john'
                  value={this.state.username}
                  onChange={this.handleChangeUsername}
                />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input
                  type='password'
                  value={this.state.password}
                  onChange={this.handleChangePassword}
                />
              </Form.Field>
            </Form>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={this.handleSubmit} inverted>Login</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

LoginDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default LoginDialog;
