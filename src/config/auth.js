import Amplify from 'aws-amplify';

export default function iniciarConfiguracionAPI() {
  Amplify.configure({
    Auth: {
      mandatorySignIn: true,
      region: process.env.REACT_APP_COGNITO_REGION,
      userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
      userPoolWebClientId: process.env.REACT_APP_COGNITO_APP_CLIENT_ID,
      identityPoolId: process.env.REACT_APP_COGNITO_IDENTITY_POOL_ID,
      oauth: {
        domain: process.env.REACT_APP_COGNITO_USER_POOL_DOMAIN_NAME,
        redirectSignIn: `${process.env.REACT_APP_DOMAIN}/login-federado`,
        redirectSignOut: `${process.env.REACT_APP_DOMAIN}/logout-federado`,
        responseType: 'code',
        scope: ['email', 'openid', 'aws.cognito.signin.user.admin'],
      },
    },

    API: {
      endpoints: [
        {
          name: process.env.REACT_APP_API_GATEWAY_NAME,
          endpoint: process.env.REACT_APP_API_GATEWAY_URL,
          region: process.env.REACT_APP_COGNITO_REGION,
        },
      ],
    },
  })
}
