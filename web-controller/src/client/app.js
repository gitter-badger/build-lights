'use strict'

import * as view from './sam/view'

const cb = (event) => {
  fetch('/model')
    .then(res => res.json())
    .then(json => {
      view.display(view.tabComponent(json))
    })
}

if (document.readyState === 'complete' ||
    (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
  cb()
} else {
  document.addEventListener('DOMContentLoaded', cb)
}

const mutateScreen = (e) => {
  const endpoint = e.currentTarget.href
  const isShutdown = endpoint.endsWith('shutdown')
  let countdown = Number(e.currentTarget.dataset.countdown)

  const representation = document.getElementById('representation')
  representation.classList.add('waiting')
  representation.innerHTML = '<div class="message"><p>Please wait...</p></div>'

  fetch(endpoint)
    .then(res => {
      if (!res.ok) {
        representation.classList.add('error')
        representation.innerHTML = '<div class="message"><p>Could not execute.<br/>Please restart manually.<br/><br/><a href="#" onclick="location.reload()">Reload</a></p></div>'
        return
      }

      const intervalId = setInterval(() => {
        let message = `Reboot underway. Will refresh in ${countdown} seconds.`
        if (isShutdown) {
          message = `Shutdown underway. You can unplug your Raspberry Pi in ${countdown} seconds.`
        }

        representation.innerHTML = `<div class="message"><p>${message}</p></div>`
        countdown -= 1

        if (countdown === 0) {
          clearInterval(intervalId)

          if (isShutdown) {
            representation.innerHTML = `<div class="message"><p>You can now unplug your Raspberry Pi.</p></div>`
          } else {
            location.reload()
          }
        }
      }, 1000)
    })

  return false
}

const deviceActionEls = document.getElementsByClassName('deviceAction')
for (let i = 0; i < deviceActionEls.length; i++) {
  if (!deviceActionEls[i].onclick) {
    deviceActionEls[i].onclick = mutateScreen
  }
}
