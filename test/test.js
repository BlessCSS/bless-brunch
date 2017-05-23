const Plugin = require('../');
const fs = require('fs-extra');
const path = require('path');
const expect = require('expect');

describe('Plugin', function() {
  it('should bless a css file that is to large', function(done) {
    const plugin = new Plugin({
      plugins: {
        bless: {
          cacheBuster: false,
          outputDirectory: './test/fixtures/output'
        }
      }
    });
    plugin.onCompile({
      path: path.resolve(__dirname, './fixtures/input/over-limit.css')
    }, () => {
      expect(fs.existsSync(path.resolve(__dirname, './fixtures/output/over-limit.css'))).toEqual(true);
      expect(fs.readFileSync(path.resolve(__dirname, './fixtures/output/over-limit.css'), 'utf8').toString())
        .toEqual(fs.readFileSync(path.resolve(__dirname, './fixtures/expectation/over-limit.css')).toString());

      expect(fs.existsSync(path.resolve(__dirname, './fixtures/output/over-limit-blessed1.css'))).toEqual(true);
      expect(fs.readFileSync(path.resolve(__dirname, './fixtures/output/over-limit-blessed1.css'), 'utf8').toString())
        .toEqual(fs.readFileSync(path.resolve(__dirname, './fixtures/expectation/over-limit-blessed1.css')).toString());

      done();
    });
  });
});
