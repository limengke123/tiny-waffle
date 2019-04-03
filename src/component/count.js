import React from 'react';
import PropTypes from 'prop-types';

class Count extends React.Component {
  static propTypes = {
    count: PropTypes.number
  };

  render() {
    const { count } = this.props;
    return <div>{count}</div>;
  }
}

export { Count };
