const assert = require('assert');
const Virastar = require('../lib/virastar.js');
const sprintf = require('sprintf-js').sprintf;

// demo default options
const options = {
  // skip_markdown_ordered_lists_numbers_conversion: false,
  // preserve_brackets: false,
  // preserve_braces: false
};

const optionsText = {
  preserve_HTML: false,
  preserve_URIs: false
  // preserve_brackets: false,
  // preserve_braces: false
};

const optionsMarkdown = {
  fix_dashes: false,
  cleanup_spacing: false,
  cleanup_begin_and_end: false
  // skip_markdown_ordered_lists_numbers_conversion: false
};

const optionsHTML = {
  cleanup_spacing: false
};

describe('Virastar.js', function () {
  let virastar;

  it('should create new instance', function () {
    virastar = new Virastar();
  });

  describe('#cleanup()', function () {
    it('should cleanup simple sentences', function () {
      assert.strictEqual(virastar.cleanup(
        'ويراستار به شما كمك مي كند تا متون فارسي زيبا تر و درست تري بنويسيد .', options),
      'ویراستار به شما کمک می‌کند تا متون فارسی زیباتر و درست‌تری بنویسید.'
      );

      assert.strictEqual(virastar.cleanup(
        'ويراستار به طور پيش فرض اين کار ها را انجام می دهد :', options),
      'ویراستار به طور پیش فرض این کارها را انجام می‌دهد:'
      );
    });

    it('should cleanup simple sentences #1', function () {
      assert.strictEqual(virastar.cleanup(
        '1. نویسه های عربي را به فارسی تبديل مي کند.  مثلا كاف و ياي عربي .', options),
      '۱. نویسه‌های عربی را به فارسی تبدیل می‌کند. مثلا کاف و یای عربی.'
      );
    });

    it('should cleanup simple sentences #2', function () {
      assert.strictEqual(virastar.cleanup(
        '2. نویسه های انگليسي رايج در تايپ فارسي را به معادل صحيح فارسي آن تبدیل می کند, مثلا تبدیل کامای انگلیسی به ویرگول (,), يا نقطه ویرگول به جای semicolon (;) و یا استفاده از "گيومه های فارسي"', options),
      '۲. نویسه‌های انگلیسی رایج در تایپ فارسی را به معادل صحیح فارسی آن تبدیل می‌کند، مثلا تبدیل کامای انگلیسی به ویرگول (،)، یا نقطه ویرگول به جای semicolon (؛) و یا استفاده از «گیومه‌های فارسی»'
      );
    });

    it('should cleanup simple sentences #3', function () {
      assert.strictEqual(virastar.cleanup(
        '3. اعداد عربي و انگليسي و علائم رياضی را به معادل فارسی آن ها تبديل مي کند.    مثلا  :  12%  456', options),
      '۳. اعداد عربی و انگلیسی و علائم ریاضی را به معادل فارسی آن‌ها تبدیل می‌کند. مثلا: ۱۲٪ ۴۵۶'
      );
    });

    it('should cleanup simple sentences #4', function () {
      assert.strictEqual(virastar.cleanup(
        '4. سه نقطه را به نويسه صحيح آن که تنها يك نويسه است تبديل کرده و فاصله گذاري آن را اصلاح مي کند ...', options),
      '۴. سه نقطه را به نویسه صحیح آن که تنها یک نویسه است تبدیل کرده و فاصله گذاری آن را اصلاح می‌کند…'
      );
    });

    it('should cleanup simple sentences #5', function () {
      assert.strictEqual(virastar.cleanup(
        '5. در ترکيباتي مانند \'\'خانه ي پدری\'\' که  با "ه" تمام می‌شوند نشانه "ی" كسره ی اضافه را به "هٔ" تبديل می كند.', options),
      '۵. در ترکیباتی مانند «خانهٔ پدری» که با «ه» تمام می‌شوند نشانه «ی» کسرهٔ اضافه را به «هٔ» تبدیل می‌کند.'
      );
    });

    it('should cleanup simple sentences #6', function () {
      assert.strictEqual(virastar.cleanup(
        '6. دو علامت منهاي پي در پي را به خط کشيده کوتاه (--) و سه علامت منهاي پي در پي را به خط کشیده بلند (---) تبديل مي كند .', options),
      '۶. دو علامت منهای پی در پی را به خط کشیده کوتاه (–) و سه علامت منهای پی در پی را به خط کشیده بلند (—) تبدیل می‌کند.'
      );
    });

    it('should cleanup simple sentences #7', function () {
      assert.strictEqual(virastar.cleanup(
        '7. فاصله گذاری را تصحيح مي کند . بين هر کلمه تنها یک فاصله و بین پیشوندها و پسوندهاي مانند "مي","تر"و"ترین"  يک نيم فاصله قرار مي دهد.  بین ویرگول یا نقطه و کلمه قبل آن فاصله را حذف می کند.', options),
      '۷. فاصله گذاری را تصحیح می‌کند. بین هر کلمه تنها یک فاصله و بین پیشوندها و پسوندهای مانند «می»، «تر» و «ترین» یک نیم فاصله قرار می‌دهد. بین ویرگول یا نقطه و کلمه قبل آن فاصله را حذف می‌کند.'
      );
    });

    it('should cleanup simple sentences #8', function () {
      assert.strictEqual(virastar.cleanup(
        '8. فاصله گذاری را برای متون بین "  گیومه  " , {    آکولاد   }  , [   کروشه  ]  و ( پرانتز    ) تنظيم مي کند .', options),
      '۸. فاصله گذاری را برای متون بین «گیومه»، {آکولاد}، [کروشه] و (پرانتز) تنظیم می‌کند.'
      );
    });

    it('should cleanup simple sentences #9', function () {
      assert.strictEqual(virastar.cleanup(
        '9. علامت تعحب و سوال اضافی را حذف مي کند؟؟؟!!!!!!!', options),
      '۹. علامت تعحب و سوال اضافی را حذف می‌کند؟!'
      );
    });

    it('should replace kashidas to ndash in parenthetic', function () {
      assert.strictEqual(virastar.cleanup(
        'ـ که در واقع پدرخوانده‌ام بود ولی من او را جای پدرم می‌دانستم ـ', {}),
      '– که در واقع پدرخوانده‌ام بود ولی من او را جای پدرم می‌دانستم –'
      );
    });

    it('should not put space after dots in numbers', function () {
      assert.strictEqual(virastar.cleanup(
        'پوسته دوهزارونوزده، حداقل به نسخه وردپرس 4.7 نیاز دارد. شما نسخه %s را اجرا می کنید. لطفاً وردپرس خود را ارتقا دهید و دوباره سعی کنید.', {}),
      'پوسته دوهزارونوزده، حداقل به نسخه وردپرس ۴٫۷ نیاز دارد. شما نسخه %s را اجرا می‌کنید. لطفاً وردپرس خود را ارتقا دهید و دوباره سعی کنید.'
      );
    });

    it('should not replace sprintf directives', function () {
      assert.strictEqual(virastar.cleanup(
        'این افزونه به php نسخه "%1$s" نياز دارد. شما از نسخه (%2$s) استفاده می کنید. لطفاً پس از ارتقا دوباره تلاش کنید.', {}),
      'این افزونه به php نسخه «%1$s» نیاز دارد. شما از نسخه (%2$s) استفاده می‌کنید. لطفاً پس از ارتقا دوباره تلاش کنید.'
      );
    });

    it('should converts back html named character references', function () {
      assert.strictEqual(virastar.cleanup('&quot;گيومه های فارسي&quot;'), '«گیومه‌های فارسی»');
      assert.strictEqual(virastar.cleanup('&apos;گيومه های فارسي&apos;'), '«گیومه‌های فارسی»');
    });

    // @REF: https://github.com/aziz/virastar/blob/master/spec/virastar_spec.rb

    it('should replace Arabic kaf with its Persian equivalent', function () {
      assert.strictEqual(virastar.cleanup('ك'), 'ک');
      assert.strictEqual(virastar.cleanup('كمك'), 'کمک');
    });

    it('should replace Arabic Yeh with its Persian equivalent', function () {
      assert.strictEqual(virastar.cleanup('ي'), 'ی');
      assert.strictEqual(virastar.cleanup('بيني'), 'بینی');
    });

    it('should replace Arabic numbers with their Persian equivalent', function () {
      assert.strictEqual(virastar.cleanup('٠١٢٣٤٥٦٧٨٩'), '۰۱۲۳۴۵۶۷۸۹');
    });

    it('should replace English numbers with their Persian equivalent', function () {
      assert.strictEqual(virastar.cleanup('0123456789'), '۰۱۲۳۴۵۶۷۸۹');
    });

    it('should replace English comma and semicolon with their Persian equivalent', function () {
      assert.strictEqual(virastar.cleanup(';,'), '؛ ،');
    });

    it('should correct :;,.?! spacing (one space after and no space before)', function () {
      assert.strictEqual(virastar.cleanup('گفت : سلام'), 'گفت: سلام');
    });

    it('should replace English quotes with their Persian equivalent', function () {
      assert.strictEqual(virastar.cleanup('\'\'تست\'\''), '«تست»');
      assert.strictEqual(virastar.cleanup('\'تست\''), '«تست»');
      assert.strictEqual(virastar.cleanup('`تست`'), '«تست»');
      assert.strictEqual(virastar.cleanup('``تست``'), '«تست»');
      assert.strictEqual(virastar.cleanup('"گفت: سلام"'), '«گفت: سلام»');
      assert.strictEqual(virastar.cleanup('"این" یا "آن"'), '«این» یا «آن»'); // not greedy
    });

    it('should convert ه ی to هٔ', function () {
      assert.strictEqual(virastar.cleanup('خانه ی ما'), 'خانهٔ ما');
      assert.strictEqual(virastar.cleanup('خانه ی ما'), 'خانهٔ ما');
      assert.strictEqual(virastar.cleanup('خانه ي ما'), 'خانهٔ ما');
    });

    it('should replace double dash to ndash and triple dash to mdash', function () {
      assert.strictEqual(virastar.cleanup('--'), '–');
      assert.strictEqual(virastar.cleanup('---'), '—');
    });

    it('should replace more than one space with just a single one', function () {
      assert.strictEqual(virastar.cleanup('  سلام   جهان ،  من ویراستار هستم!'), 'سلام جهان، من ویراستار هستم!');
    });

    it('should fix spacing for () [] {}  “” «» (one space outside, no space inside)', function () {
      const templates = [
        [
          'this is%s a test%s',
          'this is %sa test%s'
        ],
        [
          'this is %s a test  %s',
          'this is %sa test%s'
        ],
        [
          'this is  %s  a test %s  yeah!',
          'this is %sa test%s yeah!'
        ],
        [
          'this is   %sa test %s  yeah!',
          'this is %sa test%s yeah!'
        ]
      ];

      // matched brackets
      const matched = [
        ['(', ')'],
        ['[', ']'],
        ['{', '}'],
        // ['“', '”'],
        ['«', '»']
      ];

      for (var pair in matched) {
        for (var str in templates) {
          assert.strictEqual(virastar.cleanup(
            sprintf(templates[str][0], matched[pair][0], matched[pair][1])),
          sprintf(templates[str][1], matched[pair][0], matched[pair][1]));
        }
      }

      // mismatched brackets
      const mismatched = [['(', ']'], ['[', ')'], ['{', '”'], ['(', '}'], ['«', ']']];
      const templates2 = [
        'mismatched brackets%s don\'t apply%s',
        'mismatched brackets %s don\'t apply %s',
        'mismatched brackets %s don\'t apply %s yeah!',
        'mismatched brackets %sdon\'t apply %s yeah!'
      ];

      for (var pair2 in mismatched) {
        for (var str2 in templates2) {
          const template = sprintf(templates2[str2], mismatched[pair2][0], mismatched[pair2][1]);
          assert.strictEqual(virastar.cleanup(template), template);
        }
      }
    });

    it('should replace English percent sign to its Persian equivalent', function () {
      assert.strictEqual(virastar.cleanup('96%'), '۹۶٪');
    });

    it('should remove spaces before and after line breaks', function () {
      assert.strictEqual(virastar.cleanup('this is \n \n \n     \n a test'), 'this is \n\na test');
      assert.strictEqual(virastar.cleanup('this is\n\n\n\na test'), 'this is\n\na test');
      assert.strictEqual(virastar.cleanup('this is \n\n\n    a test'), 'this is \n\na test');
    });

    it('should remove more that two line breaks', function () {
      assert.strictEqual(virastar.cleanup('this is \n \n \n     \n a test'), 'this is \n\na test');
      assert.strictEqual(virastar.cleanup('this is\n\n\n\na test'), 'this is\n\na test');
      assert.strictEqual(virastar.cleanup('this is \n\n\n    a test'), 'this is \n\na test');
    });

    it('should not replace line breaks and should remove spaces after line break', function () {
      assert.strictEqual(virastar.cleanup('this is \n  a test'), 'this is \na test');
    });

    it('should put zwnj between word and prefix/suffix (ha haye* tar* tarin mi* nemi*)', function () {
      assert.strictEqual(virastar.cleanup('ما می توانیم'), 'ما می‌توانیم');
      assert.strictEqual(virastar.cleanup('ما نمی توانیم'), 'ما نمی‌توانیم');
      assert.strictEqual(virastar.cleanup('این بهترین کتاب ها است'), 'این بهترین کتاب‌ها است');
      assert.strictEqual(virastar.cleanup('بزرگ تری و قدرتمند ترین زبان های دنیا'), 'بزرگ‌تری و قدرتمندترین زبان‌های دنیا');
    });

    it('should not replace English numbers in English phrases', function () {
      assert.strictEqual(virastar.cleanup(
        'عزیز ATM74 در IBM-96 085 B 95BCS'),
      'عزیز ATM74 در IBM-96 ۰۸۵ B 95BCS');
    });

    it('should not create spacing for something like (,)', function () {
      assert.strictEqual(virastar.cleanup('this is (,) comma'), 'this is (،) comma');
    });

    it('should not puts space after time colon separator', function () {
      assert.strictEqual(virastar.cleanup('12:34'), '۱۲:۳۴');
    });

    it('should not destroy URLs', function () {
      assert.strictEqual(virastar.cleanup('https://virastar.brothersincode.ir'), 'https://virastar.brothersincode.ir');
      assert.strictEqual(virastar.cleanup('https://virastar.brothersincode.ir\nhttp://twitter.com'), 'https://virastar.brothersincode.ir\nhttp://twitter.com');
    });

    it('should not replace line breaks when the line ends with quotes', function () {
      assert.strictEqual(virastar.cleanup('salam "khoobi" \n chetori'), 'salam «khoobi» \nchetori');
    });

    it('should not put space after quotes, {}, () or [] if there\'s ,.; just after that', function () {
      assert.strictEqual(virastar.cleanup(
        '«این», {این}, (این), [این] or {این}. بعضی وقت ها (این).'),
      '«این»، {این}، (این)، [این] or {این}. بعضی وقت‌ها (این).');
    });

    it('should be able to convert numbers with dashes', function () {
      assert.strictEqual(virastar.cleanup('1- salam'), '۱- salam');
    });

    it('aggressive editing', function () {
      assert.strictEqual(virastar.cleanup('salam!!!'), 'salam!');
      assert.strictEqual(virastar.cleanup('چطور؟؟؟'), 'چطور؟');
    });

    it('should remove all kashida', function () {
      assert.strictEqual(virastar.cleanup('سلامـــت'), 'سلامت');
      assert.strictEqual(virastar.cleanup('لــعل سـلـسـبیــل'), 'لعل سلسبیل');
    });

    // it('should correct wrong connections like in میشود or میدهد', function () {
    //   assert.strictEqual(virastar.cleanup(''), '');
    // });
  });

  describe('#cleanup(): Equals', function () {
    it('should preserve certain strings', function () {
      var equals = [
        '![alt name](https://example.com/media/image.jpg)',
        '[![alt name](https://example.com/media/image.jpg)](https://example.com/media/image.jpg)',
        '[![](https://example.com/media/image.jpg)](https://example.com/media/image.jpg)',
        '[![](https://example.com/media/image.jpg)](https://example.com/media/image.jpg) [![](https://example.com/media/image.jpg)](https://example.com/media/image.jpg)',
        '[![](https://upload.wikimedia.org/wikipedia/commons/0/0c/Nastaliq-proportions.jpg)](https://en.wikipedia.org/wiki/File:Nastaliq-proportions.jpg)'
      ];

      for (var equal in equals) {
        assert.strictEqual(virastar.cleanup(equals[equal]), equals[equal]);
      }
    });
  });

  describe('#cleanup(): Additional', function () {
    it('should throw error if type is not string', function () {
      assert.throws(() => virastar.cleanup(function () {}), TypeError, 'Expected a String');
      assert.throws(() => virastar.cleanup(new Error()), TypeError, 'Expected a String');
      assert.throws(() => virastar.cleanup(112), TypeError, 'Expected a String');
    });

    it('should preserve all HTML tags', function () {
      assert.strictEqual(virastar.cleanup('<strong title="نباید تغییر کند!!!!!">سلام جهان</strong>'), '<strong title="نباید تغییر کند!!!!!">سلام جهان</strong>');
    });

    it('should fix heh plus standalone hamza', function () {
      assert.strictEqual(virastar.cleanup('از غم به هر بهانهء ممكن عبور كن !'), 'از غم به هر بهانهٔ ممکن عبور کن!'); // without space
      assert.strictEqual(virastar.cleanup('از غم به هر بهانه ء ممكن عبور كن !'), 'از غم به هر بهانهٔ ممکن عبور کن!'); // with space
    });

    it('should fix heh plus hamza into ye', function () {
      assert.strictEqual(virastar.cleanup('خانه‌ٔ پدری', { fix_hamzeh: false }), 'خانه‌ی پدری');
      assert.strictEqual(virastar.cleanup('خانه ء پدری', { fix_hamzeh: false }), 'خانه‌ی پدری');
      assert.strictEqual(virastar.cleanup('خانه ي پدری', { fix_hamzeh: false }), 'خانه‌ی پدری');
      assert.strictEqual(virastar.cleanup('خانه‌ی پدری', { fix_hamzeh: false }), 'خانه‌ی پدری'); // no change
    });

    it('should convert all soft hyphens into zwnj', function () {
      assert.strictEqual(virastar.cleanup('عادت به تنهایی... این دیگر از آن حرف­هاست! '), 'عادت به تنهایی… این دیگر از آن حرف‌هاست!');
    });

    it('should normalize ellipsis', function () {
      assert.strictEqual(virastar.cleanup('...…...'), '…');
    });

    it('should normalize question/exclamation marks', function () {
      assert.strictEqual(virastar.cleanup('عادت به تنهایی... این دیگر از آن حرف­هاست!!!?'), 'عادت به تنهایی… این دیگر از آن حرف‌هاست؟!');
      assert.strictEqual(virastar.cleanup('متن فارسی؟!'), 'متن فارسی؟!');
      assert.strictEqual(virastar.cleanup('متن فارسی!؟'), 'متن فارسی؟!');
      assert.strictEqual(virastar.cleanup('متن فارسی?!'), 'متن فارسی؟!');
      assert.strictEqual(virastar.cleanup('متن فارسی!?'), 'متن فارسی؟!');
      assert.strictEqual(virastar.cleanup('؟!'), '؟!');
      assert.strictEqual(virastar.cleanup('!؟'), '؟!');
      assert.strictEqual(virastar.cleanup('?!'), '؟!');
      assert.strictEqual(virastar.cleanup('!?'), '؟!');
      assert.strictEqual(virastar.cleanup('کتاب????!!!!'), 'کتاب؟!');
      assert.strictEqual(virastar.cleanup('کتاب!!!!?????'), 'کتاب؟!');
      assert.strictEqual(virastar.cleanup('کتاب؟؟؟!!!!'), 'کتاب؟!');
      assert.strictEqual(virastar.cleanup('کتاب!!!!!!!!!؟؟؟؟؟؟؟؟'), 'کتاب؟!');
      assert.strictEqual(virastar.cleanup('کتاب!!!!!!'), 'کتاب!');
      assert.strictEqual(virastar.cleanup('کتاب؟؟؟؟'), 'کتاب؟');
      assert.strictEqual(virastar.cleanup('کتاب?????'), 'کتاب؟');
    });

    it('extra: fixSuffixSpacing()', function () {
      assert.strictEqual(virastar.cleanup('"و من هم به خاطر جلب اعتماد او پذیرفته ام"'), '«و من هم به خاطر جلب اعتماد او پذیرفته‌ام»'); // within quotes
      assert.strictEqual(virastar.cleanup('و من هم به خاطر جلب اعتماد او پذیرفته ام.'), 'و من هم به خاطر جلب اعتماد او پذیرفته‌ام.'); // followed by dot
      assert.strictEqual(virastar.cleanup('و من هم به خاطر جلب اعتماد او پذیرفته ام!'), 'و من هم به خاطر جلب اعتماد او پذیرفته‌ام!'); // followed by exclamation
      assert.strictEqual(virastar.cleanup('و من هم به خاطر جلب اعتماد او پذیرفته ام؟'), 'و من هم به خاطر جلب اعتماد او پذیرفته‌ام؟'); // followed by question
      assert.strictEqual(virastar.cleanup('و من هم به خاطر جلب اعتماد او پذیرفته ام'), 'و من هم به خاطر جلب اعتماد او پذیرفته‌ام'); // as last word (with the help of padding)

      assert.strictEqual(virastar.cleanup('و به چلو ماهی و باسلوق و مترادف کرده ایم، محض خالی نبودن عریضه دیوان حافظ را هم تنگش زده ایم. سوءتفاهم نشود.'), 'و به چلو ماهی و باسلوق و مترادف کرده‌ایم، محض خالی نبودن عریضه دیوان حافظ را هم تنگش زده‌ایم. سوءتفاهم نشود.');
      assert.strictEqual(virastar.cleanup('عرضم این است که ما در بیداری نیز خود را فریب می دهیم و به شکم چرانی مان صبغه فرهیختگی می زنیم.'), 'عرضم این است که ما در بیداری نیز خود را فریب می‌دهیم و به شکم چرانی‌مان صبغه فرهیختگی می‌زنیم.');
      assert.strictEqual(virastar.cleanup('به خواب های تان دقت کنید.'), 'به خواب‌های‌تان دقت کنید.');
    });

    it('extra: fixSuffixMisc()', function () {
      assert.strictEqual(virastar.cleanup('خانه‌يی بر روی آب'), 'خانه‌ای بر روی آب');
      assert.strictEqual(virastar.cleanup('خانه‌ئی بر روی آب'), 'خانه‌ای بر روی آب');
      assert.strictEqual(virastar.cleanup('خانه‌یی بر روی آب'), 'خانه‌ای بر روی آب');
    });

    it('extra: fixDiacritics():‌ cleans more than one diacritic characters', function () {
      assert.strictEqual(virastar.cleanup('لطفاًً'), 'لطفاً');
    });

    it('extra: fixNumeralSymbols(): replaces english percent signs', function () {
      assert.strictEqual(virastar.cleanup('۹۶%'), '۹۶٪');
    });

    it('extra: fixNumeralSymbols(): replaces dots between numbers into decimal separator', function () {
      assert.strictEqual(virastar.cleanup('۱۲.۵۶'), '۱۲٫۵۶');
    });

    it('extra: fixNumeralSymbols(): replaces commas between numbers into thousands separator', function () {
      assert.strictEqual(virastar.cleanup('۱۲,۵۴۳'), '۱۲٬۵۴۳');
    });

    it('extra: cleanupKashidas(): converts kashida between numbers to ndash', function () {
      assert.strictEqual(virastar.cleanup('۱۱ـ۲۳'), '۱۱–۲۳');
    });

    it('extra: kashidasAsParenthetic(): replaces kashidas to ndash in parenthetic', function () {
      assert.strictEqual(virastar.cleanup('ـکه همواره به فتوحات پادشاهان خویش در هند می‌بالیمـ'), '–که همواره به فتوحات پادشاهان خویش در هند می‌بالیم–');
      assert.strictEqual(virastar.cleanup('ما مردم افغانستان ـکه همواره به فتوحات پادشاهان خویش در هند می‌بالیمـ شاید حالا که دو دهه رنج تهاجم بیگانگان را چشیده‌ایم‌، بتوانیم درد و رنج مردم هند را در دوران لشکرکشی‌های اجدادمان دریابیم‌.'),
        'ما مردم افغانستان –که همواره به فتوحات پادشاهان خویش در هند می‌بالیم– شاید حالا که دو دهه رنج تهاجم بیگانگان را چشیده‌ایم، بتوانیم درد و رنج مردم هند را در دوران لشکرکشی‌های اجدادمان دریابیم.');
    });

    it('extra: fixHamzehArabic(): converts arabic hamza', function () {
      assert.strictEqual(virastar.cleanup('آن دسته از علایم که مشخص‌کنندة انتهای جمله', { fix_hamzeh_arabic: true }), 'آن دسته از علایم که مشخص‌کنندهٔ انتهای جمله');
      assert.strictEqual(virastar.cleanup('آن دسته از علایم که مشخص‌کنندة انتهای جمله', { fix_hamzeh_arabic: true, fix_hamzeh: false }), 'آن دسته از علایم که مشخص‌کننده‌ی انتهای جمله');
    });

    it('extra: fixThreeDots(): removes space between dots/replaces three dots with ellipsis character', function () {
      assert.strictEqual(virastar.cleanup('...'), '…');
      assert.strictEqual(virastar.cleanup('......'), '…');
      assert.strictEqual(virastar.cleanup('. . . .   ...   ..... . . . .'), '…');
      assert.strictEqual(virastar.cleanup('خداحافظ ... به به'), 'خداحافظ… به به');
    });

    it('extra: normalizeDates(): reorders date parts with slash as delimiter', function () {
      assert.strictEqual(virastar.cleanup('23/10/1355'), '۱۳۵۵/۱۰/۲۳');
      assert.strictEqual(virastar.cleanup('3/1/1355'), '۱۳۵۵/۱/۳');
    });

    it('extra: removeDiacritics(): removes all diacritic characters', function () {
      assert.strictEqual(virastar.cleanup('اذا عَمَّتِ الْبُلْدانَ الْفِتَنُ فَعَلَیکمْ بِقُمْ وَحَوالیها وَنَواحیها فَانَ الْبَلاءَ مَدْفُوعٌ عَنْها', { remove_diacritics: true }), 'اذا عمت البلدان الفتن فعلیکم بقم وحوالیها ونواحیها فان البلاء مدفوع عنها');
    });
  });
});
