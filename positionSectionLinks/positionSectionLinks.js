// $peace.scrollTop.get() - Dependency - Provides current scrollTop
(function () {
  $extendPeace({
    positionSectionLinks: {
      MIN_GUTTER_SIZE: 170,
      TOO_SMALL_AT_TOP: 1111,
      GUTTER_LEFT_RIGHT_PADDING: 40,
      GUTTER_TOP_QUERY: '.content .w-row',
      LIST_ID: 'peace--section-links--list',
      TOGGLE_ID: 'peace--section-links--toggle-button',
      LINKS_WRAPPER_ID: 'peace--section-links--wrapper',
      TOGGLE_SHOW_TEXT: 'Show',
      TOGGLE_HIDE_TEXT: 'Hide',
      BOTTOM_HIDDEN_CLASS: 'peace--section-links--bottom-hidden',
      BOTTOM_VISIBLE_CLASS: 'peace--section-links--bottom-visible',
      LIST_TOP_MAX_HEIGHT: '215px',
      LIST_GUTTER_MAX_HEIGHT: 'calc(100vh - 180px)',
      LIST_BOTTOM_MAX_HEIGHT: 'calc(100vh - 114px)',
      LINKS_WRAPPER_BOTTOM_MAX_WIDTH: 'calc(100vw - 40px)',
    }
  })

  const list = document.getElementById($peace.positionSectionLinks.LIST_ID)
  const toggleBtn = document.getElementById($peace.positionSectionLinks.TOGGLE_ID)
  const linksWrapper = document.getElementById($peace.positionSectionLinks.LINKS_WRAPPER_ID)
  const topOfGutterElement = document.querySelector($peace.positionSectionLinks.GUTTER_TOP_QUERY)

  function positionSectionLinks() {
    if (isScrollInGutter()) { // scroll is in gutter
      const gutterSize = topOfGutterElement.getBoundingClientRect().left

      if (gutterSize > $peace.positionSectionLinks.MIN_GUTTER_SIZE) { // gutter is wide enough
        linksWrapper.style.maxWidth = String(gutterSize - $peace.positionSectionLinks.GUTTER_LEFT_RIGHT_PADDING) + 'px'
        list.style.maxHeight = $peace.positionSectionLinks.LIST_GUTTER_MAX_HEIGHT
        linksWrapper.classList.remove($peace.positionSectionLinks.BOTTOM_HIDDEN_CLASS)
        linksWrapper.classList.remove($peace.positionSectionLinks.BOTTOM_VISIBLE_CLASS)
        toggleBtn.style.display = 'none'
      } else { // gutter is too small
        positionSectionLinksAtBottom()
      }
    } else { // scroll is at top
      if (window.innerWidth < $peace.positionSectionLinks.TOO_SMALL_AT_TOP) { // window is too small
        positionSectionLinksAtBottom()
      } else {
        linksWrapper.style.maxWidth = ''
        toggleBtn.style.display = 'none'
        list.style.maxHeight = $peace.positionSectionLinks.LIST_TOP_MAX_HEIGHT
        linksWrapper.classList.remove($peace.positionSectionLinks.BOTTOM_HIDDEN_CLASS)
        linksWrapper.classList.remove($peace.positionSectionLinks.BOTTOM_VISIBLE_CLASS)
      }
    }
  }

  function positionSectionLinksAtBottom () {
    toggleBtn.style.display = 'block'
    list.style.maxHeight = $peace.positionSectionLinks.LIST_BOTTOM_MAX_HEIGHT
    linksWrapper.classList.add($peace.positionSectionLinks.BOTTOM_HIDDEN_CLASS)
    linksWrapper.style.maxWidth = $peace.positionSectionLinks.LINKS_WRAPPER_BOTTOM_MAX_WIDTH
    toggleBtn.innerText = linksWrapper.classList.contains($peace.positionSectionLinks.BOTTOM_VISIBLE_CLASS) ?
      $peace.positionSectionLinks.TOGGLE_HIDE_TEXT :
      $peace.positionSectionLinks.TOGGLE_SHOW_TEXT
  }

  function isScrollInGutter () {
    const SCROLL_TOP = $peace.scrollTop.get()

    if (SCROLL_TOP) {
      const LINKS_WRAPPER_BOTTOM = SCROLL_TOP + linksWrapper.getBoundingClientRect().bottom
      const IS_IN_GUTTER = LINKS_WRAPPER_BOTTOM > SCROLL_TOP + topOfGutterElement.getBoundingClientRect().top

      return IS_IN_GUTTER
    } else {
      return false
    }
  }

  if (linksWrapper) {
    document.addEventListener('scroll', positionSectionLinks)
    window.addEventListener('resize', positionSectionLinks)

    positionSectionLinks()
    linksWrapper.style.opacity = '100%'
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      if (linksWrapper.classList.contains($peace.positionSectionLinks.BOTTOM_VISIBLE_CLASS)) { // slidden up atm -> so slide down
        linksWrapper.classList.remove($peace.positionSectionLinks.BOTTOM_VISIBLE_CLASS)
        toggleBtn.innerText = $peace.positionSectionLinks.TOGGLE_SHOW_TEXT
      } else { // slidden down atm -> so slide up
        linksWrapper.classList.add($peace.positionSectionLinks.BOTTOM_VISIBLE_CLASS)
        toggleBtn.innerText = $peace.positionSectionLinks.TOGGLE_HIDE_TEXT
      }
    }, false)
  }
})()
