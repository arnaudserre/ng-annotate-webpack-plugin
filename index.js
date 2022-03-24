const ngAnnotate = require('ng-annotate-patched');
const SourceMapSource = require('webpack-core/lib/SourceMapSource');

function ngAnnotatePlugin(options) {
    this.options = options || {add: true, sourceMap: false};
}

ngAnnotatePlugin.prototype.apply = function apply(compiler) {
    var options = this.options;


    compiler.hooks.compilation.tap('NgAnnotateWebpackPlugin', (compilation) => {
        compilation.hooks.processAssets.tap(
            {
                name: 'NgAnnotateWebpackPlugin',
                stage: Compilation.PROCESS_ASSETS_STAGE_PRE_PROCESS, // see below for more stages
            },
            (assets) => {

                function annotateFile(asset) {
                    if (options.sourceMap) {
                        options.map = {
                            inFile: file,
                            sourceRoot: ""
                        };
                    }
                    var value = ngAnnotate(asset.source(), options);

                    if (options.sourceMap && asset.sourceAndMap) {
                        var sourceAndMap = asset.sourceAndMap();
                        var map = sourceAndMap.map;
                        var input = sourceAndMap.source;
                    } else {
                        map = asset.map();
                    }

                    if (!value.errors) {
                        if (options.sourceMap && asset.sourceAndMap) {
                            return new SourceMapSource(value.src, file, JSON.parse(value.map), input, map);
                        } else {
                            asset.src = value.src;
                            return new SourceMapSource(value.src, file, map);
                        }
                    }
                }

                assets.forEach((asset, index) => console.log('toto'+index, asset));
                Object.entries(assets).forEach(([pathname, source]) => {
                    console.log(`— ${pathname}: ${source.size()} bytes`);
                });
            }
        );
    });
};

module.exports = ngAnnotatePlugin;
