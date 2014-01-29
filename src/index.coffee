bless = require 'bless'
path = require 'path'
fs = require 'fs'
_ = require 'lodash'

module.exports = class BlessCompiler
  brunchPlugin: yes
  type: 'stylesheet'

  constructor: (@config) ->
    defaultOptions =
      cacheBuster: yes
      cleanup: yes
      compress: yes
      force: no
      imports: yes

    @options = @config?.plugins?.bless ? {}
    @options = _.merge defaultOptions, @options

  onCompile: (geenratedFiles) =>
    geenratedFiles.filter (file) ->
      path.extname(file.path) is '.css'
    .forEach (cssfile) =>
      cssContent = fs.readFileSync(cssfile.path).toString()
      parser = new bless.Parser output: cssfile.path, options: @options
      parser.parse cssContent, (err, files, numSelectors) ->
        throw err if err
        _(files).forEach (file) ->
          fs.writeFileSync file.filename, file.content

