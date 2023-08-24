//#region typing animation
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
//#endregion

$(function() {
//#region typing animation
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
//#endregion

//#region scroll top
    $('#page-top a').click(function() {
        $('body,html').animate({
            scrollTop: 0 // ページトップまでスクロール
        }); // ページトップスクロールの速さ。数字が大きいほど遅くなる
        return false; // リンク自体の無効化
    });
//#endregion

//#region modal window
    $(".openModalBtn").click(function() {
        var PosY = $(window).scrollTop();
		var Link = $(this).attr('href');
		
		// スクロール値を代入
		$('body').addClass('Fixed').css({'top': (-PosY) + 'px'});
		$.cookie('ModalPos', PosY, {path:'/'});
				
		// iframeを読み込む
		$('main').append('<section id="ModalWindow"></section>');
		$('#ModalWindow').html('<div id="Loading"></div><iframe src="' + Link + '" frameborder="0" marginWidth="0" marginHeight="0" scrolling="auto"></iframe>').fadeIn(300);
		// $('#ModalWindow iframe').css({
		// 	'width': $(window).width() - 40,
		// 	'height': $(window).height() - 40
		// 	});
		
		// 表示外領域をクリックしたら
		$('#ModalWindow').click(function(){
			$('body').removeClass('Fixed');
			$(window).scrollTop(PosY);
			
			$(this).fadeOut(300, function(){
				$.cookie('ModalPos','', {path:'/' , expires:-1});
				$(this).remove();
				});
			});
			
		return false;
    });
  
    // $(".close").click(function() {
    //     // クリックしたモーダルを非表示にする
    //     modals.hide();
    // });
  
    // $(window).click(function(event) {
    //     // クリックした要素がモーダルの場合、非表示にする
    //     if (event.target.classList.contains("modal")) {
    //         modals.hide();
    //     }
    // });

//#endregion
});


//#region content hight
var content_length = $('.cont').length;
var content_H = $('.cont').outerHeight(true);

$(function() {
    // load時に処理
    var win_width = $(window).innerWidth();

    if (win_width <= 750) {
        $('#works').css("height", ((content_H + 20) * content_length) + 40 + "px");
        $('main').css("height", $('#works').outerHeight(true) + 120 + "px");
    } else if (win_width > 750 && win_width <= 1185) {
        $('#works').css("height", ((content_H + 10) * content_length) + 40 + "px");
        $('main').css("height", $('#works').outerHeight(true) + 470 + "px");
    } else if (win_width > 1185) {
        $('#works').css("height", ((content_H) * Math.ceil(content_length / 3)) + 102 + "px");
        console.log(Math.ceil(content_length/3))
        $('main').css("height", $('#works').outerHeight(true) + 610 + "px");
    }
});

$(window).resize(function() {
    // resize時に処理
    var win_width = $(this).innerWidth();

    if (win_width <= 750) {
        $('#works').css("height", ((content_H + 20) * content_length) + 40 + "px");
        $('main').css("height", $('#works').outerHeight(true) + 120 + "px");
    } else if (win_width > 750 && win_width <= 1185) {
        $('#works').css("height", ((content_H + 10) * content_length) + 40 + "px");
        $('main').css("height", $('#works').outerHeight(true) + 470 + "px");
    } else if (win_width > 1185) {
        $('#works').css("height", ((content_H) * Math.ceil(content_length / 3)) + 102 + "px");
        console.log(Math.ceil(content_length/3))
        $('main').css("height", $('#works').outerHeight(true) + 610 + "px");
    }
});
//#endregion