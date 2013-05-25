bless = require 'bless'

module.exports = class BlessCompiler
	brunchPlugin: yes
	type: 'stylesheet'

	constructor: (@config) ->
		@options = @config?.plugins?.bless ? {}

	minify: (data, path, callback) ->
		try 
			optimized = bless.process data, @options
		catch err
			error = "Bless failed on #{path}: #{error}"

		process.nextTick ->
			callback error, (optimized or data)