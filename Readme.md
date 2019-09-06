AngularJS Emoji Picker Extended
======================

AngularJS Emoji Picker Extended is a simple AngularJs module which allows you to add emoji images to your model value. This project is a fork of [Angular Emoji Picker](https://github.com/terranisu/angular-emoji-picker), with some improvements.

Installation
------------

### Npm
The simplest way to install Emoji Picker is use [Npm](https://npmjs.com/).

```bash
npm install angular-emoji-picker-extended
```

This will install the latest release.

### Manual
You can also just download the contents of the `dist/` folder and add dependencies manually.

Usage
-----
```javascript
angular.module('myModule', ['vkEmojiPicker']);
```
By default Emoji Picker uses its own popover, which, to be honest, has not a very great realization. But you have an option - you can use
external dependencies: [Angular Strap](https://github.com/mgcrea/angular-strap), [Angular-UI Bootstrap](https://github.com/angular-ui/bootstrap)
and [Bootstrap](https://github.com/twbs/bootstrap). In that case you have to include additional scripts on your page:

### Emoji Picker Directive
Add the `emoji-picker` attribute to an element to drop in the emoji button and picker in your template. Clicking the element will open a popover listing the available emoji for a user to select.

#### Basic Example:
```
<input type="text" ng-model="keyword"/>
<span emoji-picker="keyword" placement="right" title="Emoji"></span>
```

#### Full Example
```
<textarea ng-model="message" ng-change="messageUpdated()">{{message}}</textarea>
<span emoji-picker="message"
      placement="right" 
      title="Emoji"
      recent-limit="10"
      output-format="unicode"
      on-change-func="messageUpdated"></span>
```

#### Options:
* **emoji-picker** - the bound property to which selected emoji should be added

* **placement** (optional) - determines where the popover shows relative to the button element
   
  `top (default), bottom, left, right, right-relative`
* **title** (optional) - the header text shown in the popover window

* **recent-limit** (optional) - the number of recently-selected emoji to show in the popover window

* **output-format** (optional) - the format to add selected emoji
  
  `alias (default), unicode`

* **on-change-func** (optional) - a function to be called when the user selects or removes an emoji


### Angular Strap
```html
<link rel="stylesheet" href="/path/to/bootstrap/dist/css/bootstrap.min.css">
<script src="/path/to/angular-strap/dist/angular-strap.min.js"></script>
<script src="/path/to/angular-strap/dist/angular-strap.tpl.min.js"></script>
```

```javascript
angular.module('myModule', ['vkEmojiPicker', 'mgcrea.ngStrap']);
```

```javascript
angular.module('myModule', ['vkEmojiPicker', 'ui.bootstrap.popover']);
```

Also Emoji Picker provides a couple handy directives:

* `emojify` - converts an emoji string into image

`<div ng-bind-html="message | emojify"></div>`

* `hexify` - converts an emoji string into UTF-8 characters

`<div ng-bind-html="message | hexify"></div>`

### Bugs and feature requests
If you found a bug or have an idea feel free [to open a new issue](https://github.com/newwaybrazil/angular-emoji-picker/issues/new).

Contributing
------------
1. Fork it ( https://github.com/newwaybrazil/angular-emoji-picker/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Create a feature and add tests if required
4. Commit your changes (`git commit -am 'Add some feature'`)
5. Push to the branch (`git push origin my-new-feature`)
6. Create a new Pull Request

Also the eslint and editorconfig need to be configured.

### Building
The files in the `dist/` folder, plus dependencies, are all you need to use Emoji Picker. But if
you'd like to build it yourself, you have to use [grunt](http://gruntjs.com/).

First off, you need to have nodejs installed. Then install all dependencies of the
project with npm, then install grunt and run the default task.

```bash
$ npm install
$ sudo npm install -g grunt-cli
$ grunt
```

The task compiles all source files.

You can also run `grunt watch:dev` to have it rebuild on change.

### Tests
Unit tests are run with [karma](http://karma-runner.github.io) and written using
[mocha](http://mochajs.org/), [chai](http://chaijs.com/) and
[sinon](http://sinonjs.org/)

To run the tests:

1. Install all dependencies via npm
3. Install the karma cli
4. Run the tests using karma or npm

```bash
$ npm install
$ sudo npm install -g karma-cli
$ karma start karma.conf.js OR npm test
```
