$(function () {
  var heroVideo = document.querySelector(".hero-screen__bg-video");
  if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.defaultMuted = true;

    var tryPlay = function () {
      var playPromise = heroVideo.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(function () {});
      }
    };

    heroVideo.addEventListener("loadeddata", tryPlay, { once: true });
    tryPlay();
  }

  var $hero = $(".hero-screen");
  var $menuButton = $(".hero-screen__menu");
  var $drawer = $(".hero-screen__drawer");
  var $drawerClose = $(".hero-screen__drawer-close");
  var $overlay = $(".hero-screen__overlay");

  var setMenuState = function (isOpen) {
    $hero.toggleClass("is-menu-open", isOpen);
    $menuButton.attr("aria-expanded", String(isOpen));
    $overlay.prop("hidden", !isOpen);
  };

  $menuButton.on("click", function () {
    setMenuState(!$hero.hasClass("is-menu-open"));
  });

  $overlay.on("click", function () {
    setMenuState(false);
  });

  $drawerClose.on("click", function () {
    setMenuState(false);
  });

  $(document).on("keydown", function (event) {
    if (event.key === "Escape") {
      setMenuState(false);
    }
  });

  $('.hero-screen__drawer a[href^="#"], .footer a[href^="#"], .button[href^="#"]').on("click", function () {
    setMenuState(false);
  });
});
