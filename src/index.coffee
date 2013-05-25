bless = require 'bless'
sysPath = require 'path'
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

	minify: (data, path, callback) =>
		parser = new bless.Parser({output: path, options: @options})
		parser.parse data, (err, files, numSelectors) =>
			if (err)
				callback err, data
			else
				appCssFile = null

				for file in files
					filePath = sysPath.join __dirname, "../../../#{file.filename}"
					dir = sysPath.dirname filePath

					if (sysPath.basename(filePath, '.css') is 'app')
						appCssFile = file
					else
						fs.mkdirSync dir unless fs.existsSync dir
						fs.writeFileSync filePath, file.content

				callback err, appCssFile.content