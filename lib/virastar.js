/*!
* Virastar - v0.18.0 - 2019-05-11
* https://github.com/brothersincode/virastar
* Licensed: MIT
*/

(function (name, global, definition) {
  if (typeof module !== 'undefined') module.exports = definition();
  else if (typeof define === 'function' && typeof define.amd === 'object') define(definition);
  else if (typeof window !== 'undefined') window[name] = definition();
  else global[name] = definition();
}('Virastar', this, function () {
  function Virastar (text, options) {
    if (!(this instanceof Virastar)) {
      return new Virastar(text, options);
    }

    text = text || {};

    if (typeof text === 'object') {
      this.opts = this.parseOptions(text);
    } else if (typeof text === 'string') {
      this.opts = this.parseOptions(options || {});
      return this.cleanup(text);
    }

    return this;
  }

  Virastar.prototype = {
    defaults: {
      normalize_eol: true,
      decode_htmlentities: true,
      fix_dashes: true,
      fix_three_dots: true,
      normalize_ellipsis: true,
      fix_english_quotes_pairs: true,
      fix_english_quotes: true,
      fix_hamzeh: true,
      cleanup_rlm: true,
      cleanup_zwnj: true,
      fix_spacing_for_braces_and_quotes: true,
      fix_arabic_numbers: true,
      fix_english_numbers: true,
      fix_misc_non_persian_chars: true,
      fix_punctuations: true,
      fix_question_mark: true,
      skip_markdown_ordered_lists_numbers_conversion: true,
      fix_perfix_spacing: true,
      fix_suffix_spacing: true,
      aggresive: true,
      kashidas_as_parenthetic: true,
      cleanup_kashidas: true,
      cleanup_extra_marks: true,
      cleanup_spacing: true,
      cleanup_line_breaks: true,
      cleanup_begin_and_end: true,
      preserve_HTML: true,
      preserve_comments: true,
      preserve_entities: true,
      preserve_URIs: true,
      preserve_nbsps: true,
      preserve_brackets: true,
      preserve_braces: true
    },

    entities: {
      'sbquo;': '\u201A',
      'lsquo;': '\u2018',
      'lsquor;': '\u201A',
      'ldquo;': '\u201C',
      'ldquor;': '\u201E',
      'rdquo;': '\u201D',
      'rdquor;': '\u201D',
      'rsquo;': '\u2019',
      'rsquor;': '\u2019',
      'apos;': '\'',
      'QUOT;': '"',
      'QUOT': '"',
      'quot;': '"',
      'quot': '"',
      'zwj;': '\u200D',
      'ZWNJ;': '\u200C',
      'zwnj;': '\u200C',
      'shy;': '\u00AD' // wrongly used as zwnj
    },

    numbersPersian: '۱۲۳۴۵۶۷۸۹۰',
    numbersArabic: '١٢٣٤٥٦٧٨٩٠',
    numbersEnglish: '1234567890',

    parseOptions: function parseOptions (options) {
      var defaults = this.defaults;

      for (var i in defaults) {
        if (options.hasOwnProperty(i)) {
          defaults[i] = options[i];
        }
      }

      return defaults;
    },

    charBatchReplace: function charBatchReplace (text, chars, Rchars) {
      var charsA = chars.split('');
      var RcharsA = Rchars.split('');
      for (var i in charsA) {
        text = text.replace(new RegExp(charsA[i], 'g'), RcharsA[i]);
      }
      return text;
    },

    cleanup: function cleanup (text, options) {
      if (typeof text !== 'string') {
        throw new TypeError('Expected a String');
      }

      var that = this;
      var opts = options ? that.parseOptions(options) : that.opts;

      // removing HTML tags to bring them back at the end of process
      // @props: @wordpress/wordcount
      if (opts.preserve_HTML) {
        var html = [];
        text = text.replace(/<\/?[a-z][^>]*?>/gi, function (matched) {
          html.push(matched);
          return '__HTML__PRESERVER__';
        });
      }

      // removing HTML comments to bring them back at the end of process
      // @props: @wordpress/wordcount
      if (opts.preserve_comments) {
        var comments = [];
        text = text.replace(/<!--[\s\S]*?-->/g, function (matched) {
          comments.push(matched);
          return '__COMMENT__PRESERVER__';
        });
      }

      // removing URIs to bring them back at the end of process
      if (opts.preserve_URIs) {
        var uris = [];

        // @source: https://github.com/jhermsmeier/uri.regex
        var pattern = new RegExp("([A-Za-z][A-Za-z0-9+\\-.]*):(?:(//)(?:((?:[A-Za-z0-9\\-._~!$&'()*+,;=:]|%[0-9A-Fa-f]{2})*)@)?((?:\\[(?:(?:(?:(?:[0-9A-Fa-f]{1,4}:){6}|::(?:[0-9A-Fa-f]{1,4}:){5}|(?:[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,1}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){3}|(?:(?:[0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){2}|(?:(?:[0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}:|(?:(?:[0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})?::)(?:[0-9A-Fa-f]{1,4}:[0-9A-Fa-f]{1,4}|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))|(?:(?:[0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})?::)|[Vv][0-9A-Fa-f]+\\.[A-Za-z0-9\\-._~!$&'()*+,;=:]+)\\]|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|(?:[A-Za-z0-9\\-._~!$&'()*+,;=]|%[0-9A-Fa-f]{2})*))(?::([0-9]*))?((?:/(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*)|/((?:(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})+(?:/(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*)?)|((?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})+(?:/(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*)|)(?:\\?((?:[A-Za-z0-9\\-._~!$&'()*+,;=:@/?]|%[0-9A-Fa-f]{2})*))?(?:\\#((?:[A-Za-z0-9\\-._~!$&'()*+,;=:@/?]|%[0-9A-Fa-f]{2})*))?", 'g');

        text = text.replace(pattern, function (matched) {
          uris.push(matched);
          return '__URI__PRESERVER__';
        });
      }

      // removing brackets to bring them back at the end of process
      if (opts.preserve_brackets) {
        var brackets = [];
        text = text.replace(/(\[.*?\])/g, function (matched) {
          brackets.push(matched);
          return '__BRACKETS__PRESERVER__';
        });
      }

      // removing braces to bring them back at the end of process
      if (opts.preserve_braces) {
        var braces = [];
        text = text.replace(/(\{.*?\})/g, function (matched) {
          braces.push(matched);
          return '__BRACES__PRESERVER__';
        });
      }

      // removing nbsps to bring them back at the end of process
      if (opts.preserve_nbsps) {
        var nbsps = [];
        text = text.replace(/&nbsp;|&#160;/gi, function (matched) {
          nbsps.push(matched);
          return '__NBSPS__PRESERVER__';
        });
      }

      // converts numeral and some entities into chars
      if (opts.decode_htmlentities) {
        text = that.decodeHTMLEntities(text, opts);
      }

      // removing HTML entities to bring them back at the end of process
      // @props: @substack/node-ent
      if (opts.preserve_entities) {
        var entities = [];
        text = text.replace(/&(#?[^;\W]+;?)/g, function (matched) {
          entities.push(matched);
          return '__ENTITIES__PRESERVER__';
        });
      }

      // Windows EOL conversion to Unix format
      if (opts.normalize_eol) {
        text = text.replace(/(\r?\n)|(\r\n?)/g, '\n');
      }

      // replace double dash to ndash and triple dash to mdash
      if (opts.fix_dashes) {
        text = text.replace(/-{3}/g, '—');
        text = text.replace(/-{2}/g, '–');
      }

      if (opts.fix_three_dots) {
        text = that.fixThreeDots(text, opts);
      }

      if (opts.normalize_ellipsis) {
        text = that.normalizeEllipsis(text, opts);
      }

      // replace English quotes pairs with their Persian equivalent
      if (opts.fix_english_quotes_pairs) {
        text = text.replace(/(“)(.+?)(”)/g, '«$2»');
      }

      // replace English quotes with their Persian equivalent
      if (opts.fix_english_quotes) {
        text = text.replace(/(["'`]+)(.+?)(\1)/g, '«$2»');
      }

      // should convert ه ی to ه
      if (opts.fix_hamzeh) {
        text = text.replace(/(\S)(ه[\s\u200C]+[یي])(\s)/g, '$1\u0647\u0654$3'); // heh + ye
        text = text.replace(/(\S)(ه[\s\u200C]?\u0621)(\s)/g, '$1\u0647\u0654$3'); // heh + standalone hamza
      }

      // converting Right-to-left marks followed by persian characters to zero-width non-joiners (ZWNJ)
      if (opts.cleanup_rlm) {
        text = text.replace(/([^a-zA-Z\-_])(\u200F)/g, '$1\u200c');
        // text = text.replace(/[\u202C\u202D]/g, '\u0020'); // props @zoghal
      }

      if (opts.cleanup_zwnj) {
        text = that.cleanupZWNJ(text, opts);
      }

      if (opts.fix_arabic_numbers) {
        text = that.charBatchReplace(text, that.numbersArabic, that.numbersPersian);
      }

      // word tokenizer
      // text = text.replace(/(^|\s+)([[({"'“«]?)(\S+)([\])}"'”»]?)(?=($|\s+))/g, this.tokenizerCallback);
      text = text.replace(/(^|\s+)([[({"'“«]?)(\S+)([\])}"'”»]?)(?=($|\s+))/g,
        function (matched, before, leadings, word, trailings, after) {
          // should not replace to Persian chars in english phrases
          if (word.match(/[a-zA-Z\-_]{2,}/g)) {
            return matched;
          }

          // should not replace sprintf directives
          // @source: https://stackoverflow.com/a/8915445/
          if (word.match(/%(?:\d+\$)?[+-]?(?:[ 0]|'.{1})?-?\d*(?:\.\d+)?[bcdeEufFgGosxX]/g)) {
            return matched;
          }

          // should not replace to Persian numbers in html entities
          if (word.match(/&#\d+;/g)) {
            return matched;
          }

          // preserve markdown ordered lists numbers
          if (opts.skip_markdown_ordered_lists_numbers_conversion && (matched + trailings + after).match(/(?:(?:\r?\n)|(?:\r\n?)|(?:^|\n))\d+\.\s/)) {
            return matched;
          }

          if (opts.fix_english_numbers) {
            matched = that.charBatchReplace(matched, that.numbersEnglish, that.numbersPersian);
          }

          if (opts.fix_punctuations) {
            matched = that.charBatchReplace(matched, '%,;', '٪،؛');
          }

          // props @ebraminio/persiantools
          if (opts.fix_misc_non_persian_chars) {
            matched = matched
              .replace(/ك/g, 'ک') // Arabic
              .replace(/ي/g, 'ی') // Arabic
              .replace(/ى/g, 'ی') // Urdu
              .replace(/ۍ/g, 'ی') // Pushtu
              .replace(/ې/g, 'ی') // Uyghur
              .replace(/ہ/g, 'ه') // Convert &#x06C1; to &#x0647; ہہہہ to ههه
              .replace(/[ەھ]/g, 'ه'); // Kurdish
          }

          if (opts.fix_question_mark) {
            matched = matched.replace(/(\?)/g, '\u061F'); // \u061F = ؟
          }

          return matched;
        }
      );

      // put zwnj between word and prefix:
      // - mi* nemi* bi*
      // there's a possible bug here: prefixes could be separate nouns
      if (opts.fix_perfix_spacing) {
        text = text.replace(/((\s|^)ن?می)\u0020/g, '$1\u200C');
        text = text.replace(/((\s|^)بی)\u0020/g, '$1\u200C'); // props @zoghal
      }

      // put zwnj between word and suffix:
      // - *am *at *ash *ei *eid *eem *and
      // - *ha *haye
      // - *tar *tari *tarin
      // - *hayee *hayam *hayat *hayash *hayetan *hayeman *hayeshan
      // there's a possible bug here: suffixs could be separate nouns
      if (opts.fix_suffix_spacing) {
        text = text.replace(/\u0020((ام|ات|اش|ای|اید|ایم|اند)\s)/g, '\u200C$1'); // props @zoghal

        // text = text.replace(/\u0020(تر(ی(ن)?)?|ها(ی)?\s)/g, '\u200C$1'); // in case you can not read it: \s+(tar(i(n)?)?|ha(ye)?)\s+
        text = text.replace(/\u0020(ها(ی)?\s)/g, '\u200C$1');
        text = text.replace(/\u0020(تر((ی)|(ین))?\s)/g, '\u200C$1');

        text = text.replace(/\u0020((هایی|هایم|هایت|هایش|هایمان|هایتان|هایشان)\s)/g, '\u200C$1'); // props @zoghal
      }

      if (opts.aggresive) {
        // replace more than one ! or ? mark with just one
        if (opts.cleanup_extra_marks) {
          text = text.replace(/(!){2,}/g, '$1');
          text = text.replace(/(\u061F){2,}/g, '$1'); // \u061F = ؟
        }

        // replace kashidas to ndash in parenthetic
        if (opts.kashidas_as_parenthetic) {
          text = text.replace(/(\s)\u0640+/g, '$1–');
          text = text.replace(/\u0640+(\s)/g, '–$1');
        }

        // should remove all kashida between non-whitespace characters
        if (opts.cleanup_kashidas) {
          // strange that we have to do this twice!
          text = text.replace(/(\S)\u0640+(\S)/g, '$1$2');
          text = text.replace(/(\S)\u0640+(\S)/g, '$1$2');
        }
      }

      if (opts.fix_spacing_for_braces_and_quotes) {
        // should fix outside and inside spacing for () [] {}  “” «»
        text = text.replace(/[ \t\u200C]*(\()\s*([^)]+?)\s*?(\))[ \t\u200C]*/g, ' $1$2$3 ');
        text = text.replace(/[ \t\u200C]*(\[)\s*([^\]]+?)\s*?(\])[ \t\u200C]*/g, ' $1$2$3 ');
        text = text.replace(/[ \t\u200C]*(\{)\s*([^}]+?)\s*?(\})[ \t\u200C]*/g, ' $1$2$3 ');
        text = text.replace(/[ \t\u200C]*(“)\s*([^”]+?)\s*?(”)[ \t\u200C]*/g, ' $1$2$3 ');
        text = text.replace(/[ \t\u200C]*(«)\s*([^»]+?)\s*?(»)[ \t\u200C]*/g, ' $1$2$3 ');

        // : ; , . ! ? and their persian equivalents should have one space after and no space before
        text = text.replace(/[ \t\u200C]*([:;,؛،.؟!]{1})[ \t\u200C]*/g, '$1 ');

        // do not put space after colon that separates time parts
        text = text.replace(/([0-9۰-۹]+):\s+([0-9۰-۹]+)/g, '$1:$2');

        // do not put space after dots in numbers
        text = text.replace(/([0-9۰-۹]+). ([0-9۰-۹]+)/g, '$1.$2');

        // should not put space between Persian question mark and exclamation mark
        text = text.replace(/(\u061F|!)\s(\u061F|!)/g, '$1$2'); // \u061F = ؟

        // should fix inside spacing for () [] {}  “” «»
        text = text.replace(/(\()\s*([^)]+?)\s*?(\))/g, '$1$2$3');
        text = text.replace(/(\[)\s*([^\]]+?)\s*?(\])/g, '$1$2$3');
        text = text.replace(/(\{)\s*([^}]+?)\s*?(\})/g, '$1$2$3');
        text = text.replace(/(“)\s*([^”]+?)\s*?(”)/g, '$1$2$3');
        text = text.replace(/(«)\s*([^»]+?)\s*?(»)/g, '$1$2$3');
      }

      // should replace more than one space with just a single one
      if (opts.cleanup_spacing) {
        text = text.replace(/[ ]+/g, ' ');

        // clean spaces before diacritic characters
        // @REF: https://en.wikipedia.org/wiki/Persian_alphabet#Diacritics
        text = text.replace(/(.)\u0020+([\u064e\u0650\u064f\u064b\u064d\u064C\u0651\u06C0])/g, '$1$2');

        text = text.replace(/([\n]+)[ \t\u200C]*/g, '$1');
      }

      if (opts.cleanup_line_breaks) {
        // clean more than two contiguous line breaks
        text = text.replace(/(\n{2,})/g, '\n\n');
      }

      // remove spaces, tabs, zwnj, direction marks and new lines from the beginning and end of text
      // http://stackoverflow.com/a/38490203
      if (opts.cleanup_begin_and_end) {
        text = text.replace(/^[\s\u200c\u200e\u200f]+|[\s\u200c\u200e\u200f]+$/g, '');
      }

      // bringing back entities
      if (opts.preserve_entities) {
        text = text.replace(/__ENTITIES__PRESERVER__/g, function () {
          return entities.shift();
        });
      }

      // bringing back nbsps
      if (opts.preserve_nbsps) {
        text = text.replace(/__NBSPS__PRESERVER__/g, function () {
          return nbsps.shift();
        });
      }

      // bringing back braces
      if (opts.preserve_braces) {
        text = text.replace(/__BRACES__PRESERVER__/g, function () {
          return braces.shift();
        });
      }

      // bringing back brackets
      if (opts.preserve_brackets) {
        text = text.replace(/__BRACKETS__PRESERVER__/g, function () {
          return brackets.shift();
        });
      }

      // bringing back URIs
      if (opts.preserve_URIs) {
        text = text.replace(/__URI__PRESERVER__/g, function () {
          return uris.shift();
        });
      }

      // bringing back HTML comments
      if (opts.preserve_comments) {
        text = text.replace(/__COMMENT__PRESERVER__/g, function () {
          return comments.shift();
        });
      }

      // bringing back HTML tags
      if (opts.preserve_HTML) {
        text = text.replace(/__HTML__PRESERVER__/g, function () {
          return html.shift();
        });
      }

      return text;
    },

    cleanupZWNJ: function cleanupZWNJ (text, options) {
      // convert all soft hyphens (&shy;) into zwnj
      text = text.replace(/\u00ad/g, '\u200c');

      // remove more than one zwnj
      text = text.replace(/\u200C{2,}/g, '\u200c');

      // clean zwnj after characters that don't conncet to the next letter
      // text = text.replace(/([۰-۹0-9إأةؤورزژاآدذ،؛,\:«»\\\/@#$٪×\*\(\)ـ\-=\|])\u200c/g, '$1');
      text = text.replace(/([۰-۹0-9إأةؤورزژاآدذ،؛,:«»\\/@#$٪×*()ـ\-=|])\u200c/g, '$1');

      // clean zwnj before diacritic characters
      // @REF: https://en.wikipedia.org/wiki/Persian_alphabet#Diacritics
      text = text.replace(/\u200c([\u064e\u0650\u064f\u064b\u064d\u064C\u0651\u06C0])/g, '$1');

      // clean zwnj before English characters
      text = text.replace(/\u200c([\w])/g, '$1');
      text = text.replace(/([\w])\u200c/g, '$1');

      // clean zwnj after and before punctuation
      // text = text.replace(/\u200c([\n\s\[\]\.،«»\:\(\)\؛\؟\?\;\$\!\@\-\=\+\\])/g, '$1');
      text = text.replace(/\u200c([\n\s[].،«»:()؛؟?;$!@-=+\\])/g, '$1');
      // text = text.replace(/([\n\s\[\.،«»\:\(\)\؛\؟\?\;\$\!\@\-\=\+\\])\u200c/g, '$1');
      text = text.replace(/([\n\s[.،«»:()؛؟?;$!@\-=+\\])\u200c/g, '$1');

      // remove unnecessary zwnj char that are succeeded/preceded by a space
      text = text.replace(/\s+\u200C|\u200C\s+/g, ' ');

      return text;
    },

    // Converts HTML characterSets into original characters
    // @props: @substack/node-ent
    decodeHTMLEntities: function decodeHTMLEntities (text, options) {
      var that = this;
      return text.replace(/&(#?[^;\W]+;?)/g, function (matched, match) {
        var n;
        if ((n = /^#(\d+);?$/.exec(match))) {
          return String.fromCharCode(parseInt(n[1], 10));
        } else if ((n = /^#[Xx]([A-Fa-f0-9]+);?/.exec(match))) {
          return String.fromCharCode(parseInt(n[1], 16));
        } else {
          var hasSemi = /;$/.test(match);
          var withoutSemi = hasSemi ? match.replace(/;$/, '') : match;
          var target = that.entities[withoutSemi] || (hasSemi && that.entities[match]);

          if (typeof target === 'number') {
            return String.fromCharCode(target);
          } else if (typeof target === 'string') {
            return target;
          } else {
            return '&' + match;
          }
        }
      });
    },

    // replace three dots with ellipsis
    fixThreeDots: function fixThreeDots (text, options) {
      return text.replace(/\s*\.{3,}/g, '…');
    },

    // replace more than one ellipsis with one
    normalizeEllipsis: function normalizeEllipsis (text, options) {
      return text.replace(/(…){2,}/g, '…');
    },

    flipPunctuations: function flipPunctuations (text, options) {
      var end = ['-'];
      var start = ['!', '.', '،', '…', '"'];
      var before = [];
      var after = [];

      text = this.fixThreeDots(text, options);

      for (var iStart = 0; iStart < start.length; iStart++) {
        var sElement = start[iStart];
        var sReg = new RegExp('^\\' + sElement, 'i');
        if (sReg.test(text)) {
          text = text.replace(sReg, '').trim();
          after.push(sElement);
        }
      }

      for (var iEnd = 0; iEnd < end.length; iEnd++) {
        var eElement = end[iEnd];
        var eReg = new RegExp('\\' + eElement + '$', 'i');
        if (eReg.test(text)) {
          text = text.replace(eReg, '').trim();
          before.push(eElement);
        }
      }

      for (var iBefore = 0; iBefore < before.length; iBefore++) {
        text = before[iBefore] + ' ' + text;
      }

      for (var iAfter = 0; iAfter < after.length; iAfter++) {
        text += after[iAfter];
      }

      text = this.normalizeEllipsis(text, options);

      return text;
    },

    // swap incorrect quotes pairs `»«` to `«»` and `”“` to `“”`
    swapQuotes: function swapQuotes (text, options) {
      text = text.replace(/(»)(.+?)(«)/g, '«$2»');
      text = text.replace(/(”)(.+?)(“)/g, '“$2”');

      return text;
    }
  };

  return Virastar;
}));
