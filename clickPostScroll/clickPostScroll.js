// $peace.clickPostScroll.anchors - {} - Anchor elements
// $peace.clickPostScroll.VALIDATE_SCROLLING_INTERVAL_MS - Number - In ms how much time to wait to see if we are still scrolling or not
// $peace.clickPostScroll.bind(Element) - Function - Bind element to click after scroll is complete
$extendPeace({
  clickPostScroll: {
    anchors: {},
    VALIDATE_SCROLLING_INTERVAL_MS: 333,
    bind (element) {
      if ($peace.clickPostScroll.anchors[element.hash]) { // if anchors is already stored -> increment anchor count
        $peace.clickPostScroll.anchors[element.hash].clickCount++
      } else { // if anchor is not stored -> initialize anchor in storage
        $peace.clickPostScroll.anchors[element.hash] = { timer: null, clickCount: 1 }
      }
    
      const anchor = $peace.clickPostScroll.anchors[element.hash]
    
      switch (anchor.clickCount) {
        case 1:
          Object.values($peace.clickPostScroll.anchors).forEach(a => { // loop anchors -> clear all timers
            window.clearInterval(a.timer)
          })
    
          anchor.timer = window.setInterval(() => {
            if (!$peace.isScrolling.flag) { // if page is no longer scrolling
              window.clearInterval(anchor.timer) // stop the interval that checks if page is scrolling
              element.click()
            }
          }, $peace.clickPostScroll.VALIDATE_SCROLLING_INTERVAL_MS)
          break;
        case 2: // if this is the second time we've click the element -> reset clickCount
          anchor.clickCount = 0
          break;
      }
    }
  }
})
