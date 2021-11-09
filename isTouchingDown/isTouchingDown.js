// $peace.isTouchingDown - Boolean - Sets true on touchstart & false on touchend
$extendPeace({
  isTouchingDown: {
    flag: false
  }
})

window.addEventListener('touchstart', () => {
  $peace.isTouchingDown.flag = true
})

window.addEventListener('touchend', () => {
  $peace.isTouchingDown.flag = false
})
