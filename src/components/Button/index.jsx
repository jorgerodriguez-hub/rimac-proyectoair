import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import AddIcon from '../../assets/icons/gl_add.svg'

// import './styles.sass'
// import './styles.scss'

const classes = {
  addCondition: 'action-button',
  link: 'action-button__link',
}
export function ActionButton({ handleClick, text }) {
  return (
    <div className={classes.addCondition} onClick={handleClick}>
      <img src={AddIcon} alt={text} style={{ marginRight: 10 }} />
      {text}
    </div>
  )
}

export function ActionLink({ text, url }) {
  return (
    <Link to={url} className={classes.link}>
      <img src={AddIcon} alt={text} style={{ marginRight: 10 }} />
      {text}
    </Link>
  )
}

export const Button = (props) => {
  const className = props.className || ''
  const action = props.onClick || null
  const href = props.href || null
  const disabled = props.disabled || false
  const type = props.type || 'button'
  const text = props.text || props.children

  return href ? (
    <a href={href} onClick={action} className={`btn ${className}`}>
      {props.text}
    </a>
  ) : (
    <button
      onClick={action}
      className={`btn ${className}`}
      disabled={disabled}
      type={type}
    >
      {text}
    </button>
  )
}

ActionLink.propTypes = {
  url: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

ActionButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
}
