# Virastar (ویراستار)
Virastar is a Persian text cleaner.

A javascript port of [aziz/virastar](https://github.com/aziz/virastar)

see live [demo](https://virastar.brothersincode.ir)

[![Build Status](https://img.shields.io/travis/brothersincode/virastar/master.svg?style=flat-square)](https://travis-ci.org/brothersincode/virastar)
[![Dependency Status](https://img.shields.io/david/brothersincode/virastar.svg?style=flat-square)](https://david-dm.org/brothersincode/virastar)
[![NPM version](https://img.shields.io/npm/v/virastar.svg?style=flat-square)](https://www.npmjs.com/package/virastar)
[![GitHub issues](https://img.shields.io/github/issues/brothersincode/virastar.svg?style=flat-square)](https://github.com/brothersincode/virastar/issues)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://raw.githubusercontent.com/brothersincode/virastar/master/LICENSE)
[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square)](https://github.com/Flet/semistandard)

## Install
```bash
npm install virastar
```

## Usage
```js
var Virastar = require('virastar');
var virastar = new Virastar();

virastar.cleanup("فارسي را كمی درست تر می نويسيم"); // Outputs: "فارسی را کمی درست‌تر می‌نویسیم"
```

### Browser
```html
<script src="lib/virastar.js"></script>
<script>
  var virastar = new Virastar();
  alert(virastar.cleanup("فارسي را كمی درست تر می نويسيم"));
</script>
```

#### Virastar([text] [,options])

##### text
Type: `string`

String of Persian source to be cleaned.

##### options
Type: `object`

```js
Virastar("سلام 123" ,{"fix_english_numbers":false}); // Outputs: "سلام 123"
```

## Options and Specifications
Virastar comes with a list of options to control its behavior.

* `normalize_eol`, (_default_: `true`)
	- replace Windows end of lines with Unix EOL (`\n`)


* `decode_htmlentities`, (_default_: `true`)
	- converts all HTML characterSets into original characters


* `fix_dashes`, (_default_: `true`)
	- replace double dash to ndash and triple dash to mdash


* `fix_three_dots`, (_default_: `true`)
	- replace three dots with ellipsis


* `normalize_ellipsis`, (_default_: `true`)
	- replace more than one ellipsis with one


* `fix_english_quotes_pairs`, (_default_: `true`)
	- replace English quotes pairs (`“”`) with their Persian equivalent (`«»`)


* `fix_english_quotes`, (_default_: `true`)
	- replace English quotes, commas and semicolons with their Persian equivalent


* `fix_hamzeh`, (_default_: `true`)
	- convert `ه ی` to `هٔ`
	- convert `ه ء` to `هٔ`


* `cleanup_rlm`, (_default_: `true`)
	- converting Right-to-left marks followed by Persian characters to zero-width non-joiners (ZWNJ)


* `cleanup_zwnj`, (_default_: `true`)
	- converts all soft hyphens (`&shy;`) into zwnj
	- removes more than one zwnj
	- cleans zwnj after characters that don't conncet to the next letter
	- cleans zwnj before diacritic characters
	- cleans zwnj before english characters
	- cleans zwnj before and after punctuations
	- removes unnecessary zwnj succeeded/preceded by spaces
	- removes unnecessary zwnj on start/end of each line



* `fix_arabic_numbers`, (_default_: `true`)
	- replace Arabic numbers with their Persian equivalent


* `fix_english_numbers`, (_default_: `true`)
	- replace English numbers with their Persian equivalent
	- should not replace English numbers in English phrases


* `fix_misc_non_persian_chars`, (_default_: `true`)
	- replace Arabic kaf with its Persian equivalent
	- replace Arabic/Urdu/Pushtu/Uyghur Yeh with its Persian equivalent
	- replace Kurdish He with its Persian equivalent


* `fix_punctuations`, (_default_: `true`)
	- replace `%`, `,`, `;` with its Persian equivalent


* `fix_question_mark`, (_default_: `true`)
	- replace question marks with its Persian equivalent


* `fix_perfix_spacing`, (_default_: `true`)
	- put zwnj between word and prefix:
		- `mi*`, `nemi*`, `bi*`


* `fix_suffix_spacing`, (_default_: `true`)
	- put zwnj between word and suffix:
		- `*am`, `*at`, `*ash`, `*ei`, `*eid`, `*eem`, `*and`
		- `*ha`, `*haye`
		- `*tar`, `*tari`, `*tarin`
		- `*hayee`, `*hayam`, `*hayat`, `*hayash`, `*hayetan`, `*hayeman`, `*hayeshan`


* `fix_spacing_for_braces_and_quotes`, (_default_: `true`)
	- removes inside spaces and more than one outside for `()`, `[]`, `{}`, `“”` and `«»`


* `fix_spacing_for_punctuations`, (_default_: `true`)
	- one space after and no space before `:`, `;`, `,`, `.`, `!`, `?` and `؟`
	- removes space after colon that separates time parts
	- removes space after dots in numbers
	- removes space between question and exclamation marks
	- removes space between same marks


* `cleanup_spacing`, (_default_: `true`)
	- replace more than one space with just a single one
	- clean spaces before diacritic characters


* `cleanup_line_breaks`, (_default_: `true`)
	- remove more than **two** contiguous line breaks


* `cleanup_begin_and_end`, (_default_: `true`)
	- remove spaces, tabs, and new lines from the beginning and end of text

#### markdown
* `markdown_normalize_braces`, (_default_: `true`)
	- removes spaces between `[]` and `()` (`[text] (link)` into `[text](link)`)
	- removes spaces inside double `()`, `[]`, `{}` (`[[ text ]]` into `[[text]]`)
	- removes spaces between double `()`, `[]`, `{}` (`[[text] ]` into `[[text]]`)

* `markdown_normalize_lists`, (_default_: `true`)
	- removes extra lines between two items on a markdown list beginning with `-`, `*` or `#`

* `skip_markdown_ordered_lists_numbers_conversion`, (_default_: `false`)
	- skip converting English numbers of ordered lists in markdown

#### aggressive editing
* `cleanup_extra_marks`, (_default_: `true`)
	- replace more than one of `!`, `?` or `؟` marks with just one
	- re-order consecutive marks: `?!` into `!?`


* `kashidas_as_parenthetic`, (_default_: `true`)
	- replace kashidas to ndash in parenthetic


* `cleanup_kashidas`, (_default_: `true`)
	- remove all kashidas

#### extras
* `preserve_frontmatter`, (_default_: `true`)
	- preserve frontmatter data


* `preserve_HTML`, (_default_: `true`)
	- preserve all HTML tags


* `preserve_comments`, (_default_: `true`)
	- preserve all HTML comments


* `preserve_entities`, (_default_: `true`)
	- preserve all HTML entities


* `preserve_URIs`, (_default_: `true`)
	- preserve all URI links in the text


* `preserve_brackets`, (_default_: `false`)
	- preserve strings inside square brackets (`[]`)


* `preserve_braces`, (_default_: `false`)
	- preserve strings inside curly braces (`{}`)


* `preserve_nbsps`, (_default_: `true`)
	- preserve all no-break spaces

## License

This software is licensed under the MIT License. [View the license](LICENSE).
