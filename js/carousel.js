$(document).ready(function () {

  var owl = $('.most_popular .owl-carousel');
  owl.owlCarousel({
    stagePadding: 40,
    margin: 20,
    loop: true,
    responsive: {
      1440: { items: 5.5, center: true }
    }
  })

    var owl = $('.refill .owl-carousel');
  owl.owlCarousel({
    stagePadding: 40,
    margin: 20,
    loop: true,
    responsive: {
      1440: { items: 5.5, center: true }
    }
  })



  $(function ($) {
    const EVENTS = "initialized.owl.carousel refreshed.owl.carousel resized.owl.carousel changed.owl.carousel translated.owl.carousel";

    function fadeSpecificEdges($carousel) {
      // 원본 아이템 우선으로 선택 (클론 무시)
      const $itemsAll = $carousel.find(".owl-item");
      const $items = $carousel.find(".owl-item:not(.cloned)");
      const $active = $carousel.find(".owl-item.active");

      // 초기화
      $itemsAll.removeClass("faded-edge");

      if ($active.length === 0) return;

      // 1) active 집합의 '첫 요소' 바로 이전 아이템(원본 우선)
      // prevAll('.owl-item:not(.cloned)').first()를 사용해 클론이 아닌 실제 아이템을 우선 찾음
      let $before = $active.first().prevAll('.owl-item:not(.cloned)').first();
      if (!$before.length) {
        // 위에서 못 찾으면(예: 모두 클론이거나 맨 앞일 때) prev 전체에서 첫 prev 시도
        $before = $active.first().prev('.owl-item');
      }
      if (!$before.length) {
        // 그래도 없으면 (안전장치) 리스트의 마지막 원본 아이템을 사용
        $before = $items.length ? $items.last() : $itemsAll.last();
      }

      // 2) active 집합의 마지막 요소
      let $lastActive = $active.last();

      // 적용
      $before.addClass("faded-edge");
      $lastActive.addClass("faded-edge");
    }

    $(document).on(EVENTS, ".owl-carousel", function () {
      const $carousel = $(this);
      if (window.requestAnimationFrame) {
        requestAnimationFrame(() => fadeSpecificEdges($carousel));
      } else {
        setTimeout(() => fadeSpecificEdges($carousel), 0);
      }
    });

    // 이미 초기화된 캐러셀에도 1회 적용
    $(function () {
      $(".owl-carousel.owl-loaded").each(function () {
        fadeSpecificEdges($(this));
      });
    });
  });




});
