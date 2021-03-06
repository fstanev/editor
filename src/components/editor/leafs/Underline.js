import React from 'react';
import PropTypes from 'prop-types';

const Underline = React.forwardRef(({ children, style, className, ...rest }, ref) => (
  <u style={style} className={className}>
    {children}
  </u>
));

Underline.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default Underline;
