import defaultConfig from './config';

let profileConfig = {};

switch (process.env.REACT_APP_PROFILE) {
    case 'prod':
        profileConfig = require('./configProd').default;
        break;
    case 'test':
        profileConfig = require('./configTest').default;
        break;
    default:
        break;
}

const finalConfig = {
    ...defaultConfig,
    ...profileConfig
};

export default finalConfig;
