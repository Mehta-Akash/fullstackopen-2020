import React, { useState, useImperativeHandle } from 'react';

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  const buttonStyle = {
    cursor: 'pointer',
    backgroundColor: 'rgb(28, 53, 82)',
    color: 'white',
    padding: '0.3rem 5rem',
    marginTop: '0.6rem',
    marginBottom: '2rem',
    marginLeft: '0.3rem',
  };

  const container = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div style={container}>
      <div style={hideWhenVisible}>
        <button style={buttonStyle} onClick={toggleVisibility}>
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button style={buttonStyle} onClick={toggleVisibility}>
          Cancel
        </button>
      </div>
    </div>
  );
});

export default Togglable;
