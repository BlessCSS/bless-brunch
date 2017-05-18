const bless = require('bless');
const path = require('path');
const fs = require('fs-extra');
const assign = require('lodash/assign');
const isArray = require('lodash/isArray');
const isString = require('lodash/isString');
const isFunction = require('lodash/isFunction');

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
      cacheBuster: true,
      cleanup: true,
      compress: true,
      force: false,
      imports: true,
      outputDirectory: undefined
    }, options);
  }

  onCompile(generatedFiles = [], done) {
    if (isArray(generatedFiles) === false) {
      generatedFiles = [generatedFiles];
    }

    const files = generatedFiles.filter((file) => {
      return path.extname(file.path) === '.css';
    });

    files.forEach((file) => {
      const content = fs.readFileSync(file.path, 'utf-8').toString();
      const parser = new bless.Parser({ output: file.path, options: this.options });
      parser.parse(content, (error, files, numSelectors) => {
        if (error) {
          throw error;
        }

        files.forEach((file) => {
          const outputDirectory = this.options.outputDirectory || path.dirname(file.filename);
          fs.ensureDirSync(outputDirectory);
          fs.writeFileSync(path.resolve(outputDirectory, path.basename(file.filename)), file.content, 'utf8');
        });

        if (isFunction(done)) {
          done();
        }
      });
    });
  }
}

module.exports = BlessCompiler;
