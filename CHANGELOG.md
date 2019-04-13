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
