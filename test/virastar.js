/* global describe, it */

var assert = require('assert');
var Virastar = require('../lib/virastar.js');

describe('Virastar.js', function () {
  var virastar;
  var options = {
    skip_markdown_ordered_lists_numbers_conversion: false,
    preserve_brackets: false,
    preserve_braces: false
  };

  it('should create new instance', function () {
    virastar = new Virastar();
  });

  describe('#cleanup()', function () {
    it('should cleanup simple sentences', function () {
      assert.strictEqual(virastar.cleanup(
        'ويراستار به شما كمك مي كند تا متون فارسي زيبا تر و درست تري بنويسيد .', options),
      'ویراستار به شما کمک می‌کند تا متون فارسی زیبا‌تر و درست‌تری بنویسید.'
      );

      assert.strictEqual(virastar.cleanup(
        'ويراستار به طور پيش فرض اين کار ها را انجام می دهد :', options),
      'ویراستار به طور پیش فرض این کار‌ها را انجام می‌دهد:'
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
      'پوسته دوهزارونوزده، حداقل به نسخه وردپرس ۴.۷ نیاز دارد. شما نسخه %s را اجرا می‌کنید. لطفاً وردپرس خود را ارتقا دهید و دوباره سعی کنید.'
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
  });
});
