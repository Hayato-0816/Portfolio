function TextTypingAnime() {
    // 'loading'要素内の各 'p' 要素に対して処理を行う
    $('#loading p').each(function() {
        var elemPos = $(this).offset().top - 50; // 要素の位置を取得
        var scroll = $(window).scrollTop(); // スクロール位置を取得
        var windowHeight = $(window).height(); // ウィンドウの高さを取得
        var thisChild = "";

        if (scroll >= elemPos - windowHeight) {
            // 要素が画面内に表示されている場合
            thisChild = $(this).children();
            thisChild.each(function(i) {
                var time = 150; // アニメーションの遅延時間
                $(this).delay(time * i).fadeIn(time); // 子要素を順番にフェードイン
            });
        } else {
            // 要素が画面外にある場合
            thisChild = $(this).children();
            thisChild.each(function() {
                $(this).stop();
                $(this).css("display", "none"); // 子要素を非表示にする
            });
        }
    });
}

$(function() {
    var ref = document.referrer; // リファラ情報を得る
    var hereHost = window.location.hostname; // 現在ページのホスト(ドメイン)名を得る

    var sStr = "^https?://" + hereHost; // ホスト名が含まれるか探す正規表現を作成
    var rExp = new RegExp(sStr, "i");

    var sessionKey = 'firstVisitFlag'; // セッションストレージに保存しているフラグのキー

    if (!ref.match(rExp) && !sessionStorage.getItem(sessionKey)) {
        // アクセス元がサイト外かつセッションストレージにフラグがない場合の処理
        $(window).on('load', function() {
            var element = $("#loading p");
            element.each(function() {
                var text = $(this).html();
                var textbox = "";
                text.split('').forEach(function(t) {
                    if (t !== " ") {
                        textbox += '<span>' + t + '</span>';
                        $(element).css("display", "block");
                    } else {
                        textbox += t;
                    }
                });
                $(this).html(textbox);
            });

            TextTypingAnime(); // タイピングアニメーションの実行

            $("#loading").delay(4000).fadeOut('slow'); // ローディング要素をフェードアウト
            $("#loading p").delay(4000).fadeOut('slow'); // ローディング要素内の 'p' 要素をフェードアウト

            // セッションストレージにフラグをセット
            sessionStorage.setItem(sessionKey, true);
        });
    } else {
        // セッションストレージにフラグがある場合は非表示にする
        $("#loading").css("display", "none");
        $("#loading p").css("display", "none");
    }

    var portfolio_length = $('.portfolio-item').length;
    var portfolio_H = $('.portfolio-item').outerHeight();
    $('#projects').css("height", portfolio_H * portfolio_length + 146 + "px");

    $('#page-top a').click(function() {
        $('body,html').animate({
            scrollTop: 0 // ページトップまでスクロール
        }); // ページトップスクロールの速さ。数字が大きいほど遅くなる
        return false; // リンク自体の無効化
    });
});
