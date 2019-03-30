module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "mocha": true,
    },
    "extends": "standard",
    "globals": {
        "process": "writable"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules" : {
        "indent": ["error", "tab"],
        "semi": ["error", "always"],
        "no-tabs": "off",
        "no-console": "off"
    }
};
