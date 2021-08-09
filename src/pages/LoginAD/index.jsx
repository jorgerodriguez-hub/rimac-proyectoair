import React from 'react';
import { Auth } from 'aws-amplify';
// components
import { HeaderRimac } from '../../components/Header/HeaderRimac';
import BtnWeGo from '../../components/Button/BtnWeGoAuth';
// images
import Boy from './images/boy.svg';
import Girl from './images/girl.svg';
// styles
// import { HOME } from '../../constants/urls'

import './styles.scss'

function LoginAD({ history: { push } }) {

  Auth.currentAuthenticatedUser()
    .then((session) => {
      if (Object.entries(session).length > 0) {
        // push(HOME)
      }
    })
    .catch((err) => {
      console.error(err)
    })
  async function handleClickAuth() {
    const provider = process.env.REACT_APP_COGNITO_OAUTH_PROVIDER
    try {
      await Auth.federatedSignIn({
        provider,
      })
    } catch (error) {
      console.error('Ocurrio un error con el login', error)
    }
  }
  return (
    <div id="body">
      <HeaderRimac />
      <main className="index" id="login">
        <div className="box">
          <div>
            <div className="box__cloud is-cloud1" />
            <div className="box__cloud is-cloud2" />
            <div className="box__cloud is-cloud3" />
            <div className="box__house" />
          </div>
        </div>
        <div className="wrap">
          <div className="content">
            <h2 className="title">
              ¡Hola! <br />
              comencemos <br />
              <strong>un día genial</strong>
            </h2>
            <BtnWeGo text="Vamos!" onClick={handleClickAuth} />
          </div>
          <img className="people is-girl" src={Girl} alt="Rimac" />
          <img className="people is-boy" src={Boy} alt="Rimac" />
        </div>
      </main>
    </div>
  )
}

export default LoginAD;