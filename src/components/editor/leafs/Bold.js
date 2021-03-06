import React from 'react';
import PropTypes from 'prop-types';

const Bold = React.forwardRef(({ children, style, className, ...rest }, ref) => (
  <b style={style} className={className}>
    {children}
  </b>
));

Bold.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default Bold;
