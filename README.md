## Important:
This plugin can not be used with clean-css-brunch. Clean-css-brunch will concatenate all css files into one css file which will undo the results from bless-brunch. Please visit [blesscss.com](http://blesscss.com) for more information.

## Installation

```
npm install --save-dev bless-brunch
```

## Configuration

Optionally, you can configure the plugin for your needs.

```js
module.exports.plugins = {
  bless: {
    cacheBuster: true,
    cleanup: true,
    compress: true,
    force: false,
    imports: true,
    outputDirectory: undefined // Output directory for blessed css files.
  }
}
```

## License

[MIT](https://raw.github.com/babel/babel-brunch/master/LICENSE)
