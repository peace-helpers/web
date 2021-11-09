// $peace.urlQueryParams.get() -> Function -> Provides url query params as an Object
$extendPeace({
  urlQueryParams: {
    get () {
      return Object.fromEntries((new URLSearchParams(window.location.search)).entries())
    }
  }
})
