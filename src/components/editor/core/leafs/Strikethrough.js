import React from 'react';
import PropTypes from 'prop-types';

const Strikethrough = React.forwardRef(({ children, style, className, ...rest }, ref) => (
  <span
    style={Object.assign({ textDecoration: 'line-through' }, style)}
    className={className}
  >
    {children}
  </span>
));

Strikethrough.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default Strikethrough;
export const Component = Strikethrough;
export const tag = 'S';
export const key = 'strikethrough';
export const get = () => ({ [key]: true });
