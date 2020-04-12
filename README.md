# Virastar (ویراستار)
Virastar is a Persian text cleaner.

A javascript port of [aziz/virastar](https://github.com/aziz/virastar)
with lots of help from [ebraminio/persiantools](https://github.com/ebraminio/persiantools)

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

string of persian source to be cleaned.

##### options
Type: `object`

```js
Virastar("سلام 123" ,{"fix_english_numbers":false}); // Outputs: "سلام 123"
```

## Options and Specifications
Virastar comes with a list of options to control its behavior.

#### `normalize_eol`
_default_: `true`
- replaces windows end of lines with unix eol (`\n`)

#### `decode_htmlentities`
_default_: `true`
- converts numeral and selected html character-sets into original characters

#### `fix_dashes`
_default_: `true`
- replaces triple dash to mdash
- replaces double dash to ndash

#### `fix_three_dots`
_default_: `true`
- removes spaces between dots 
- replaces three dots with ellipsis character

#### `normalize_ellipsis`
_default_: `true`
- replaces more than one ellipsis with one
- replaces (space|tab|zwnj) after ellipsis with one space

#### `normalize_dates`
_default_: `true`
- re-orders date parts with slash as delimiter

#### `fix_english_quotes_pairs`
_default_: `true`
- replaces english quote pairs (`“”`) with their persian equivalent (`«»`)

#### `fix_english_quotes`
_default_: `true`
- replaces english quote marks with their persian equivalent

#### `fix_hamzeh`
_default_: `true`
- replaces `ه` followed by (space|ZWNJ|lrm) follow by `ی` with `هٔ`
- replaces `ه` followed by (space|ZWNJ|lrm|nothing) follow by `ء` with `هٔ`
- replaces `هٓ` or single-character `ۀ` with the standard `هٔ`

#### `fix_hamzeh_arabic`
_default_: `false`
- converts arabic hamzeh `ة` to `هٔ`

#### `cleanup_rlm`
_default_: `true`
- converts Right-to-left marks followed by persian characters to zero-width non-joiners (ZWNJ)

#### `cleanup_zwnj`
_default_: `true`
- converts all soft hyphens (`&shy;`) into zwnj
- removes more than one zwnj
- cleans zwnj after characters that don't conncet to the next
- cleans zwnj before and after numbers, english words, spaces and punctuations
- removes unnecessary zwnj on start/end of each line

#### `fix_arabic_numbers`
_default_: `true`
- replaces arabic numbers with their persian equivalent

#### `fix_english_numbers`
_default_: `true`
- replaces english numbers with their persian equivalent

#### `fix_numeral_symbols`
_default_: `true`
- replaces english percent signs (U+066A)
- replaces dots between numbers into decimal separator (U+066B)
- replaces commas between numbers into thousands separator (U+066C)

#### `fix_misc_non_persian_chars`
_default_: `true`
- replaces arabic normal/swash kaf with its persian equivalent
- replaces arabic/urdu/pushtu/uyghur yeh with its persian equivalent
- replaces kurdish he with its persian equivalent

#### `fix_punctuations`
_default_: `true`
- replaces `,`, `;` with its persian equivalent

#### `fix_question_mark`
_default_: `true`
- replaces question marks with its persian equivalent

#### `fix_perfix_spacing`
_default_: `true`
- puts zwnj between the word and the prefix:
	- `mi*`, `nemi*`, `bi*`

#### `fix_suffix_spacing`
_default_: `true`
- puts zwnj between the word and the suffix:
	- `*ha`, `*haye`
	- `*am`, `*at`, `*ash`, `*ei`, `*eid`, `*eem`, `*and`, `*man`, `*tan`, `*shan`
	- `*tar`, `*tari`, `*tarin`
	- `*hayee`, `*hayam`, `*hayat`, `*hayash`, `*hayetan`, `*hayeman`, `*hayeshan`

#### `fix_suffix_misc`
_default_: `true`
- replaces `ه` followed by `ئ` or `ی`, and then by `ی`, with `ه‌ای`

#### `fix_spacing_for_braces_and_quotes`
_default_: `true`
- removes inside spaces and more than one outside for `()`, `[]`, `{}`, `“”` and `«»`

#### `fix_spacing_for_punctuations`
_default_: `true`
- removes space before punctuations
- removes more than one space after punctuations, except followed by new-lines
- removes space after colon that separates time parts
- removes space after dots in numbers
- removes space before some common domain tlds
- removes space between question and exclamation marks
- removes space between same marks

#### `fix_diacritics`
_default_: `true`
- cleans zwnj before diacritic characters
- cleans more than one diacritic characters
- cleans spaces before diacritic characters

### `remove_diacritics`
_default_: `false`
- removes all diacritic characters

#### `fix_persian_glyphs`
_default_: `true`
- converts incorrect persian glyphs to standard characters

#### `fix_misc_spacing`
_default_: `true`
- removes space before parentheses on misc cases
- removes space before braces containing numbers

#### `cleanup_spacing`
_default_: `true`
- replaces more than one space with just a single one
- cleans whitespace/zwnj between new-lines

#### `cleanup_line_breaks`
_default_: `true`
- cleans more than **two** contiguous line breaks

#### `cleanup_begin_and_end`
_default_: `true`
- removes space/tab/zwnj/nbsp from the beginning of the new-lines
- removes spaces, tabs, zwnj, direction marks and new lines from the beginning and end of text

### markdown
#### `markdown_normalize_braces`
_default_: `true`
- removes spaces between `[]` and `()` (`[text] (link)` into `[text](link)`)
- removes space between `!` and opening brace (`! [alt](src)` into `![alt](src)`)
- removes spaces inside double `()`, `[]`, `{}` (`[[ text ]]` into `[[text]]`)
- removes spaces between double `()`, `[]`, `{}` (`[[text] ]` into `[[text]]`)

#### `markdown_normalize_lists`
_default_: `true`
- removes extra lines between two items on a markdown list beginning with `-`, `*` or `#`

#### `skip_markdown_ordered_lists_numbers_conversion`
_default_: `false`
- skips converting english numbers of ordered lists in markdown

### aggressive editing
#### `cleanup_extra_marks`
_default_: `true`
- replaces more than one exclamation mark with just one
- replaces more than one english or persian question mark with just one
- re-orders consecutive marks: `?!` into `!?`

#### `kashidas_as_parenthetic`
_default_: `true`
- replaces kashidas to ndash in parenthetic

#### `cleanup_kashidas`
_default_: `true`
- converts kashida between numbers to ndash
- removes all kashidas between non-whitespace characters

### extras
#### `preserve_frontmatter`
_default_: `true`
- preserves frontmatter data in the text

#### `preserve_HTML`
_default_: `true`
- preserves all html tags in the text

#### `preserve_comments`
_default_: `true`
- preserves all html comments in the text

#### `preserve_entities`
_default_: `true`
- preserves all html entities in the text

#### `preserve_URIs`
_default_: `true`
- preserves all uri strings in the text

#### `preserve_brackets`
_default_: `false`
- preserves strings inside square brackets (`[]`)

#### `preserve_braces`
_default_: `false`
- preserves strings inside curly braces (`{}`)

#### `preserve_nbsps`
_default_: `true`
- preserves all no-break space entities in the text

## License
This software is licensed under the MIT License. [View the license](LICENSE).
