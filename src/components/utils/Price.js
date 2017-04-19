import React, {PropTypes} from 'react';
import {
  Statistic,
  Icon,
} from 'semantic-ui-react';

const Price = ({price, label}) => {
  return (
    <Statistic>
      <Statistic.Value>
        <Icon name='dollar'/>
        {price}
      </Statistic.Value>
      {label && <Statistic.Label>{label}</Statistic.Label>}
    </Statistic>
  );
};

Price.propTypes = {
  price: PropTypes.number.isRequired,
  label: PropTypes.string
};

export default Price;