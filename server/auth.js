const axiox = require('axios');

const config = require('../config');

const {
  client_id,
  client_secret,
  request_token_url,
  user_info_url,
} = config.github;

module.exports = server => {
  server.use(async (ctx, next) => {
    if (ctx.path === '/auth') {
      const code = ctx.query.code;
      if (!code) {
        ctx.body = 'code not exist';
        return;
      }

      const result = await axiox({
        method: 'POST',
        url: request_token_url,
        data: {
          client_id,
          client_secret,
          code,
        },
        headers: {
          Accept: 'application/json',
        },
      });

      if (result.status === 200 && result.data && !result.data.error) {
        ctx.session.githubAuth = result.data;
        const { access_token, token_type } = result.data;

        const userInfoResp = await axiox({
          method: 'GET',
          url: user_info_url,
          headers: {
            Authorization: `${token_type} ${access_token}`,
          },
        });

        // eslint-disable-next-line
        console.log('userInfoResp: ', userInfoResp);
        ctx.session.userInfo = userInfoResp.data;

        ctx.redirect('/');
      } else {
        const errorMsg = result.data && result.data.error;
        ctx.body = `request token faild ${errorMsg}`;
      }
    } else {
      await next();
    }
  });
};
