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
      aggresive: true,
      cleanup_begin_and_end: true,
      cleanup_extra_marks: true,
      cleanup_kashidas: true,
      cleanup_line_breaks: true,
      cleanup_rlm: true,
      cleanup_spacing: true,
      cleanup_zwnj: true,
      decode_htmlentities: true,
      fix_arabic_numbers: true,
      fix_dashes: true,
      fix_english_numbers: true,
      fix_english_quotes_pairs: true,
      fix_english_quotes: true,
      fix_hamzeh: true,
      fix_misc_non_persian_chars: true,
      fix_numeral_symbols: true,
      fix_perfix_spacing: true,
      fix_persian_glyphs: true,
      fix_punctuations: true,
      fix_question_mark: true,
      fix_spacing_for_braces_and_quotes: true,
      fix_suffix_misc: true,
      fix_suffix_spacing: true,
      fix_three_dots: true,
      kashidas_as_parenthetic: true,
      normalize_ellipsis: true,
      normalize_eol: true,
      preserve_braces: false,
      preserve_brackets: false,
      preserve_comments: true,
      preserve_entities: true,
      preserve_HTML: true,
      preserve_nbsps: true,
      preserve_URIs: true,
      skip_markdown_ordered_lists_numbers_conversion: false
    },

    digits: '۱۲۳۴۵۶۷۸۹۰',

    /* eslint-disable */
    entities: {
      'sbquo;': '\u201a',
      'lsquo;': '\u2018',
      'lsquor;': '\u201a',
      'ldquo;': '\u201c',
      'ldquor;': '\u201e',
      'rdquo;': '\u201d',
      'rdquor;': '\u201d',
      'rsquo;': '\u2019',
      'rsquor;': '\u2019',
      'apos;': '\'',
      'QUOT;': '"',
      'QUOT': '"',
      'quot;': '"',
      'quot': '"',
      'zwj;': '\u200d',
      'ZWNJ;': '\u200c',
      'zwnj;': '\u200c',
      'shy;': '\u00ad' // wrongly used as zwnj
    },

    // props @ebraminio/persiantools
    glyphs: {
      // these two are for visually available ZWNJ #visualZwnj
      '\u200cه': 'ﻫ',
      'ی\u200c': 'ﻰﻲ',
      'ﺃ': 'ﺄﺃ',
      'ﺁ': 'ﺁﺂ',
      'ﺇ': 'ﺇﺈ',
      'ا': 'ﺎا',
      'ب': 'ﺏﺐﺑﺒ',
      'پ': 'ﭖﭗﭘﭙ',
      'ت': 'ﺕﺖﺗﺘ',
      'ث': 'ﺙﺚﺛﺜ',
      'ج': 'ﺝﺞﺟﺠ',
      'چ': 'ﭺﭻﭼﭽ',
      'ح': 'ﺡﺢﺣﺤ',
      'خ': 'ﺥﺦﺧﺨ',
      'د': 'ﺩﺪ',
      'ذ': 'ﺫﺬ',
      'ر': 'ﺭﺮ',
      'ز': 'ﺯﺰ',
      'ژ': 'ﮊﮋ',
      'س': 'ﺱﺲﺳﺴ',
      'ش': 'ﺵﺶﺷﺸ',
      'ص': 'ﺹﺺﺻﺼ',
      'ض': 'ﺽﺾﺿﻀ',
      'ط': 'ﻁﻂﻃﻄ',
      'ظ': 'ﻅﻆﻇﻈ',
      'ع': 'ﻉﻊﻋﻌ',
      'غ': 'ﻍﻎﻏﻐ',
      'ف': 'ﻑﻒﻓﻔ',
      'ق': 'ﻕﻖﻗﻘ',
      'ک': 'ﮎﮏﮐﮑﻙﻚﻛﻜ',
      'گ': 'ﮒﮓﮔﮕ',
      'ل': 'ﻝﻞﻟﻠ',
      'م': 'ﻡﻢﻣﻤ',
      'ن': 'ﻥﻦﻧﻨ',
      'ه': 'ﻩﻪﻫﻬ',
      'هٔ': 'ﮤﮥ',
      'و': 'ﻭﻮ',
      'ﺅ': 'ﺅﺆ',
      'ی': 'ﯼﯽﯾﯿﻯﻰﻱﻲﻳﻴ',
      'ئ': 'ﺉﺊﺋﺌ',
      'لا': 'ﻼ',
      'ﻹ': 'ﻺ',
      'ﻷ': 'ﻸ',
      'ﻵ': 'ﻶ'
    },
    /* eslint-enable */

    parseOptions: function parseOptions (options) {
      // @ref: https://scotch.io/bar-talk/copying-objects-in-javascript
      var defaults = Object.assign({}, this.defaults);

      for (var i in defaults) {
        if (options.hasOwnProperty(i)) { // eslint-disable-line no-prototype-builtins
          defaults[i] = options[i];
        }
      }

      return defaults;
    },

    charReplace: function charReplace (text, fromBatch, toBatch) {
      var fromChars = fromBatch.split('');
      var toChars = toBatch.split('');
      for (var i in fromChars) {
        text = text.replace(new RegExp(fromChars[i], 'g'), toChars[i]);
      }
      return text;
    },

    arrReplace: function arrReplace (text, array) {
      for (var i in array) {
        if (array.hasOwnProperty(i)) { // eslint-disable-line no-prototype-builtins
          text = text.replace(new RegExp('[' + array[i] + ']', 'g'), i);
        }
      }
      return text;
    },

    cleanup: function cleanup (text, options) {
      if (typeof text !== 'string') {
        throw new TypeError('Expected a String');
      }

      // dont bother if its empty or whitespace
      if (!text.trim()) {
        return text;
      }

      var that = this;
      var opts = options ? that.parseOptions(options) : that.opts;

      // single space padding on the end of string
      text = text + ' ';

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

      // removing URIs to bring them back at the end of process
      if (opts.preserve_URIs) {
        var mdlinks = [];
        // stores markdown links separetly to help space cleanup working
        // @REF: https://stackoverflow.com/a/56793445
        text = text.replace(/\[(.*?)\]\((.*?)\)/g, function (matched, title, link) {
          mdlinks.push(link.trim());
          return '[' + title + '](__MD_LINK__PRESERVER__)';
        });

        var uris = [];
        // @REF: https://stackoverflow.com/a/17773849
        text = text.replace(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/g, function (matched) {
          uris.push(matched);
          return '__URI__PRESERVER__';
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

      if (opts.normalize_eol) {
        text = that.normalizeEOL(text, opts);
      }

      if (opts.fix_dashes) {
        text = that.fixDashes(text, opts);
      }

      if (opts.fix_three_dots) {
        text = that.fixThreeDots(text, opts);
      }

      if (opts.normalize_ellipsis) {
        text = that.normalizeEllipsis(text, opts);
      }

      if (opts.fix_english_quotes_pairs) {
        text = that.fixEnglishQuotesPairs(text, opts);
      }

      if (opts.fix_english_quotes) {
        text = that.fixEnglishQuotes(text, opts);
      }

      if (opts.fix_hamzeh) {
        text = that.fixHamzeh(text, opts);
      } else if (opts.fix_suffix_spacing) {
        text = that.fixSuffixSpacingHamzeh(text, opts);
      }

      if (opts.cleanup_rlm) {
        text = that.cleanupRLM(text, opts);
      }

      if (opts.cleanup_zwnj) {
        text = that.cleanupZWNJ(text, opts);
      }

      if (opts.fix_arabic_numbers) {
        text = that.fixArabicNumbers(text, opts);
      }

      // word tokenizer
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
            matched = that.fixEnglishNumbers(matched, opts);
          }

          if (opts.fix_numeral_symbols) {
            matched = that.fixNumeralSymbols(matched, opts);
          }

          if (opts.fix_punctuations) {
            matched = that.fixPunctuations(matched, opts);
          }

          if (opts.fix_persian_glyphs) {
            matched = that.fixPersianGlyphs(matched, opts);
          }

          if (opts.fix_misc_non_persian_chars) {
            matched = that.fixMiscNonPersianChars(matched, opts);
          }

          if (opts.fix_question_mark) {
            matched = that.fixQuestionMark(matched, opts);
          }

          return matched;
        }
      );

      if (opts.fix_perfix_spacing) {
        text = that.fixPerfixSpacing(text, opts);
      }

      if (opts.fix_suffix_spacing) {
        text = that.fixSuffixSpacing(text, opts);
      }

      if (opts.fix_suffix_misc) {
        text = that.fixSuffixMisc(text, opts);
      }

      if (opts.aggresive) {
        if (opts.cleanup_extra_marks) {
          text = that.cleanupExtraMarks(text, opts);
        }

        if (opts.kashidas_as_parenthetic) {
          text = that.kashidasAsParenthetic(text, opts);
        }

        if (opts.cleanup_kashidas) {
          text = that.cleanupKashidas(text, opts);
        }
      }

      if (opts.fix_spacing_for_braces_and_quotes) {
        text = that.fixSpacingForBracesAndQuotes(text, opts);
      }

      if (opts.cleanup_spacing) {
        text = that.cleanupSpacing(text, opts);
      }

      if (opts.cleanup_line_breaks) {
        text = that.cleanupLineBreaks(text, opts);
      }

      if (opts.cleanup_begin_and_end) {
        text = that.cleanupBeginAndEnd(text, opts);
      } else {
        // removes single space padding from the end of string
        text = text.replace(/[ ]$/g, '');
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

      // bringing back URIs
      if (opts.preserve_URIs) {
        text = text.replace(/__MD_LINK__PRESERVER__/g, function () {
          return mdlinks.shift();
        });

        text = text.replace(/__URI__PRESERVER__/g, function () {
          return uris.shift();
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

    // props @ebraminio/persiantools
    cleanupZWNJ: function cleanupZWNJ (text, options) {
      // convert all soft hyphens (&shy;) into zwnj
      text = text.replace(/\u00ad/g, '\u200c');

      // remove more than one zwnj
      text = text.replace(/\u200c{2,}/g, '\u200c');

      // clean zwnj after characters that don't conncet to the next letter
      text = text.replace(/([۰-۹0-9إأةؤورزژاآدذ،؛,:«»\\/@#$٪×*()ـ\-=|])\u200c/g, '$1');

      // clean zwnj before diacritic characters
      // @REF: https://en.wikipedia.org/wiki/Persian_alphabet#Diacritics
      text = text.replace(/\u200c([\u064e\u0650\u064f\u064b\u064d\u064c\u0651\u06c0])/g, '$1');

      // clean zwnj before English characters
      text = text.replace(/\u200c([\w])/g, '$1');
      text = text.replace(/([\w])\u200c/g, '$1');

      // clean zwnj after and before punctuation
      text = text.replace(/\u200c([\n\s[].،«»:()؛؟?;$!@-=+\\])/g, '$1');
      text = text.replace(/([\n\s[.،«»:()؛؟?;$!@\-=+\\])\u200c/g, '$1');

      // remove unnecessary zwnj char that are succeeded/preceded by a space
      text = text.replace(/(\s+)\u200c/g, '$1');
      text = text.replace(/\u200c(\s+)/g, '$1');

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

    // Windows EOL conversion to Unix format
    normalizeEOL: function normalizeEOL (text, options) {
      return text.replace(/(\r?\n)|(\r\n?)/g, '\n');
    },

    fixDashes: function fixDashes (text, options) {
      return text
        // replaces triple dash to mdash
        .replace(/-{3}/g, '—')
        // replaces double dash to ndash
        .replace(/-{2}/g, '–');
    },

    // replace three dots with ellipsis
    fixThreeDots: function fixThreeDots (text, options) {
      return text.replace(/\s*\.{3,}/g, '…');
    },

    // replace more than one ellipsis with one
    normalizeEllipsis: function normalizeEllipsis (text, options) {
      return text.replace(/(…){2,}/g, '…');
    },

    // replace English quotes pairs with their Persian equivalent
    fixEnglishQuotesPairs: function fixEnglishQuotesPairs (text, options) {
      return text.replace(/(“)(.+?)(”)/g, '«$2»');
    },

    // replace English quotes with their Persian equivalent
    fixEnglishQuotes: function fixEnglishQuotes (text, options) {
      return text.replace(/(["'`]+)(.+?)(\1)/g, '«$2»');
    },

    // replace ه ی to ه
    fixHamzeh: function fixHamzeh (text, options) {
      return text
        .replace(/(\S)(ه[\s\u200c]+[یي])([\s\u200c])/g, '$1\u0647\u0654$3') // heh + ye
        .replace(/(\S)(ه[\s\u200c]?\u0621)([\s\u200c])/g, '$1\u0647\u0654$3'); // heh + standalone hamza
    },

    // converting Right-to-left marks followed by persian characters to
    // zero-width non-joiners (ZWNJ)
    cleanupRLM: function cleanupRLM (text, options) {
      text = text.replace(/([^a-zA-Z\-_])(\u200F)/g, '$1\u200c');
      // text = text.replace(/[\u202C\u202D]/g, ' '); // props @zoghal

      return text;
    },

    fixPersianGlyphs: function fixPersianGlyphs (text, options) {
      return this.arrReplace(text, this.glyphs);
    },

    // props @ebraminio/persiantools
    fixMiscNonPersianChars: function fixMiscNonPersianChars (text, options) {
      return this.charReplace(text, 'كيىۍېہە', 'کییییههه');
      // return text
      //   .replace(/ك/g, 'ک') // Arabic
      //   .replace(/ي/g, 'ی') // Arabic
      //   .replace(/ى/g, 'ی') // Urdu
      //   .replace(/ۍ/g, 'ی') // Pushtu
      //   .replace(/ې/g, 'ی') // Uyghur
      //   .replace(/ہ/g, 'ه') // Convert &#x06C1; to &#x0647; ہہہہ to ههه
      //   .replace(/[ەھ]/g, 'ه'); // Kurdish
    },

    fixEnglishNumbers: function fixEnglishNumbers (text, options) {
      return this.charReplace(text, '1234567890', this.digits);
    },

    fixArabicNumbers: function fixArabicNumbers (text, options) {
      return this.charReplace(text, '١٢٣٤٥٦٧٨٩٠', this.digits);
    },

    fixNumeralSymbols: function fixNumeralSymbols (text, options) {
      return text
        // arabic percent sign: U+066A
        // props @ebraminio/persiantools
        .replace(new RegExp('([' + this.digits + ']) ?%', 'g'), '$1٪')
        // arabic decimal separator: U+066B
        // props @ebraminio/persiantools
        .replace(new RegExp('([' + this.digits + '])\\.(?=[' + this.digits + '])', 'g'), '$1٫');
    },

    fixPunctuations: function fixPunctuations (text, options) {
      return this.charReplace(text, ',;', '،؛');
    },

    fixQuestionMark: function fixQuestionMark (text, options) {
      return text.replace(/(\?)/g, '\u061F'); // \u061F = ؟
    },

    // put zwnj between word and prefix:
    // - mi* nemi* bi*
    // NOTE: there's a possible bug here: prefixes could be separate nouns
    fixPerfixSpacing: function fixPerfixSpacing (text, options) {
      return text
        .replace(/((\s|^)ن?می) /g, '$1\u200c')
        .replace(/((\s|^)بی) /g, '$1\u200c'); // props @zoghal
    },

    // puts zwnj between word and suffix
    // NOTE: maybe bug: some suffixes could be nouns
    fixSuffixSpacing: function fixSuffixSpacing (text, options) {
      return text
        // *am *at *ash *ei *eid *eem *and
        .replace(/ ((ام|ات|اش|ای|اید|ایم|اند)[\s.!؟?"'()[\]{}“”«»])/g, '\u200c$1') // props @zoghal
        // *ha *haye
        .replace(/ (ها(ی)?[\s.!؟?"'()[\]{}“”«»])/g, '\u200c$1')
        // *tar *tari *tarin
        .replace(/ (تر((ی)|(ین))?[\s.!؟?"'()[\]{}“”«»])/g, '\u200c$1')
        // *hayee *hayam *hayat *hayash *hayetan *hayeman *hayeshan
        .replace(/ ((هایی|هایم|هایت|هایش|هایمان|هایتان|هایشان)[\s.!؟?"'()[\]{}“”«»])/g, '\u200c$1'); // props @zoghal
    },

    fixSuffixSpacingHamzeh: function fixSuffixSpacingHamzeh (text, options) {
      text = text.replace(/(\S)(ه[\s\u200c]+[یي])([\s\u200c])/g, '$1\u0647\u200c\u06cc$3'); // heh + ye
      text = text.replace(/(\S)(ه[\s\u200c]?\u0621)([\s\u200c])/g, '$1\u0647\u200c\u06cc$3'); // heh + standalone hamza
      text = text.replace(/(\S)(ه[\s\u200c]?\u0654)([\s\u200c])/g, '$1\u0647\u200c\u06cc$3'); // heh + hamza above

      return text;
    },

    fixSuffixMisc: function fixSuffixMisc (text, options) {
      return text
        // replaces ه followed by ئ or ی, and then by ی, with ه\u200cای,
        // EXAMPLE: خانه‌ئی becomes خانه‌ای
        // props @ebraminio/persiantools
        .replace(/(\S)ه[\u200c\u200e][ئی]ی([\s\u200c\u200e])/g, '$1ه\u200cای$2');
    },

    cleanupExtraMarks: function cleanupExtraMarks (text, options) {
      return text
        // replaces more than one exclamation mark with just one
        .replace(/(!){2,}/g, '$1')
        // replaces more than one english or persian question mark with just one
        .replace(/((\u061F|\?){2,})/g, '$2') // \u061F = `؟`
        // re-orders consecutive marks
        .replace(/(!)([\s]*)([\u061F?])/g, '$3$1'); // `?!` --> `!?`
    },

    // replace kashidas to ndash in parenthetic
    kashidasAsParenthetic: function kashidasAsParenthetic (text, options) {
      return text
        .replace(/(\s)\u0640+/g, '$1–')
        .replace(/\u0640+(\s)/g, '–$1');
    },

    // should remove all kashida between non-whitespace characters
    // NOTE: strange that we have to do this twice!
    cleanupKashidas: function cleanupKashidas (text, options) {
      return text
        .replace(/(\S)\u0640+(\S)/g, '$1$2')
        .replace(/(\S)\u0640+(\S)/g, '$1$2');
    },

    fixSpacingForBracesAndQuotes: function fixSpacingForBracesAndQuotes (text, options) {
      // should fix outside and inside spacing for () [] {}  “” «»
      text = text.replace(/[ \t\u200c]*(\()\s*([^)]+?)\s*?(\))[ \t\u200c]*/g, ' $1$2$3 ');
      text = text.replace(/[ \t\u200c]*(\[)\s*([^\]]+?)\s*?(\])[ \t\u200c]*/g, ' $1$2$3 ');
      text = text.replace(/[ \t\u200c]*(\{)\s*([^}]+?)\s*?(\})[ \t\u200c]*/g, ' $1$2$3 ');
      text = text.replace(/[ \t\u200c]*(“)\s*([^”]+?)\s*?(”)[ \t\u200c]*/g, ' $1$2$3 ');
      text = text.replace(/[ \t\u200c]*(«)\s*([^»]+?)\s*?(»)[ \t\u200c]*/g, ' $1$2$3 ');

      // : ; , . ! ? and their persian equivalents should have one space after and no space before
      text = text.replace(/[ \t\u200c]*([:;,؛،.؟!]{1})[ \t\u200c]*/g, '$1 ');

      // do not put space after colon that separates time parts
      text = text.replace(/([0-9۰-۹]+):\s+([0-9۰-۹]+)/g, '$1:$2');

      // do not put space after dots in numbers
      text = text.replace(/([0-9۰-۹]+)\. ([0-9۰-۹]+)/g, '$1.$2');

      // should not put space between Persian question mark and exclamation mark
      text = text.replace(/(\u061F|!)[\s](\u061F|!)/g, '$1$2'); // \u061F = ؟

      // should fix inside spacing for () [] {}  “” «»
      text = text.replace(/(\()\s*([^)]+?)\s*?(\))/g, '$1$2$3');
      text = text.replace(/(\[)\s*([^\]]+?)\s*?(\])/g, '$1$2$3');
      text = text.replace(/(\{)\s*([^}]+?)\s*?(\})/g, '$1$2$3');
      text = text.replace(/(“)\s*([^”]+?)\s*?(”)/g, '$1$2$3');
      text = text.replace(/(«)\s*([^»]+?)\s*?(»)/g, '$1$2$3');

      // (markdown) removes spaces between [] and ()
      // EXAMPLE: `[text] (link)` --> `[text](link)`
      text = text.replace(/(\[.*?\])\s+(\(.*?\))/g, '$1$2');

      // (markdown) removes spaces between double () [] {}
      // EXAMPLE: `[[text] ]` --> `[[text]]`
      text = text.replace(/(\(\(.*\))\s+(\))/g, '$1$2');
      text = text.replace(/(\[\[.*\])\s+(\])/g, '$1$2');
      text = text.replace(/(\{\{.*\})\s+(\})/g, '$1$2');

      return text;
    },

    cleanupSpacing: function cleanupSpacing (text, options) {
      return text
        // replaces more than one space with just a single one
        .replace(/[ ]+/g, ' ')

        // cleans spaces before diacritic characters
        // @REF: https://en.wikipedia.org/wiki/Persian_alphabet#Diacritics
        .replace(/(\S)[ ]+([\u064e\u0650\u064f\u064b\u064d\u064C\u0651\u06C0])/g, '$1$2')

        // cleans whitespace/zwnj between new-lines
        // @REF: https://stackoverflow.com/a/10965543/
        .replace(/\n[\s\u200c]*\n/g, '\n\n');
    },

    // clean more than two contiguous line breaks
    cleanupLineBreaks: function cleanupLineBreaks (text, options) {
      return text.replace(/(\n{2,})/g, '\n\n');
    },

    cleanupBeginAndEnd: function cleanupBeginAndEnd (text, options) {
      return text
        // cleans white-spaces beginning the new-lines
        .replace(/([\n]+)[ \t\u200c]*/g, '$1')
        // remove spaces, tabs, zwnj, direction marks and new lines from
        // the beginning and end of text
        // @REF: http://stackoverflow.com/a/38490203
        .replace(/^[\s\u200c\u200e\u200f]+|[\s\u200c\u200e\u200f]+$/g, '');
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
