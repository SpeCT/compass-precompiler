var spawn = require('child_process').spawn,
    fs = require('fs'),
    path = require('path'),
    os = require('os'),
    async = require('async'),
    utils = require('kanso-utils/utils'),
    attachments = require('kanso-utils/attachments'),
    opts = {
    	'mode': 'compress', // One of: nested, expanded, compact, compressed
    	'comments': false,
    	'relative': true,
    	'css': os.tmpDir()
    }

function compileCompass(doc, project_path, f, compress, settings, callback) {
	/**
	 * we get a rather cryptic error when trying to compile a file that
	 * doesn't exist, so check early for that and report something
	 * sensible
	 */
	fs.exists(f, function (exists) {
		if (!exists)
			return callback(new Error('File does not exist: ' + f))
		console.log('Compiling ' + utils.relpath(f, project_path))

		var args = [
			'compile', utils.relpath(f, project_path),
			opts.comments ? '' : '--no-line-comments',
			opts.relative ? '--relative-assets' : '',
			'-s', opts.mode,
			'--sass-dir', path.dirname(f),
			'--css-dir', opts.css
		]
		for (var p in doc._compass_paths)
			args = args.concat('-I', p)
		var compass = spawn('compass', args, {cwd: project_path})
		compass.stdout.on('data', function(data) {
			console.warn("compass-precompiler ", data.toString().trim())
		})
		compass.on('exit', function(code) {
			if (code)
				return callback(new Error('Compass exit with non zero code: ' + code))
			filename = opts.css + path.basename(f).replace(/\.sass$/, '.css').replace(/\.scss$/, '.css')

			fs.readFile(filename, 'utf-8', callback)
		})
	})
}


module.exports = function (root, _path, settings, doc, callback) {
	//console.warn("compile", root, _path, settings, doc)
	var filenames = Object.keys(doc._compass_compile)
	async.forEachLimit(filenames, 5, function (f, cb) {
		var compress = doc._compass_compile[f].compress || settings.minify
		var att_path = doc._compass_compile[f].att_path
		compileCompass(doc, _path, f, compress, settings, function (err, css) {
			if (err) {
				console.error('Error compiling ' + f)
				return cb(err)
			}
			try {
				attachments.add(doc, att_path, att_path, css)
			}
			catch (e) {
				return cb(e)
			}
			cb()
		})
	},
	function (err) {
		delete doc._compass_paths
		delete doc._compass_compile
		callback(err, doc)
	})
}