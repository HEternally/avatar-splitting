import babel from "rollup-plugin-babel";
import uglify from "rollup-plugin-uglify";
import sourcemaps from "rollup-plugin-sourcemaps";
import resolve from "rollup-plugin-node-resolve";

// 引入包配置
const packages = require('./package.json');

// 环境变量
const env = process.env.NODE_ENV;

const paths = {
    root: '/',
    source: {
        root: env === 'example' ? './demo/' : './src/',
    },
    dist: {
        root: env === 'example' ? './demo/dist/' : './dist/',
    },
};

let fileName,
    config;

switch (env) {
    case 'development':
        fileName = packages.name;
        break;
    case 'example':
        fileName = 'index';
        break;
    case 'production':
        fileName = `${packages.name}.min`;
        break;
}

config = {
    input: `${paths.source.root}index.js`,
    output: {
        file: `${paths.dist.root}${fileName}.js`,
        format: 'umd',
        name: 'avatar',
        exports: 'named', 
        sourcemap: true,
    },
    plugins: [
        babel(),
        sourcemaps(),
        resolve(),
        (env === 'production' && uglify()) ,
    ],
};

export default config;