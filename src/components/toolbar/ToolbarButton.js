import React from 'react';
import PropTypes from 'prop-types';

const ToolbarButton = props => {

  // generate class name
  let className = 'mms--toolbar-button';
  if (props.disabled) className += ' mms--disabled';
  if (props.active) className += ' mms--active';
  if (props.className) className += ` ${props.className}`;

  return (
    <button
      id={props.id}
      className={className}
      style={props.style}
      disabled={props.disabled}
      type={props.type}
      // use onMouseDown instead of onClick to prevent
      // the editor from losing focus on button click
      onMouseDown={e => {
        e.preventDefault();
        if (typeof props.onClick === 'function') props.onClick(e);
        if (typeof props.callback === 'function') props.callback(e);
      }}
    >
      {props.children}
    </button>
  )
};

ToolbarButton.propTypes = {
  id: PropTypes.string,
  children: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  // for the main function of the button
  onClick: PropTypes.func,
  // for side functions of the button
  callback: PropTypes.func,
};

export default ToolbarButton;
