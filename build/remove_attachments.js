module.exports = {
	after: 'attachments',
	run: function (root, path, settings, doc, callback) {
		if (doc._attachments && settings.compass && settings.compass.remove_from_attachments)
			for (var k in doc._attachments)
				if (/\.sass$|\.scss$/.test(k))
					delete doc._attachments[k]
		callback(null, doc)
	}
}
