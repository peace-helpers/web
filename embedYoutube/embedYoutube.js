// $peace.embedYoutube.EMBED_ATTRIBUTE -> String -> Attribute to identify embed desired
// $peace.embedYoutube.playerVars -> Object -> Variables to send to new YT.Player(id, options)
// $peace.embedYoutube.PLAY_ON_CLICK -> Boolean -> If the video should start playing once it has been clicked
// $peace.embedYoutube.bind(ELEMENT, String) -> Function > With element and uid Initializes YouTube video
// $peace.embedYoutube.onImgLoad(ELEMENT) -> Function -> Set minHight of image to auto on load
// $peace.embedYoutube.embeds -> Array -> Holds embed DOM wrapper
// <script src="https://www.youtube.com/iframe_api"></script> - Dependency - Gets PLAY_ON_CLICK to work on mobile
$extendPeace({
  embedYoutube: {
    EMBED_ATTRIBUTE: 'data-peace--embed-youtube--embed',
    playerVars: { playsinline: 1 },
    PLAY_ON_CLICK: true,
    onImgLoad (element) {
      element.style.minHeight = 'auto'
    },
    bind (element, uid) {
      if (element && uid) {
        let attributeId = element.getAttribute('id')
    
        if (!attributeId) {
          attributeId = `${ uid }-${ String(Date.now()) }`
          element.setAttribute('id', attributeId)
        }
    
        let options = {
          videoId: uid,
          playerVars: $peace.embedYoutube.playerVars
        }
    
        if ($peace.embedYoutube.PLAY_ON_CLICK) {
          options.events = {
            onReady () {
              player.playVideo()
            }
          }
        }
    
        const player = new YT.Player(attributeId, options)
      }
    }
  }
})

$peace.embedYoutube.embeds = document.querySelectorAll(`[${ $peace.embedYoutube.EMBED_ATTRIBUTE }]`)

for (let embed of $peace.embedYoutube.embeds) {
  const UID = embed.innerText

  embed.innerHTML = `
    <div class="peace--embed-youtube--img-wrapper" onclick="$peace.embedYoutube.bind(this, '${ UID }')">
      <img src="https://i.ytimg.com/vi_webp/${ UID }/sddefault.webp" loading="lazy" onload="$peace.embedYoutube.onImgLoad(this)"/>

      <button aria-label="Play" class="peace--embed-youtube--play-button">
        <svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%">
          <path class="peace--embed-youtube--button-path" d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#f00"></path>
          <path d="M 45,24 27,14 27,34" fill="#fff"></path>
        </svg>
      </button>
    </div>
  `
}
