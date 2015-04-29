-----
#Virastar (ویراستار)
نوشته‌های فارسی شما را ویرایش می‌کند

-----
Virastar (in Persian:ویراستار)


## Specifications

###Virastar
* should add persian_cleanup method to String class
* should replace Arabic kaf with its Persian equivalent
* should replace Arabic Yeh with its Persian equivalent
* should replace Arabic numbers with their Persian equivalent
* should replace English numbers with their Persian equivalent
* should replace English comma and semicolon with their Persian equivalent
* should correct :;,.?! spacing (one space after and no space before)
* should replace English quotes with their Persian equivalent
* should replace three dots with ellipsis
* should convert ه ی to هٔ
* should replace double dash to ndash and triple dash to mdash
* should replace more than one space with just a single one
* should remove unnecessary zwnj chars that are succeeded/preceded by a space
* should fix spacing for () [] {}  “” «» (one space outside, no space inside)
* should replace English percent sign to its Persian equivalent
* should replace more that one line breaks with just one
* should not replace line breaks
* should put zwnj between word and prefix/suffix (ha haye* tar* tarin mi* nemi*)
* should not replace English numbers in English phrases
* should not destroy urls in the text

#### aggressive editing
  * should replace more than one ! or ? mark with just one
  * should remove all kashidas

-----
## Install
    gem install virastar

## Usage
    "فارسي را كمی درست تر می نويسيم".persian_cleanup   # => "فارسی را کمی درست‌تر می‌نویسیم"

virastar comes with a list of flags to control its behavior, all flags are turned on by default but you can
turn them off by passing an options hash to the `persian_cleanup` method

    "سلام 123".persian_cleanup(:fix_english_numbers => false) # => "سلام 123"

here is the list of all flags:

* `fix_dashes`
* `fix_three_dots`
* `fix_english_quotes`
* `fix_hamzeh`
* `cleanup_zwnj`
* `fix_spacing_for_braces_and_quotes`
* `fix_arabic_numbers`
* `fix_english_numbers`
* `fix_misc_non_persian_chars`
* `fix_perfix_spacing`
* `fix_suffix_spacing`
* `aggresive`
* `cleanup_kashidas`
* `cleanup_extra_marks`
* `cleanup_spacing`
* `cleanup_begin_and_end`

## Acknowledgment
Virastar is highly inspired by [Virasbaz](http://virasbaz.persianlanguage.ir).

## Note on Patches/Pull Requests

* Fork the project.
* Make your feature addition or bug fix.
* Add tests for it. This is important so I don't break it in a
  future version unintentionally.
* Commit, do not mess with rakefile, version, or history.
  (if you want to have your own version, that is fine but bump version in a commit by itself I can ignore when I pull)
* Send me a pull request. Bonus points for topic branches.

## Copyright

Copyright (c) 2011 Allen A. Bargi. See LICENSE for details.
