const Koa = require('koa');
const Router = require('koa-router');
const next = require('next');
const session = require('koa-session');
const RedisSessionStore = require('./server/session-store');
const Redis = require('ioredis');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

const handle = app.getRequestHandler();

// 创建redis client
const redis = new Redis({
  password: '123456',
});

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();

  server.keys = ['Wangchen develop github app loveRoad'];
  const SESSION_CONFIG = {
    key: 'jid',
    store: new RedisSessionStore(redis),
  };

  server.use(session(SESSION_CONFIG, server));

  server.use(async (ctx, next) => {
    // eslint-disable-next-line
    console.log('ctx.session.user: ', ctx.session.user);
    await next();
  });

  router.get('/set/user', async ctx => {
    ctx.session.user = {
      name: 'wang chen',
      age: 18,
    };
    ctx.body = 'set session success';
  });
  router.get('/delete/user', async ctx => {
    ctx.session = null;
    ctx.body = 'delete session success';
  });

  router.get('/test/b/:id', async ctx => {
    const id = ctx.params.id;
    await handle(ctx.req, ctx.res, {
      pathname: '/test/b',
      query: { id },
    });
    ctx.respond = false;
  });

  server.use(router.routes());

  server.use(async (ctx, next) => {
    await handle(ctx.req, ctx.res);
    ctx.response = false;
  });

  server.listen(3000, () => {
    console.log('koa is listenning on 3000');
  });
});
