import '../sass/styles.scss';

const Virastar = require('virastar');
const ClipboardJS = require('clipboard');
const Diff = require('diff');
const tingle = require('tingle.js');
const syncscroll = require('sync-scroll');

(function (w) {
  var virastar;
  var clipboard;
  var modal;
  var app = {

    settings: undefined,
    storage: typeof (Storage) !== 'undefined',

    input: document.getElementById('input'),
    output: document.getElementById('output'),
    download: document.getElementById('download'),
    reset: document.getElementById('settings-reset'),
    modal: document.getElementById('modal-diff'),

    // demo default options
    options: {
      // skip_markdown_ordered_lists_numbers_conversion: false,
      // preserve_brackets: false,
      // preserve_braces: false
    },

    // @REF: https://remysharp.com/2010/07/21/throttling-function-calls
    debounce: function (fn, delay) {
      var timer = null;
      return function () {
        var context = this;
        var args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
          fn.apply(context, args);
        }, delay);
      };
    },

    // @REF: https://stackoverflow.com/a/5574446
    toProperCase: function (txt) {
      return txt.replace(/\w\S*/g, function (str) {
        return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
      });
    },

    // @REF: http://codepen.io/geminorum/pen/Ndzdqw
    downloadText: function (filename, text) {
      var element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
      element.setAttribute('download', filename);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    },

    renderSettings: function (defaults) {
      var options = this.getStorage(this.options, 'options');
      var ul = document.getElementById('options');
      ul.innerHTML = ''; // list must be empty!

      for (var option in defaults) {
        var row = document.createElement('li');
        var checkbox = document.createElement('input');
        var label = document.createElement('label');

        var name = this.toProperCase(option.replace(new RegExp(/_/, 'g'), ' '));

        checkbox.type = 'checkbox';
        checkbox.checked = options.hasOwnProperty(option) ? options[option] : defaults[option]; // eslint-disable-line no-prototype-builtins
        checkbox.name = 'opt[]';
        checkbox.value = option;
        checkbox.id = option;
        checkbox.setAttribute('class', 'option');

        label.htmlFor = option;
        label.appendChild(document.createTextNode(name));

        row.appendChild(checkbox);
        row.appendChild(label);

        ul.appendChild(row);
      }

      this.settings = document.querySelectorAll('.option');
    },

    getStorage: function (def, key) {
      if (!this.storage) {
        return def;
      }

      var stored = w.localStorage.getItem(key);
      return stored ? JSON.parse(stored) : def;
    },

    setStorage: function (data, key) {
      if (this.storage) {
        w.localStorage.setItem(key, JSON.stringify(data));
      }
    },

    removeStorage: function (key) {
      if (this.storage) {
        w.localStorage.removeItem(key);
      }
    },

    getOptions: function () {
      var options = {};

      this.settings.forEach(function (option) {
        options[option.value] = option.checked;
      });

      return options;
    },

    doVirastar: function (input, options) {
      this.output.innerHTML = virastar.cleanup(input, options);
    },

    doChange: function () {
      var input = this.input.value;
      var options = this.getOptions();
      this.doVirastar(input, options);
      this.setStorage(options, 'options');
      this.setStorage(input, 'text');
      syncscroll.reset();
    },

    doDownload: function () {
      var input = this.input.value;
      var options = this.getOptions();
      this.downloadText('virastar.txt', virastar.cleanup(input, options));
    },

    renderDiff: function () {
      // @REF: https://github.com/kpdecker/jsdiff
      var diff = Diff.diffChars(this.input.value, this.output.value, { ignoreWhitespace: false });
      var fragment = document.createDocumentFragment();
      var pre = document.createElement('pre');
      var newLine = new RegExp(/[^\n]/, 'g');
      var span = null;
      var status = '';

      diff.forEach(function (part) {
        span = document.createElement('span');

        status = part.added ? '-added' : part.removed ? '-removed' : '-none';
        span.classList.add(status);

        // skip if new-lines removed
        if (part.removed) {
          if (!newLine.test(part.value)) {
            return;
          }

          part.value = part.value.replace(/\n/g, '');
        }

        // zwnj
        if (part.value === '‌') {
          span.classList.add('-zwnj');
          part.value = '⋅';
        } else {
          // extra zwnj for better visibility
          // part.value = part.value + '‌';
        }

        span.appendChild(document.createTextNode(part.value));
        fragment.appendChild(span);
      });

      pre.appendChild(fragment);
      return pre;
    },

    init: function () {
      var that = this;
      virastar = new Virastar(this.options);

      this.input.addEventListener('keyup', this.debounce(function () {
        that.doChange();
      }, 1000));

      this.download.addEventListener('click', function (event) {
        event.preventDefault();
        that.doDownload();
      });

      this.reset.addEventListener('click', function (event) {
        event.preventDefault();
        that.removeStorage('options');
        that.initSettings();
        that.doChange();
      });

      this.initSettings();
      this.initVirastar();
      this.initClipboard();
      this.initModal();
      syncscroll.reset();
    },

    initSettings: function () {
      var that = this;
      this.renderSettings(virastar.defaults);

      this.settings.forEach(function (option) {
        option.addEventListener('change', function () {
          that.doChange();
        });
      });
    },

    initVirastar: function () {
      var initial = this.input.value;
      var input = this.getStorage(initial, 'text');
      var options = this.getOptions();

      if (input.trim()) {
        this.input.value = input;
        this.doVirastar(input, options);
      } else {
        this.doVirastar(initial, options);
      }
    },

    initClipboard: function () {
      clipboard = new ClipboardJS('.copy');

      // clipboard.on('success', function (e) {
      //   console.log(e);
      // });

      clipboard.on('error', function (e) {
        console.log(e);
      });
    },

    initModal: function () {
      var that = this;

      // @REF: https://github.com/robinparisi/tingle
      modal = new tingle.modal({ // eslint-disable-line new-cap
        closeLabel: 'بستن',
        cssClass: ['wrapper-diff'],
        beforeOpen: function () {
          modal.setContent('بارگیری&hellip;');
        },
        onOpen: function () {
          modal.setContent(that.renderDiff());
        }
      });

      this.modal.addEventListener('click', function (event) {
        event.preventDefault();
        modal.open();
      });
    }
  };

  w.onload = function () {
    app.init();
  };
})(window);
