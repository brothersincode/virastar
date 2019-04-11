(function () {
  var virastar;
  var clipboard;
  var app = {

    settings: undefined,
    storage: typeof (Storage) !== 'undefined',

    input: document.getElementById('textarea'),
    output: document.getElementById('plain'),

    // demo default options
    options: {
      skip_markdown_ordered_lists_numbers_conversion: false,
      preserve_brackets: false,
      preserve_braces: false
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

    renderSettings: function (defaults) {
      var options = this.getStorage(this.options);
      var ul = document.getElementById('options');

      for (var option in defaults) {
        var row = document.createElement('li');
        var checkbox = document.createElement('input');
        var label = document.createElement('label');

        var name = this.toProperCase(option.replace(new RegExp(/_/, 'g'), ' '));

        checkbox.type = 'checkbox';
        checkbox.checked = options.hasOwnProperty(option) ? options[option] : !this.options.hasOwnProperty(option);
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

    getStorage: function (options) {
      if (!this.storage) {
        return options;
      }

      var stored = window.localStorage.getItem('options');
      return stored ? JSON.parse(stored) : options;
    },

    setStorage: function (options) {
      if (this.storage) {
        window.localStorage.setItem('options', JSON.stringify(options));
      }
    },

    getOptions: function () {
      var options = {};

      this.settings.forEach(function (option) {
        options[option.value] = option.checked;
      });

      return options;
    },

    doVirastar: function (options) {
      this.output.innerHTML = virastar.cleanup(this.input.value, options).replace(/\n/g, '</br>');
    },

    init: function () {
      var that = this;
      virastar = new Virastar(this.options);

      this.renderSettings(virastar.defaults);

      this.settings.forEach(function (option) {
        option.addEventListener('change', function () {
          var options = that.getOptions();
          console.log(options);
          that.doVirastar(options);
          that.setStorage(options);
        });
      });

      this.input.addEventListener('keyup', this.debounce(function () {
        that.doVirastar(that.getOptions());
      }, 1000));

      this.doVirastar(that.getOptions());
      this.initClipboard();
    },

    initClipboard: function () {
      clipboard = new ClipboardJS('.copy');

      clipboard.on('success', function (e) {
        console.log(e);
      });

      clipboard.on('error', function (e) {
        console.log(e);
      });
    }
  };

  // window.onload = function () { app.init(); };
  app.init();
})();
