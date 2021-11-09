// $peace.isScrolling.POST_SCROLL_WAIT_MS - Number - How many ms after scroll has started to validate if still scrolling
// $peace.isScrolling.flag - Boolean - True if scrolling
(function () {
  $extendPeace({
    isScrolling: {
      flag: false,
      POST_SCROLL_WAIT_MS: 333
    }
  })

  let timer

  document.addEventListener('scroll', () => { // on scroll
    $peace.isScrolling.flag = true // we are scrolling

    if (timer) window.clearTimeout(timer) // if timer -> clear it

    timer = window.setTimeout(() => { // timeout called if scroll hasn't happened POST_SCROLL_WAIT_MS after last check
      $peace.isScrolling.flag = false // not currently scrollling
    }, $peace.isScrolling.POST_SCROLL_WAIT_MS)
  })
})()
