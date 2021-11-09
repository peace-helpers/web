// $peace.formSubmit.FN_NAME_ATTRIBUTE -> String -> Attribute of form element that, Attribute value is the name of the function to call
// $peace.formSubmit.forms -> Array -> The forms that have the attribute present on the page
// $peace.formSubmict.bind() -> Function -> Set forms with attribute present, for each form onsubmit stop webflow, stop browser defaults & call named function
$extendPeace({
  formSubmit: {
    FN_NAME_ATTRIBUTE: 'data-peace--form-submit--fn-name',
    bind () {
      $peace.formSubmit.forms = document.querySelectorAll(`[${ $peace.formSubmit.FN_NAME_ATTRIBUTE }]`) // get all the forms

      for (let form of $peace.formSubmit.forms) {
        form.setAttribute('action', '/') // stops webflow form submission

        form.onsubmit = (event) => { // on form submission
          event.preventDefault() // stops browser form submission

          let fn = window // start @ window
          const names = form.getAttribute($peace.formSubmit.FN_NAME_ATTRIBUTE).split('.') // get the name of the fn, split on . to get each name

          for (let name of names) {
            fn = fn[name] // add name onto the previous object starting @ window
            if (typeof fn === 'function') fn(event) // if the last bind is a function -> call the function
          }
        }
      }
    }
  }
})

$peace.formSubmit.bind()
