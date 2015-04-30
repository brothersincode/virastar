function Virastar(text, options) {
    if(!(this instanceof Virastar))
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
    var opts = {};
    opts.fix_dashes = options.fix_dashes || true;
    opts.fix_three_dots = options.fix_three_dots || true;
    opts.fix_english_quotes = options.fix_english_quotes || true;
    opts.fix_hamzeh = options.fix_hamzeh || true;
    opts.cleanup_zwnj = options.cleanup_zwnj || true;
    opts.fix_spacing_for_braces_and_quotes = options.fix_spacing_for_braces_and_quotes || true;
    opts.fix_arabic_numbers = options.fix_arabic_numbers || true;
    opts.fix_english_numbers = options.fix_english_numbers || true;
    opts.fix_misc_non_persian_chars = options.fix_misc_non_persian_chars || true;
    opts.fix_perfix_spacing = options.fix_perfix_spacing || true;
    opts.fix_suffix_spacing = options.fix_suffix_spacing || true;
    opts.aggresive = options.aggresive || true;
    opts.cleanup_kashidas = options.cleanup_kashidas || true;
    opts.cleanup_extra_marks = options.cleanup_extra_marks || true;
    opts.cleanup_spacing = options.cleanup_spacing || true;
    opts.cleanup_begin_and_end = options.cleanup_begin_and_end || true;
    //preserve URIs
    opts.preserve_URIs = options.preserve_URIs || true;
    this.opts = opts;
}



Virastar.prototype.cleanup = function(text) {
    var opts = this.opts;

    // removing URIs bringing them back at the end of process
    if (opts.preserve_URIs) {
		
		var URI_regex=new RegExp( "([A-Za-z][A-Za-z0-9+\\-.]*):(?:(//)(?:((?:[A-Za-z0-9\\-._~!$&'()*+,;=:]|%[0-9A-Fa-f]{2})*)@)?((?:\\[(?:(?:(?:(?:[0-9A-Fa-f]{1,4}:){6}|::(?:[0-9A-Fa-f]{1,4}:){5}|(?:[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,1}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){3}|(?:(?:[0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){2}|(?:(?:[0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}:|(?:(?:[0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})?::)(?:[0-9A-Fa-f]{1,4}:[0-9A-Fa-f]{1,4}|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))|(?:(?:[0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})?::)|[Vv][0-9A-Fa-f]+\\.[A-Za-z0-9\\-._~!$&'()*+,;=:]+)\\]|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|(?:[A-Za-z0-9\\-._~!$&'()*+,;=]|%[0-9A-Fa-f]{2})*))(?::([0-9]*))?((?:/(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*)|/((?:(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})+(?:/(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*)?)|((?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})+(?:/(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*)|)(?:\\?((?:[A-Za-z0-9\\-._~!$&'()*+,;=:@/?]|%[0-9A-Fa-f]{2})*))?(?:\\#((?:[A-Za-z0-9\\-._~!$&'()*+,;=:@/?]|%[0-9A-Fa-f]{2})*))?","g");
		// URI_regex by https://github.com/jhermsmeier/uri.regex
		
		
        var URIs = [];
       
        text = text.replace(URI_regex, function(URI) {
            URIs.push(URI);
            return "__URI__PRESERVER__";
        })

    }


    // replace double dash to ndash and triple dash to mdash
    if (opts.fix_dashes) {
        text = text.replace(/-{3}/g, '—')
        text = text.replace(/-{2}/g, '–')
    }

    // replace three dots with ellipsis
    if (opts.fix_three_dots)
        text = text.replace(/\s*\.{3,}/g, '…');

    // replace English quotes with their Persian equivalent
    if (opts.fix_english_quotes)
        text = text.replace(/(["'`]+)(.+?)(\1)/g, '«$2»');

    // should convert ه ی to ه
    if (opts.fix_hamzeh)
        text = text.replace(/(\S)(ه[\s‌]+[یي])(\s)/g, '$1\u0647\u0654$3');

    // remove unnecessary zwnj char that are succeeded/preceded by a space
    if (opts.cleanup_zwnj)
        text = text.replace(/\s+‌|‌\s+/g, ' ');


    var charBatchReplace = function(text, chars, Rchars) {
        var charsA = chars.split("");
        var RcharsA = Rchars.split("");
        for (var i in charsA)
            text = text.replace(new RegExp(charsA[i],'g'), RcharsA[i])
        return text;
    }

    // character replacement
    persian_numbers = "۱۲۳۴۵۶۷۸۹۰"
    arabic_numbers = "١٢٣٤٥٦٧٨٩٠"
    english_numbers = "1234567890"
    bad_chars = ",;كي%"
    good_chars = "،؛کی٪"
    if (opts.fix_english_numbers)
        text = charBatchReplace(text, english_numbers, persian_numbers);
    if (opts.fix_arabic_numbers)
        text = charBatchReplace(text, arabic_numbers, persian_numbers);
    if (opts.fix_misc_non_persian_chars)
        text = charBatchReplace(text, bad_chars, good_chars);

    // should not replace exnglish chars in english phrases
    text = text.replace(/([a-zA-Z\-_]{2,}[۰-۹]+|[۰-۹]+[a-zA-Z\-_]{2,})/g, function(match) {
        return charBatchReplace(match, persian_numbers, english_numbers);

    });

    // put zwnj between word and prefix (mi* nemi*)
    // there's a possible bug here: می and نمی could be separate nouns and not prefix
    if (opts.fix_perfix_spacing)
        text = text.replace(/\s+(ن?می)\s+/g, '\u200C\u0020$1\u200C')

    // put zwnj between word and suffix (*tar *tarin *ha *haye)
    // there's a possible bug here: های and تر could be separate nouns and not suffix
    if (opts.fix_suffix_spacing)
    text = text.replace(/\s+(تر(ی(ن)?)?|ها(ی)?)\s+/g, '\u200C$1\u0020') // in case you can not read it: \s+(tar(i(n)?)?|ha(ye)?)\s+

    // -- Aggressive Editing ------------------------------------------
    if (opts.aggresive) {

        // replace more than one ! or ? mark with just one
        if (opts.cleanup_extra_marks) {
            text = text.replace(/(!){2,}/g, '$1')
            text = text.replace(/(\u061F){2,}/g, '$1') //\u061F ==؟
        }

        // should remove all kashida
        if (opts.cleanup_kashidas)
            text = text.replace(/ـ+/g, "")

    }
    // ----------------------------------------------------------------

    // should fix outside and inside spacing for () [] {}  “” «»
    if (opts.fix_spacing_for_braces_and_quotes) {
        text = text.replace(/[ \t‌]*(\()\s*([^)]+?)\s*?(\))[ \t‌]*/g, ' $1$2$3 ')
        text = text.replace(/[ \t‌]*(\[)\s*([^\]]+?)\s*?(\])[ \t‌]*/g, ' $1$2$3 ')
        text = text.replace(/[ \t‌]*(\{)\s*([^}]+?)\s*?(\})[ \t‌]*/g, ' $1$2$3 ')
        text = text.replace(/[ \t‌]*(“)\s*([^”]+?)\s*?(”)[ \t‌]*/g, ' $1$2$3 ')
        text = text.replace(/[ \t‌]*(«)\s*([^»]+?)\s*?(»)[ \t‌]*/g, ' $1$2$3 ')
    }

    // : ; , . ! ? and their persian equivalents should have one space after and no space before
    if (opts.fix_spacing_for_braces_and_quotes) {
        text = text.replace(/[ \t‌]*([:;,؛،.؟!]{1})[ \t‌]*/g, '$1 ')
            // do not put space after colon that separates time parts
        text = text.replace(/([۰-۹]+):\s+([۰-۹]+)/g, '$1:$2')
    }

    // should fix inside spacing for () [] {}  “” «»
    if (opts.fix_spacing_for_braces_and_quotes) {
        text = text.replace(/(\()\s*([^)]+?)\s*?(\))/g, '$1$2$3')
        text = text.replace(/(\[)\s*([^\]]+?)\s*?(\])/g, '$1$2$3')
        text = text.replace(/(\{)\s*([^}]+?)\s*?(\})/g, '$1$2$3')
        text = text.replace(/(“)\s*([^”]+?)\s*?(”)/g, '$1$2$3')
        text = text.replace(/(«)\s*([^»]+?)\s*?(»)/g, '$1$2$3')
    }

    // should replace more than one space with just a single one
    if (opts.cleanup_spacing) {
        text = text.replace(/[ ]+/g, ' ')
        text = text.replace(/([\n]+)[ \t‌]*/g, '$1')
    }

    // remove spaces, tabs, and new lines from the beginning and enf of file
    if (opts.cleanup_begin_and_end)
        text = text.trim();

    // bringing back URIs
    if (opts.preserve_URIs) {
		text = text.replace(/__URI__PRESERVER__/g, function() {
				return URIs.shift();
            });
            
        }
    return text;

}


if (typeof exports === 'object') {
	module.exports = Virastar;
} else if (typeof define === 'function' && define.amd) {
	define(function() {
		return Virastar;
	});
} else {
	this.Virastar = Virastar;
}
