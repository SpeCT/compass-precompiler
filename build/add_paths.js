var path = require('path')

/**
 * Queue up paths and compile targets for use by the postprocessor
 */
module.exports = function (root, _path, settings, doc, callback) {
	if (!doc._compass_paths)   doc._compass_paths = {}
	if (!doc._compass_compile) doc._compass_compile = {}
	if (!settings.compass)
		return callback(null, doc)
	if (settings.compass.paths)
		settings.compass.paths.forEach(function (p) {
			doc._compass_paths[path.resolve(_path, p)] = null
		})
	if (settings.compass.compile) {
		var compile = settings.compass.compile
		if (!Array.isArray(compile)) {
			compile = [compile]
		}
		compile.forEach(function (c) {
			var filename = path.resolve(_path, c)
			var att = filename.replace(/\.sass$/, '.css').replace(/\.scss$/, '.css')
			doc._compass_compile[filename] = {
				filename: filename,
				compress: settings.compass.compress,
				att_path: path.relative(_path, att)
			}
		})
	}
	callback(null, doc)
}
