/* eslint-disable import/prefer-default-export */
import React from 'react';
import './styles.scss';

export const HeaderRimac = () => {
  return (
    <header id="header" className="">
      <div className="header" style={{ borderBottom: 0, zIndex: 1 }}>
        <div className="wrap">
          <h1 className="logo">Rimac</h1>
        </div>
      </div>
    </header>
  )
}
