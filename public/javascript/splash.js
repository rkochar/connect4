function openFullscreen() {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) { /* Firefox */
        document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        document.documentElement.webkitRequestFullscreen().catch(err => Promise.resolve(err));
    } else if (document.documentElement.msRequestFullscreen) { /* IE/Edge */
        document.documentElement.msRequestFullscreen();
    }
}

 function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen().catch(err => Promise.resolve(err));
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }

  async function checkScreen() {
    var screenHeight = $(window).win.height()
    var screenWidth = $(window).width()

    var browserHeight = $(document).height();
    var browserWidth = $(document).width();

    if (screenHeight - browserHeight === 0 || screenWidth - browserWidth === 0) {
      window.alert("Fullscreen is recommended")
    }
  }