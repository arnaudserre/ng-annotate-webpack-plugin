ng-annotate-webpack-plugin-patched
==========================

WebPack plugin that runs [ng-annotate-patched](https://github.com/bluetech/ng-annotate-patched) on your bundles

Fork of [ng-annotate-webpack-plugin](https://github.com/jeffling/ng-annotate-webpack-plugin)

# Usage
In webpack.config.js:
```javascript
var webpack = require('webpack');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin-patched');

module.exports = {
    /// ... rest of config
    plugins: [
        new ngAnnotatePlugin()
    ]
}
```
To modify the default plugin options or to add options for `ng-annotate`:
```javascript
var webpack = require('webpack');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin-patched');

module.exports = {
    /// ... rest of config
    plugins: [
        new ngAnnotatePlugin({
            add: true,
            // other ng-annotate options here
        })
    ]
}
```

Since version 0.4.0: for performance reasons, chunks where the name starts with `vendors~` are not
annotated. To customize this behavior, set the option `annotateChunk` to a method that returns
`true` if a chunk should be annotated:

```javascript
var webpack = require('webpack');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin-patched');

module.exports = {
    /// ... rest of config
    plugins: [
        new ngAnnotatePlugin({
            add: true,
            annotateChunk: (chunk) => !chunk.name || !chunk.name.startsWith("vendors~"),
            // other ng-annotate options here
        })
    ]
}
```
