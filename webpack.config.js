const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all',
        },
    };

    if (!IS_DEVELOPMENT) {
        config.minimizer = [
            new OptimizeCssAssetWebpackPlugin(),
            new TerserWebpackPlugin(),
        ];
    }

    return config;
};

const filename = ext => IS_DEVELOPMENT ? `[name].${ext}` : `[name].[hash].${ext}`;

const cssLoaders = extra => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                hmr: IS_DEVELOPMENT,
                reloadAll: true,
            },
        },
        'css-loader',
    ];

    if (extra) {
        loaders.push(extra);
    }

    return loaders;
};

const babelOptions = preset => {
    const opts = {
        presets: [
            '@babel/preset-env',
        ],
        plugins: [
            '@babel/plugin-proposal-class-properties',
        ],
    };

    if (preset) {
        opts.presets.push(preset);
    }

    return opts;
};


const jsLoaders = () => {
    const loaders = [{
        loader: 'babel-loader',
        options: babelOptions(),
    }];

    if (IS_DEVELOPMENT) {
        loaders.push('eslint-loader');
    }

    return loaders;
};

const plugins = () => {
    const base = [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {
                from: './assets/images',
                to: './assets/images',
            },
        ]),
        new MiniCssExtractPlugin({
            filename: filename('css'),
        }),
    ].concat(htmlList);

    if (!IS_DEVELOPMENT) {
        base.push(new BundleAnalyzerPlugin());
    }

    return base;
};

const htmlPages = ['index'];

const htmlList = htmlPages.map(page => {
    if (page !== 'index') {
        return new HtmlWebpackPlugin({
            template: `./${page}.html`,
            filename: `${page}.html`,
            output: `${page}.html`,
            chunks: [`${page}`],
            minify: {
                collapseWhitespace: !IS_DEVELOPMENT,
            },
        });
    }
    return new HtmlWebpackPlugin({
        template: `./index.html`,
        filename: `index.html`,
        output: `index.html`,
        chunks: [`main`],
        minify: {
            collapseWhitespace: !IS_DEVELOPMENT,
        },
    });
});

const entriesList = {};

htmlPages.map((page) => {
    return page === 'index'
        ? entriesList.main = ['@babel/polyfill', `./js/entry/index.js`]
        : entriesList[page] = ['@babel/polyfill', `./js/entry/${page}.js`];
});

console.log(entriesList);

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: entriesList,
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    optimization: optimization(),
    devServer: {
        port: 4200,
        hot: IS_DEVELOPMENT,
        inline: true,
    },
    devtool: IS_DEVELOPMENT ? 'source-map' : '',
    plugins: plugins(),
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders(),
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader'),
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader'],
            },
            {
                test: /\.(ttf|woff|woff2|eot|otf)$/,
                use: ['file-loader'],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: jsLoaders(),
            },
        ],
    },
};