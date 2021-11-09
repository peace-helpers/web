// $peace.populateSectionLinks.LIST_ID - String - DOM id for list we will populate
// $peace.populateSectionLinks.SECTION_ATTRIBUTE - String - DOM attribute for section we'd like to scroll to
// $peace.populateSectionLinks.GENERATE_ID_ATTRIBUTE - String - DOM attribute for if code should generate an id on the item
// $peace.populateSectionLinks.LIST_ITEM_CLASS - String - DOM class to give to each section
// $peace.clickPostScroll.bind(this) - Dependency - Element to click after scroll is complete
(function () {
  $extendPeace({
    populateSectionLinks: {
      LIST_ID: 'peace--section-links--list',
      SECTION_ATTRIBUTE: 'data-peace--section-links--section',
      GENERATE_ID_ATTRIBUTE: 'data-peace--section-links--generate-id',
      LIST_ITEM_CLASS: 'peace--section-links--list-item',
    }
  })

  const list = document.getElementById($peace.populateSectionLinks.LIST_ID)

  if (list) {
    let listHtml = ''
    const sections = document.querySelectorAll(`[${ $peace.populateSectionLinks.SECTION_ATTRIBUTE }]`)

    for (section of sections) {
      const NAME = section.innerText

      if (NAME) {
        let id = section.getAttribute('id')

        if (!id && section.getAttribute($peace.populateSectionLinks.GENERATE_ID_ATTRIBUTE)) {
          id = section.innerText.toLowerCase().replaceAll(' ', '-')
          section.setAttribute('id', id)
        }

        if (id) {
          listHtml += `
            <li class="${ $peace.populateSectionLinks.LIST_ITEM_CLASS }">
              <a href="#${ id }" onclick="$peace.clickPostScroll.bind(this)">${ NAME }</a>
            </li>
          `
        }
      }
    }

    list.innerHTML = listHtml
  }
})()
