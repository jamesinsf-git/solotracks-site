/**
 * Lazy video playback for the SoloTracks landing page.
 *
 * - Feature videos use preload="none", so bytes aren't fetched until needed.
 * - When a video scrolls into view we play() it; when it leaves we pause() to
 *   save battery and bandwidth.
 * - Respects prefers-reduced-motion: those users see only the poster frame and
 *   the videos never play or download.
 * - Falls back gracefully without IntersectionObserver (posters simply stay).
 */
(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;
  if (!('IntersectionObserver' in window)) return;

  var videos = document.querySelectorAll('.lazy-video');
  if (!videos.length) return;

  var obs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        var video = entry.target;
        if (entry.isIntersecting) {
          var p = video.play();
          if (p && typeof p.catch === 'function') p.catch(function () {});
        } else {
          video.pause();
        }
      });
    },
    { threshold: 0.4 }
  );

  videos.forEach(function (v) { obs.observe(v); });
})();
