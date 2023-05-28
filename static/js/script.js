$(function(){
    // $(window).on('load',function(){
    //     $("#loading").delay(1500).fadeOut('slow');//ローディング画面を1.5秒（1500ms）待機してからフェードアウト
    //     $("#loading p").delay(1200).fadeOut('slow');//ロゴを1.2秒（1200ms）待機してからフェードアウト
    //   });

    var portfolio_length = $('.portfolio-item').length;
    var portfolio_H = $('.portfolio-item').outerHeight();
    $('#projects').css("height",portfolio_H*portfolio_length+146+"px");

    $('#page-top a').click(function () {
        $('body,html').animate({
            scrollTop: 0//ページトップまでスクロール
        });//ページトップスクロールの速さ。数字が大きいほど遅くなる
        return false;//リンク自体の無効化
    });

});