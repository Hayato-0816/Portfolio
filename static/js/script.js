$(function(){
    // $(window).on('load',function(){
    //     $("#loading").delay(1500).fadeOut('slow');//ローディング画面を1.5秒（1500ms）待機してからフェードアウト
    //     $("#loading p").delay(1200).fadeOut('slow');//ロゴを1.2秒（1200ms）待機してからフェードアウト
    //   });

    var portfolio_length = $('.portfolio-item').length;
    var portfolio_H = $('.portfolio-item').outerHeight();
    $('#projects').css("height",portfolio_H*portfolio_length+114+"px");

    function contact_fade(){
        var page_top = $(window).height();
        var scroll_top = $(window).scrollTop();
        var contact_y = $('#contact').offset().top;
        if (page_top+scroll_top >= contact_y+500) {
            $('header').fadeOut();
            $('#page_top').fadeIn().css('display','block');
        } else if (page_top+scroll_top <= contact_y+500) {
            $('header').fadeIn(1000);
            $('#page_top').fadeOut();
        }
    }
    $(window).scroll(function () {
        contact_fade();
      });

    $('#page-top a').click(function () {
        $('body,html').animate({
            scrollTop: 0//ページトップまでスクロール
        });//ページトップスクロールの速さ。数字が大きいほど遅くなる
        return false;//リンク自体の無効化
    });
})