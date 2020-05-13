### 0.21.0
- Added: removes spaces between dots on `fix_three_dots`
- Added: new option `normalize_dates` to re-order date parts with slash as delimiter
- Added: new option `fix_misc_spacing` to remove space before braces containing numbers
- Added: new option `remove_diacritics` to remove all diacritic characters
- Added: removes markdown link spaces inside normal parentheses
- Changed: early fix persian glyphs
- Changed: removing space between different/same marks
- Fixed: lazy seek before dashes on frontmatter preserving
- Fixed: combined preserving markdown links
- Fixed: avoid new-lines as whitespaces
- Fixed: combined pattern for removing kashidas
- Fixed: prevent removing spaces after punctuations on the end of lines
- Fixed: prevent removing double spaces on the end of lines
- Fixed: prevent removing new-lines on normalize braces

### 0.20.0
- Added: cleanup zwnj before/after ellipsis
- Added: converting kashida between numbers to ndash
- Added: new option for converting arabic hamzeh
- Added: replaces spaces after ellipsis
- Added: support for markdown images
- Added: support for more punctuations before/after zwnjs cleanup
- Changed: also removes nbsp from beginning of new-lines
- Changed: late checks for zwnjs
- Changed: revert to the old and big uri pattern, [ref](https://github.com/jhermsmeier/uri.regex)
- Fixed: account for punctuations after domain tlds
- Fixed: account for space before image opening brace within links
- Fixed: also single padding on the beginning of the text
- Fixed: check for non-space after space and prefixes
- Fixed: check for persian chars before suffix spacings
- Fixed: optional space after preservers

### 0.19.1
- Added: cleaning more than one of diacritic chars on `fix_diacritics`, props @languagetool-org
- Added: extra method for converting persian numbers back
- Added: fix another arabic kaf char on `fix_misc_non_persian_chars`
- Added: removes space before common domain tlds on `fix_spacing_for_punctuations`
- Added: replace comma between numbers to thousands separators on `fix_numeral_symbols`
- Added: support for man tan shan suffixes
- Changed: begin/end space cleanup after preservers
- Changed: extract diacritics fixes as new option: `fix_diacritics`
- Changed: yet another pattern for preserving URIs, ([ref](https://stackoverflow.com/a/6927878/))
- Fixed: fix ha haye before other suffixes
- Fixed: support for more punctuation types after suffixes

### 0.19.0
- Added: (undocumented) fix heh + ye, alternative to `fix_hamzeh`
- Added: cleaning whitespace/zwnj between new-lines on `cleanup_spacing`
- Added: new option `fix_numeral_symbols` to replace percent signs and decimal separators, props @ebraminio/persiantools
- Added: new option `fix_persian_glyphs` to replace glyph chars, props @ebraminio/persiantools
- Added: new option `fix_suffix_misc` to fix hamza with double yeh, props @ebraminio/persiantools
- Added: new option `markdown_normalize_braces`
- Added: new option `markdown_normalize_lists`
- Added: new option `preserve_frontmatter` to preserve frontmatter data
- Added: padding the end of string while cleanup
- Added: re-ordering extra marks: `?!` into `!?`
- Added: removing space between same marks
- Added: removing unnecessary zwnj on start/end of each line, props @ebraminio/persiantools
- Added: replacing more than one english question mark with just one
- Added: skip cleanup if text is empty or whitespace
- Added: storing markdown links separetly to help space cleanup working
- Changed: deprecated `aggresive` option
- Changed: moved cleaning whitespaces before newlines to `cleanup_begin_and_end`
- Changed: new option `fix_spacing_for_punctuations` extracted from `fix_spacing_for_braces_and_quotes`
- Changed: simpler pattern for preserving URIs
- Changed: some options disabled by default: `preserve_braces`, `preserve_brackets`, `skip_markdown_ordered_lists_numbers_conversion`
- Fixed: account for punctuations, braces and quots after suffixes
- Fixed: account for zwnj after yeh on fixing hamzeh
- Fixed: copy options object before parsing
- Fixed: putting back correct whitespace on cleaning zwnjs
- Fixed: unescaped char on space after dots in numbers

### 0.18.0
- Added: new option `normalize_ellipsis` to replace more than one ellipsis with one
- Added: convert all soft hyphens into zwnj, on `cleanup_zwnj`
- Added: remove direction marks from begin and end of text, on `cleanup_begin_and_end`
- Added: extra method for flipping punctuations
- Fixed: fix three dots as standalone method

### 0.17.0
- Added: initial check for type of the input
- Added: new option `cleanup_line_breaks` to remove more than two contiguous line breaks
- Added: new option `preserve_entities` to preserve html non decoded entities
- Added: new option `preserve_comments` to preserve html comments
- Added: new option `preserve_nbsps` to preserve no-break spaces
- Fixed: also fix heh plus standalone hamza
- Fixed: clean spaces before diacritic characters
- Fixed: clean ZWNJs before diacritic characters
- Fixed: putting back chars after suffix white spaces
- Fixed: better pattern for preserving html tags
- Fixed: decode all decimal, hex and some selected entities
- Fixed: decode html entity as standalone method

### 0.16.0
- Added: support more misc non Persian chars, props @ebraminio/persiantools
- Added: new option: `fix_punctuations`
- Fixed: better prototype structure
- Fixed: cleanup zwnj as standalone method

### 0.15.1
- Added: should not replace sprintf directives
- Added: extra method for swaping incorrect quotes
- Fixed: word tokenizer accounts for wraping chars
- Fixed: no space after dots in numbers
- Fixed: no space in time parts in English
- Fixed: mismatch options for Arabic/English numbers

### 0.15.0
- Added: support prefix: `bi*`, props @zoghal
- Added: support suffix: `*am`, `*at`, `*ash`, `*ei`, `*eid`, `*eem`, `*and`, props @zoghal
- Added: support suffix: `*hayee`, `*hayam`, `*hayat`, `*hayash`, `*hayetan`, `*hayeman`, `*hayeshan`, props @zoghal
- Fixed: check for space before suffix: `*tar`, `*tari`, `*tarin`, props @zoghal

### 0.14.0
- Added: convert back quot/apos entities
- Added: new option: `decode_htmlentities`
- Fixed: test suite

### 0.13.0
- Added: [coding standard](https://github.com/Flet/semistandard)
- Added: passing options directly into cleanup method

### 0.12.0
- Added: new option: `preserve_brackets`
- Added: new option: `preserve_braces`

### 0.11.0
- Added: new option: `kashidas_as_parenthetic`
- Fixed: remove all kashida between non-whitespace characters

### 0.10.0
- Added: new word tokenizer detection
- Added: skip english numbers conversion in html entities
- Added: bower integration
- Fixed: multiline flag on begin/end cleanup
