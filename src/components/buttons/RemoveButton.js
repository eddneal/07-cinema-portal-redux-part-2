import React, {PropTypes} from 'react';
import { Button } from 'semantic-ui-react';

const RemoveButton = (props) => {
  return (
    <Button color='red' onClick={props.onClick}>Delete</Button>
  );
};

RemoveButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default RemoveButton;