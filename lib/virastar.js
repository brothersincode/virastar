/*!
* Virastar - v0.9.2 - 2016-09-24
* https://github.com/juvee/virastar
* Licensed: MIT
*/

(function(name, global, definition) {
	if (typeof module != 'undefined') module.exports = definition();
	else if (typeof define == 'function' && typeof define.amd == 'object') define(definition);
	else if (typeof window != 'undefined') window[name] = definition();
	else global[name] = definition();
}('Virastar', this, function() {

	function Virastar(text, options) {

		if (!(this instanceof Virastar))
			return new Virastar(text, options);

		text = text || {};

		if (typeof text == "object")
			this._init(text);

		else if (typeof text == "string") {
			this._init(options || {});
			return this.cleanup(text);
		}

		return this;
	}

	Virastar.prototype._init = function(options) {

		var opts = {
			normalize_eol: true,
			fix_dashes: true,
			fix_three_dots: true,
			fix_english_quotes_pairs: true,
			fix_english_quotes: true,
			fix_hamzeh: true,
			cleanup_rlm: true,
			cleanup_zwnj: true,
			fix_spacing_for_braces_and_quotes: true,
			fix_arabic_numbers: true,
			fix_english_numbers: true,
			fix_misc_non_persian_chars: true,
			fix_question_mark: true,
			skip_markdown_ordered_lists_numbers_conversion: true,
			fix_perfix_spacing: true,
			fix_suffix_spacing: true,
			aggresive: true,
			cleanup_kashidas: true,
			cleanup_extra_marks: true,
			cleanup_spacing: true,
			cleanup_begin_and_end: true,
			preserve_HTML: true,
			preserve_URIs: true,
		};

		for (var i in options) {
			if (options.hasOwnProperty(i)) {
				opts[i] = options[i];
			}
		}

		this.opts = opts;
	};

	Virastar.prototype.cleanup = function(text) {
		var opts = this.opts;

		// removing HTML tags bringing them back at the end of process
		if (opts.preserve_HTML) {
			var HTML_tags = [];
			text = text.replace(/(<[^<>]+>)/g, function(html_tag) {
				HTML_tags.push(html_tag);
				return "__HTML__PRESERVER__";
			});
		}

		// removing URIs bringing them back at the end of process
		if (opts.preserve_URIs) {

			// URI_regex by https://github.com/jhermsmeier/uri.regex
			var URI_regex = new RegExp("([A-Za-z][A-Za-z0-9+\\-.]*):(?:(//)(?:((?:[A-Za-z0-9\\-._~!$&'()*+,;=:]|%[0-9A-Fa-f]{2})*)@)?((?:\\[(?:(?:(?:(?:[0-9A-Fa-f]{1,4}:){6}|::(?:[0-9A-Fa-f]{1,4}:){5}|(?:[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,1}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){3}|(?:(?:[0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){2}|(?:(?:[0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}:|(?:(?:[0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})?::)(?:[0-9A-Fa-f]{1,4}:[0-9A-Fa-f]{1,4}|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))|(?:(?:[0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})?::)|[Vv][0-9A-Fa-f]+\\.[A-Za-z0-9\\-._~!$&'()*+,;=:]+)\\]|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|(?:[A-Za-z0-9\\-._~!$&'()*+,;=]|%[0-9A-Fa-f]{2})*))(?::([0-9]*))?((?:/(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*)|/((?:(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})+(?:/(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*)?)|((?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})+(?:/(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*)|)(?:\\?((?:[A-Za-z0-9\\-._~!$&'()*+,;=:@/?]|%[0-9A-Fa-f]{2})*))?(?:\\#((?:[A-Za-z0-9\\-._~!$&'()*+,;=:@/?]|%[0-9A-Fa-f]{2})*))?", "g");
			var URIs = [];

			text = text.replace(URI_regex, function(URI) {
				URIs.push(URI);
				return "__URI__PRESERVER__";
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

		// replace three dots with ellipsis
		if (opts.fix_three_dots)
			text = text.replace(/\s*\.{3,}/g, '…');

		// swap incorrect English quotes pairs ”“ to “”
		// text = text.replace(/(”)(.+?)(“)/g, '“$2”');

		// replace English quotes pairs with their Persian equivalent
		if (opts.fix_english_quotes_pairs)
			text = text.replace(/(“)(.+?)(”)/g, '«$2»');

		// replace English quotes with their Persian equivalent
		if (opts.fix_english_quotes)
			text = text.replace(/(["'`]+)(.+?)(\1)/g, '«$2»');

		// should convert ه ی to ه
		if (opts.fix_hamzeh)
			text = text.replace(/(\S)(ه[\s\u200C]+[یي])(\s)/g, '$1\u0647\u0654$3');

		// converting Right-to-left marks followed by persian characters to zero-width non-joiners (ZWNJ)
		if(opts.cleanup_rlm)
			text = text.replace(/([^a-zA-Z\-_])(\u200F)/g, '$1\u200c');

		if (opts.cleanup_zwnj) {

			// remove more than one ZWNJs
			text = text.replace(/\u200C{2,}/g, '\u200c');

			// clean ZWNJs after characters that don't conncet to the next letter
			text = text.replace(/([۰-۹0-9إأةؤورزژاآدذ،؛,\:«»\\\/@#$٪×\*\(\)ـ\-=\|])\u200c/g, '$1');

			// clean ZWNJs before English characters
			text = text.replace(/\u200c([\w])/g, '$1');
			text = text.replace(/([\w])\u200c/g, '$1');

			// clean ZWNJs after and before punctuation
			text = text.replace(/\u200c([\n\s\[\]\.،«»\:\(\)\؛\؟\?\;\$\!\@\-\=\+\\])/g, '$1');
			text = text.replace(/([\n\s\[\.،«»\:\(\)\؛\؟\?\;\$\!\@\-\=\+\\])\u200c/g, '$1');

			// remove unnecessary zwnj char that are succeeded/preceded by a space
			text = text.replace(/\s+\u200C|\u200C\s+/g, ' ');
		}

		var charBatchReplace = function(text, chars, Rchars) {
			var charsA = chars.split("");
			var RcharsA = Rchars.split("");
			for (var i in charsA)
				text = text.replace(new RegExp(charsA[i], 'g'), RcharsA[i]);
			return text;
		};

		// character replacement
		var persian_numbers = "۱۲۳۴۵۶۷۸۹۰";
		var arabic_numbers = "١٢٣٤٥٦٧٨٩٠";
		var english_numbers = "1234567890";
		var bad_chars = ",;كي%";
		var good_chars = "،؛کی٪";


		if (opts.fix_arabic_numbers)
			text = charBatchReplace(text, arabic_numbers, persian_numbers);


			var english_chars = '0-9' + bad_chars + "\\?";
		  text = text.replace(
		    new RegExp("(?:([a-zA-Z\\-_]{2,})|(&#)|((?:\\r?\\n)|(?:\\r\\n?)|^)|[^" + english_chars + "])([" +
		      english_chars + "]+)(?:([a-zA-Z\\-_]{2,})|(;)|(\\.\\s)|(?:[^" + english_chars + "]|$))", 'g'),
		    function(matchText, enPharses_, htmlEntity_, mdOLs_, english_chars, _enPharses, _htmlEntity, _mdOLs) {
		      // should not replace to Persian chars in english phrases
		      if (enPharses_ || _enPharses)
		        return matchText;
		      // preserve markdown ordered lists numbers
		      if (opts.skip_markdown_ordered_lists_numbers_conversion && (mdOLs_ !== undefined) && _mdOLs)
		        return matchText;
		      if (opts.fix_english_numbers)
		        matchText = charBatchReplace(matchText, english_numbers, persian_numbers);
		      if (opts.fix_misc_non_persian_chars)
		        matchText = charBatchReplace(matchText, bad_chars, good_chars);
		      if (opts.fix_question_mark)
		        matchText = matchText.replace(/(\?)/g, '\u061F'); //\u061F = ؟
		      return matchText
		    });


		// put zwnj between word and prefix (mi* nemi*)
		// there's a possible bug here: می and نمی could be separate nouns and not prefix
		if (opts.fix_perfix_spacing)
			text = text.replace(/((\s+|^)ن?می)\u0020/g, '$1\u200C');

		// put zwnj between word and suffix (*tar *tarin *ha *haye)
		// there's a possible bug here: های and تر could be separate nouns and not suffix
		if (opts.fix_suffix_spacing)
			text = text.replace(/\u0020(تر(ی(ن)?)?|ها(ی)?\s+)/g, '\u200C$1'); // in case you can not read it: \s+(tar(i(n)?)?|ha(ye)?)\s+

		/// Aggressive Editing -----------------------------------------------------
		if (opts.aggresive) {

			// replace more than one ! or ? mark with just one
			if (opts.cleanup_extra_marks) {
				text = text.replace(/(!){2,}/g, '$1');
				text = text.replace(/(\u061F){2,}/g, '$1'); //\u061F = ؟
			}

			// should remove all kashida
			if (opts.cleanup_kashidas)
				text = text.replace(/ـ+/g, "");
		}
		// -------------------------------------------------------------------------

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
			text = text.replace(/([۰-۹]+):\s+([۰-۹]+)/g, '$1:$2');
			// should not put space between Persian question mark and exclamation mark
			text = text.replace(/(\u061F|!)\s(\u061F|!)/g, '$1$2'); //\u061F = ؟

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
			text = text.replace(/([\n]+)[ \t\u200C]*/g, '$1');
		}

		// remove spaces, tabs, and new lines from the beginning and enf of file
		// http://stackoverflow.com/a/38490203
		if (opts.cleanup_begin_and_end)
			text = text.replace(/^[\s\u200c]+|[\s\u200c]+$/gm, '');

		// bringing back URIs
		if (opts.preserve_URIs) {
			text = text.replace(/__URI__PRESERVER__/g, function() {
				return URIs.shift();
			});
		}

		// bringing back HTML tags
		if (opts.preserve_HTML) {
			text = text.replace(/__HTML__PRESERVER__/g, function() {
				return HTML_tags.shift();
			});
		}

		return text;
	};

	return Virastar
}));
