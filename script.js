(function () {
  var virastar;
  var clipboard;
  var app = {

    settings: undefined,
    storage: typeof (Storage) !== 'undefined',

    input: document.getElementById('input'),
    output: document.getElementById('output'),
    download: document.getElementById('download'),

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

    getStorage: function (def, key) {
      if (!this.storage) {
        return def;
      }

      var stored = window.localStorage.getItem(key);
      return stored ? JSON.parse(stored) : def;
    },

    setStorage: function (data, key) {
      if (this.storage) {
        window.localStorage.setItem(key, JSON.stringify(data));
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

    init: function () {
      var that = this;
      virastar = new Virastar(this.options);

      this.renderSettings(virastar.defaults);

      this.settings.forEach(function (option) {
        option.addEventListener('change', function () {
          that.doChange();
        });
      });

      this.input.addEventListener('keyup', this.debounce(function () {
        that.doChange();
      }, 1000));

      this.download.addEventListener('click', function () {
        that.doDownload();
      });

      this.initVirastar();
      this.initClipboard();
      syncscroll.reset();
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

      clipboard.on('success', function (e) {
        console.log(e);
      });

      clipboard.on('error', function (e) {
        console.log(e);
      });
    }
  };

  window.onload = function () {
    app.init();
  };
})();
