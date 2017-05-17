const bless = require('bless');
const path = require('path');
const fs = require('fs');
const assign = require('lodash/assign');
const isArray = require('lodash/isArray');

class BlessCompiler {
  get brunchPlugin() {
    return true;
  }

  get type() {
    return 'stylesheet';
  }

  constructor(config = {}) {
    const plugins = config.plugins || {};
    const options = plugins.bless || {};
    this.options = assign({
      sourceMaps: false
    }, options);
  }

  onCompile(generatedFiles = []) {
    if (isArray(generatedFiles) === false) {
      generatedFiles = [generatedFiles];
    }

    const files = generatedFiles.filter((file) => {
      return path.extname(file.path) === '.css';
    });

    files.forEach((file) => {
      const content = fs.readFileSync(file.path).toString();
      const parsedContent = bless.chunk(content, this.options);
      parsedContent.data.forEach((content, index) => {
        fs.writeFileSync(path.resolve(path.dirname(file.path), `${path.basename(file.path, path.extname(file.path))}-${index}.${path.extname(file.path)}`), content);
      });
    });
  }
}

module.exports = BlessCompiler;
