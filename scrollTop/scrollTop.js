// $peace.scrollTop.get() -> Function -> Returns the current scroll top
$extendPeace({
  scrollTop: {
    get () {
      return window.scrollY || window.pageYOffset || document.body.scrollTop + (document.documentElement && document.documentElement.scrollTop || 0)
    }
  }
})
