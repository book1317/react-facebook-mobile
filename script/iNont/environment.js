const ENV = require("../src/config");
// let basename = ENV.BASENAME || "";
// process.env.PUBLIC_URL = basename ? `/${basename}` : "";
process.env.REACT_APP_ENV_CONFIG = JSON.stringify(ENV);
console.log(`Reading env config: ${ENV.NAME}`);
console.log(ENV);
