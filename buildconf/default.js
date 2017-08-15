const path = require('path');
const process = require('process');
const webpack = require('webpack');
const merge = require('lodash/merge');

const root = path.resolve(__dirname, '..');
const nodeModules = path.join(root, 'node_modules');

const LIBRARY = 'immutably';

const ENV_PRODUCTION = 'production';
const ENV_DEVELOPMENT = 'development';
const ENV_TEST = 'test';
const env = process.env.NODE_ENV;

const confName = process.env.npm_package_config_conf || 'default';
const confFile = root + '/conf/' + confName + '.js'

const conf = {
    path: {
        root: root
    },
    dir: {
        conf: '/conf',
        src: '/src',
        dev: '/dev',
        test: '/test',
        dist: '/dist'
    }
};

conf.eslint = {
    parserOptions: {
        sourceType: 'module',
    },
    rules: {
        'linebreak-style': 0
    },
    bail: false
};

conf.webpack = {
    target: 'web',
    output: {
        library: LIBRARY,
        libraryTarget: 'umd'
    },
    module: {
        rules: [{
            test: /(\.js)$/,
            exclude: [nodeModules],
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['es2015']
                }
            }, {
                loader: 'eslint-loader',
                options: conf.eslint
            }]
        }]
    },
    resolve: {
        extensions: ['.js', '.json'],
        alias: {
            'conf': confFile,
            'src': conf.path.root + conf.dir.src
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            ENV: env
        })
    ],
    devtool: (env === ENV_PRODUCTION) ? false : 'cheap-module-eval-source-map',
    bail: false,
    stats: {
        cached: false,
        children: false,
        colors: true,
        modules: true,
        errors: true,
        errorDetails: true,
        hash: true,
        source: false,
        version: true,
        warnings: true
    }
};

conf.tapepack = merge({}, conf.webpack, {
    target: 'node',
    externals: {
        lodash: 'commonjs lodash',
        morgan: 'commonjs morgan',
        tape: 'commonjs tape'
    },
    plugins: [
        new webpack.DefinePlugin({
            ENV: env
        })
    ],
    devtool: false
});

module.exports = conf;
