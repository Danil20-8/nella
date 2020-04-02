# Nella JSX

since version 0.10.1 nella support JSX components declaration

## Get started

install

```sh
    npm i nella
    npm i -D @babel/core @babel/plugin-syntax-jsx @babel/plugin-transform-react-jsx
    npm i -D webpack webpack-cli babel-loader
    npm i -D html-webpack-plugin
    npm i -D typescript ts-loader
```

.babelrc
```json
{
    "plugins": [
      ["@babel/plugin-transform-react-jsx", { "pragma": "Nella.createElement" }]
    ],
    "comments": false
}
```

webpack.config.js
```js
const path = require('path');
const webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        index: "./index.tsx"
    },
    output: {
        filename: "[name].[hash].js",
        path: path.resolve(__dirname, '../dist'),
    },
    devtool: false,
    plugins: [
        new webpack.SourceMapDevToolPlugin({}),
        new HtmlWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ['babel-loader', 'ts-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.jsx?$/,
                use: ['babel-loader'],
                exclude: /node_modules/,
            },
        ],
    }
};
```

tsconfig.json
```json
{
    "compilerOptions": {
        "outDir": "./dist/",
        "sourceMap": true,
        "noImplicitAny": false,
        "module": "commonjs",
        "target": "ES6",
        "jsx": "react",
        "jsxFactory": "Nella.createElement",
        "allowJs": true,
    }
}
```

index.tsx
```tsx
import * as Nella from "nella";

class MainComponent extends Nella.Component<null>{
    component() {
        return (
            <div>
                <HelloComponent name="World"></HelloComponent>
            </div>
        )
    }
}

function HelloComponent({ name }) { return <div>Hello {name}!</div> }

Nella.mount(document.body,
    <MainComponent></MainComponent>
);

```