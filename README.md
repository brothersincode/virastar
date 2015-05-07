
#Virastar (ویراستار)

Virastar is a Persian text cleaner.it's a js port of [aziz/virastar](https://github.com/aziz/virastar) github repository

see live [demo](http://juvee.github.io/virastar/)


## Install

``` bash
npm install virastar
```

## Usage

```js
var Virastar = require('virastar');
var virastar=new Virastar();

virastar.cleanup("فارسي را كمی درست تر می نويسيم")
// Outputs: "فارسی را کمی درست‌تر می‌نویسیم"
```
#### Browser

```html
<script src="lib/virastar.js"></script>
<script>
	var virastar=new Virastar();
	alert(virastar.cleanup("فارسي را كمی درست تر می نويسيم"));
</script>
```


## Virastar([text] [,options])

### text

Type: `string`

String of Persian source to be cleaned.

### options

Type: `object`


```js
Virastar("سلام 123" ,{"fix_english_numbers":false});
// Outputs:"سلام 123"
```

## Options and Specifications
virastar comes with a list of options to control its behavior

_all options are enabled by default._

* `fix_dashes`
replace double dash to ndash and triple dash to mdash

* `fix_three_dots`
replace three dots with ellipsis

* `fix_english_quotes_pairs`
replace English quotes pairs (“”) with their Persian equivalent («»)

* `fix_english_quotes`
replace English quotes, commas and semicolons with their Persian equivalent

* `fix_hamzeh`
convert ه ی to هٔ

* `cleanup_zwnj`
remove unnecessary zwnj chars that are succeeded/preceded by a space

* `fix_arabic_numbers`
replace Arabic numbers with their Persian equivalent

* `fix_english_numbers`
replace English numbers with their Persian equivalent
and should not replace English numbers in English phrases

* `fix_misc_non_persian_chars`
replace Arabic kaf and Yeh with its Persian equivalent

* `fix_question_mark`
replace question marks with its Persian equivalent

* `fix_perfix_spacing`
put zwnj between word and prefix (mi* nemi*)
* `fix_suffix_spacing`
put zwnj between word and suffix (*tar *tarin *ha *haye)

* `fix_spacing_for_braces_and_quotes`
fix spacing for () [] {}  “” «» (one space outside, no space inside)
and correct :;,.?! spacing (one space after and no space before)

* `cleanup_spacing`
replace more than one space with just a single one

* `cleanup_begin_and_end`
remove spaces, tabs, and new lines from the beginning and enf of file


#### aggressive editing
* `aggresive`
enable/disable aggressive editing

* `cleanup_extra_marks`
replace more than one ! or ? mark with just one

* `cleanup_kashidas`
remove all kashidas

#### extras

* `preserve_HTML`
preserve all HTML tags

* `preserve_URIs`
preserve all URI links in the text
