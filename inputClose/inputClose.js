// option  > $peace.inputClose.INPUT_ATTR
// option  > $peace.inputClose.CLOSE_ATTR
// option  > $peace.inputClose.BOUND_ATTR
// creates > $peace.inputClose.INPUTS
// creates > $peace.inputClose.CLOSES
(function () {
  $extendPeace({
    inputClose: {
      INPUT_ATTR: 'data-peace--input-close--input',
      CLOSE_ATTR: 'data-peace--input-close--close',
      BOUND_ATTR: 'data-peace--input-close--bound',
    }
  })

  $peace.inputClose.INPUTS = document.querySelectorAll(`[${ $peace.inputClose.INPUT_ATTR }]`)

  if ($peace.inputClose.INPUTS.length) {
    $peace.inputClose.CLOSES = document.querySelectorAll(`[${ $peace.inputClose.CLOSE_ATTR }]`)

    for (var input of $peace.inputClose.INPUTS) {
      if (!input.getAttribute($peace.inputClose.BOUND_ATTR)) {
        const value = input.getAttribute($peace.inputClose.INPUT_ATTR)

        if (value.length) {
          var close

          for (var e of $peace.inputClose.CLOSES) {
            if (e.getAttribute($peace.inputClose.CLOSE_ATTR) === value && !e.getAttribute($peace.inputClose.BOUND_ATTR)) {
              close = e
              break;
            }
          }

          if (close) {
            setCloseVisibility({ input, close })
            bindInputListener({ input, close })
            bindCloseListener({ input, close })
            indicateBound({ input, close })
          } else {
            throw new InputCloseException(input, `Please add attribute ${ $peace.inputClose.INPUT_ATTR } to an input and ${ $peace.inputClose.CLOSE_ATTR } to an element with values that match`)
          }
        } else {
          throw new InputCloseException(input, `Please add a value to attribute ${ $peace.inputClose.INPUT_ATTR }`)
        }
      }
    }
  }

  function InputCloseException (input, message) {
    this.input = input
    this.message = message
    this.docsUrl = $peace.GIT_URL
  }

  function setCloseVisibility ({ input, close, value }) {
    close.style.visibility = (value || input.value).length ? 'visible' : 'hidden'
  }

  function bindInputListener ({ input, close }) {
    input.addEventListener('input', function () {
      setCloseVisibility({ input, close, value: this.value })
    })
  }

  function bindCloseListener ({ input, close }) {
    close.addEventListener('click', function () {
      input.value = ''
      setCloseVisibility({ input, close })
      input.focus()
    })
  }

  function indicateBound ({ input, close }) {
    input.setAttribute($peace.inputClose.BOUND_ATTR, 'true')
    close.setAttribute($peace.inputClose.BOUND_ATTR, 'true')
  }
})()
