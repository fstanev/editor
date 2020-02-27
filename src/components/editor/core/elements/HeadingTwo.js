import React from 'react';
import PropTypes from 'prop-types';

const HeadingTwo = React.forwardRef(({ children, style, className, ...rest } = {}, ref) => (
  <h2
    style={style}
    className={className}
    {...rest}
  >
    {children}
  </h2>
));

HeadingTwo.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default HeadingTwo;
