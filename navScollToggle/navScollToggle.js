// $peace.navScollToggle.NAV_ID -> String -> DOM id of the nav element
// $peace.navScollToggle.HIDE_CLASS -> String -> DOM class to give to nav element when hidding
// $peace.navScollToggle.nav -> Element -> DOM nav element
// $peace.scrollTop.get() - Dependency - Provides current scrollTop
(function () {
  $extendPeace({
    navScollToggle: {
      NAV_ID: 'nav',
      HIDE_CLASS: 'nav-hide'
    }
  })

  var scrollTop = 0, lastScrollTop = 0

  if (!$peace.navScollToggle.nav && $peace.navScollToggle.NAV_ID) {
    $peace.navScollToggle.nav = document.getElementById($peace.navScollToggle.NAV_ID)
  }

  window.addEventListener('scroll', () => {
    scrollTop = $peace.scrollTop.get()

    if (scrollTop > lastScrollTop) { // if scrolling down
      if (!nav.classList.contains($peace.navScollToggle.HIDE_CLASS)) nav.classList.add($peace.navScollToggle.HIDE_CLASS) // if nav visible -> hide nav
    } else if (!$peace.isTouchingDown.flag && nav.classList.contains($peace.navScollToggle.HIDE_CLASS)) { // scrolling up && not touching down && nav is hidden
      nav.classList.remove($peace.navScollToggle.HIDE_CLASS) // show nav
    }

    lastScrollTop = scrollTop < 0 ? 0 : scrollTop // for touch screens w/ bounce / negative scrollTop feature
  })
})()
