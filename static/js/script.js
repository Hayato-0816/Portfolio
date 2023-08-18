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

            setTimeout(function() {
                $(".hero-content").css("filter", "grayscale(0)");
                $(".hero-content").css("color", "#f0f0f0");
            }, 5000);

            // セッションストレージにフラグをセット
            sessionStorage.setItem(sessionKey, true);
        });
    } else {
        // セッションストレージにフラグがある場合は非表示にする
        $("#loading").css("display", "none");
        $("#loading p").css("display", "none");

        setTimeout(function() {
            $(".hero-content").css("filter", "grayscale(0)");
            $(".hero-content").css("color", "#f0f0f0");
        }, 1000);
    }

    var content_length = $('.cont').length;
    var content_H = $('.cont').outerHeight(true);
    var main_H = $('#main_cont').outerHeight(true);
    if ($('body').outerWidth()<=767) {
        $('#main_cont').css("height", (content_H+10) * content_length + 40 + "px");
        $('main').css("height", main_H + 120 + "px");
    } else if ($('body').outerWidth()>767 & $('body').outerWidth()<=1203) {
        $('#main_cont').css("height", (content_H+10) * content_length + 40 + "px");
        $('main').css("height", main_H + 460 + "px");
    } else if ($('body').outerWidth()>1203) {
        $('#main_cont').css("height", (content_H+10) * content_length + 120 + "px");
        $('main').css("height", main_H + 600 + "px");
    }

    var project_H = $('.project').outerHeight(true);
    var content_menu_H = $('#content_menu').outerHeight(true);
    if ($('body').outerWidth()<=767) {
        $('#content_menu').css("height", (project_H+10) + 40 + "px");
        $('main').css("height", content_menu_H + 400 + "px");
    } else if ($('body').outerWidth()>767 & $('body').outerWidth()<=1203) {
        $('#content_menu').css("height", (project_H+10) + 40 + "px");
        $('main').css("height", content_menu_H + 160 + "px");
    } else if ($('body').outerWidth()>1203) {
        $('#content_menu').css("height", (project_H+10) + 120 + "px");
        $('main').css("height", content_menu_H + 400 + "px");
    }

    $('#page-top a').click(function() {
        $('body,html').animate({
            scrollTop: 0 // ページトップまでスクロール
        }); // ページトップスクロールの速さ。数字が大きいほど遅くなる
        return false; // リンク自体の無効化
    });
});

$(window).resize(function(){
    var content_length = $('.cont').length;
    var content_H = $('.cont').outerHeight(true);
    var main_H = $('#main_cont').outerHeight(true);
    if ($('body').outerWidth()<=767) {
        $('#main_cont').css("height", (content_H+10) * content_length + 40 + "px");
        $('main').css("height", main_H + 120 + "px");
    } else if ($('body').outerWidth()>767 & $('body').outerWidth()<=1203) {
        $('#main_cont').css("height", (content_H+10) * content_length + 40 + "px");
        $('main').css("height", main_H + 460 + "px");
    } else if ($('body').outerWidth()>1203) {
        $('#main_cont').css("height", (content_H+10) * content_length + 120 + "px");
        $('main').css("height", main_H + 600 + "px");
    }
});

$(document).ready(function() {
    var modals = $(".modal");
    var btns = $(".openModalBtn");
    var closeBtns = $(".close");
  
    btns.click(function() {
      var modalId = $(this).data("modal");
      $("#" + modalId).css("display", "block");
    });
  
    closeBtns.click(function() {
      modals.css("display", "none");
    });
  
    $(window).click(function(event) {
      if (event.target.classList.contains("modal")) {
        modals.css("display", "none");
      }
    });
});

$(document).ready(function() {
    var modal = $("#myModal");
    var btn = $("#openModalBtn");
    var closeBtn = $(".close");
  
    btn.click(function() {
      modal.css("display", "block");
    });
  
    closeBtn.click(function() {
      modal.css("display", "none");
    });
  
    $(window).click(function(event) {
      if (event.target === modal[0]) {
        modal.css("display", "none");
      }
    });
  });
  