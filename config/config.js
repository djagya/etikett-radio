const {env} = process;

const config = {
    env: env.NODE_ENV || "development"
};

const devConfig = {
    db: env.MONGO_LOCAL,
    jwt_key: env.S_KEY
};

const prodConfig = {
    db: env.MoNGO_PROD,
    jwt_key: env.S_KEY
}

const currentConfig = config.env === "production" ? prodConfig : devConfig;

module.exports = Object.assign({}, config, currentConfig);