const redis = require("redis");

module.exports = redis.createClient({prefix : "blacklist:"} as any);
//const redisClient  = createClient({prefix : "blacklist:"} as RedisClientOptions);

//export {redis};

/*
    Dois métodos diferentes de exportação e importação;
*/