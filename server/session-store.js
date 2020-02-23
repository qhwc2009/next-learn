function getRedisSessionID(sid) {
  return `ssid:${sid}`;
}

class RedisSessionStore {
  constructor(client) {
    this.client = client;
  }
  // 获取redis中存储的session 数据
  async get(sid) {
    // eslint-disable-next-line
    console.log('get sid: ', sid);
    const id = getRedisSessionID(sid);
    const data = await this.client.get(id);
    if (!data) {
      return null;
    }
    try {
      const result = JSON.parse(data);
      return result;
    } catch (err) {
      // eslint-disable-next-line
      console.error('err: ', err);
    }
  }

  // 存储session数据到redis
  async set(sid, sess, ttl) {
    // eslint-disable-next-line
    console.log('set sid: ', sid);
    const id = getRedisSessionID(sid);
    if (typeof ttl === 'number') {
      ttl = Math.ceil(ttl / 1000);
    }
    try {
      const sessStr = JSON.stringify(sess);
      if (ttl) {
        await this.client.setex(id, ttl, sessStr);
      } else {
        await this.client.set(id, sessStr);
      }
    } catch (err) {
      // eslint-disable-next-line
      console.error('err: ', err);
    }
  }

  // 从redis中删除某个session
  async destroy(sid) {
    // eslint-disable-next-line
    console.log('delete sid: ', sid);
    const id = getRedisSessionID(sid);
    await this.client.del(id);
  }
}

module.exports = RedisSessionStore;
