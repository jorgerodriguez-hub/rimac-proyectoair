import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

function BtnWeGoAuth({ text = '', onClick }) {
  return (
    <div onClick={onClick}>
      <button type="button" className="btn we-go">
        {text}
      </button>
    </div>
  )
}
BtnWeGoAuth.propTypes ={
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}
export default BtnWeGoAuth
