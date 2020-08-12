export const environment = {
  production: true,
  api: 'https://api.jdlandscaping.net/api',
  socket: {
    url: 'https://api.jdlandscaping.net',
    join: 'join',
    events: 'events',
    messages: 'messages',
  },
  googleInvisibleRecaptchaKey: '6LdaneQUAAAAANVw1pYDovFtC2jCMWnPFrlILYMZ',
  googleApiKey: 'AIzaSyB5fITwebnKaPmHI-rAGpPNPG7xhIXwbSA',
  googleOauthClientId: '447253768879-ieo9k6qiuj2oablpffgvga88mnma3qd0.apps.googleusercontent.com', // TODO: for production
  googleReviewUrl: 'https://bit.ly/3dLElpp',
  stripe: {
    publicKey: 'pk_live_DyA13WzSE4cjNajDNjx8nqej',
  },
  plaid: {
    clientId: '5c9d1715c90ab1001505f20d',
    publicKey: '0b96ac63e35cbd0630d9bb6f3459f5',
  },
  localStorage: {
    prefix: 'jobhub',
    accessToken: 'access_token',
    customerSignupWizard: 'customer_signup_wizard'
  }
};
