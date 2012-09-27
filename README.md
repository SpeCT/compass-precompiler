# compass-precompiler

The compass-precompiler allows you to author your stylesheets with the CSS superset of
[SASS or SCSS](http://compass-style.org/). It supports nested rules, variables, mixins, selector inheritance, and and lots of other really useful stuff. The compass files will get compiled and \_attached to your couchapp on every build and can even be compressed.

The worst thing is that it requres ruby to be installed. The best – is that it much more powerfull and agile than less.


### Install

[Install Compass](http://compass-style.org/install/)

```bash
sudo gem install sass
```

Add `compass-precompiler` to your dependencies section in `kanso.json`.

```javascript
  ...
  "dependencies": {
    "compass-precompiler": null,
    ...
  }
```

> run `kanso install` to fetch the package


### Configure

To tell the precompiler which files to transform, add the section `compass`,
and in a key called `compile`, list the files you want to process.

```javascript
  ...
  "compass": {
    "compile": [ "css/style.sass", ... ]
  }
  ...
  "dependencies": {
    "compass-precompiler": null,
    ...
  }

```

> Running `kanso push` will compile the file `css/style.sass` to
`css/style.css` and upload it to `_attachments/css/style.css`.


### Compression

To enable compression of the output, add the `compress` flag and set it to `true`.

```javascript
  ...
  "compass": {
    "compile": [ ... ],
    "compress": true
  }
```

The output will additionally be compressed if you kanso push with the --minify flag, eg

```
kanso push app --minify
```


### Import paths

Compass files can import other compass templates, sometimes it's useful for a
package to provide uncompiled .sass/.scss files for use in a project. Before you
can import them in the project's templates, the package providing the
files needs to add the compass path. This is so the compiler knows where to
lookup the file when you `@import` it.

```javascript
  ...
  "compass": {
    "paths": ["./bootstrap"]
  }
```


### Removing original compass files

You can also remove any compass files from attachments (if you placed them inside a
directory also added as static files), by adding the `remove_from_attachments`
property. This will remove all attachment with a `.sass` or `.scss` extension!

```javascript
  ...
  "compass": {
    "compile": [ ... ],
    "remove_from_attachments": true
  }
```


### Inspired by

* https://github.com/nathggns/node-compass
* https://github.com/kanso/less-precompiler


### License

The MIT License

Copyright (c) 2011 Yury Proshchenko (spect.man@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
