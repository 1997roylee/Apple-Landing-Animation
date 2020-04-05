;(function () {
  const ipadWidth = 519 - 44
  const scrollHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  )
  var maxScale = window.outerWidth / ipadWidth

  function getWindowScrollY () {
    return window.scrollY
  }

  function easeOutQuad (t) {
    return t * (2 - t)
  }

  function IpadPro () {
    const selector = document.querySelector('.ipad-pro')

    function getScaleX () {
      const e = getWindowScrollY() / scrollHeight
      return maxScale - (maxScale - 1) * easeOutQuad(e)
    }

    function getTranslateY () {
      const origin = -1 * window.innerHeight * 0.65
      const e = getWindowScrollY() / (scrollHeight * 0.5)

      if (e <= 1.2) return origin - (origin - 200) * easeOutQuad(e)
      else return origin - (origin - 200) * easeOutQuad(1.2)
    }

    function getMatrix () {
      return `transform: matrix(${getScaleX()}, 0, 0, ${getScaleX()}, 0, ${getTranslateY()});`
    }

    function update () {
      selector.setAttribute('style', getMatrix())

      if (getWindowScrollY() / scrollHeight >= 0.1)
        document.querySelector('.sticky-content').classList.add('fade-out')
      else
        document.querySelector('.sticky-content').classList.remove('fade-out')
    }

    ;(function () {
      update()
    })()

    return {
      update: update
    }
  }

  const ipadPro = new IpadPro()
  document.addEventListener('scroll', () => {
    ipadPro.update()
  })

  document.addEventListener('resize', () => {
    maxScale = window.outerWidth / ipadWidth
    ipadPro.update()
  })
})()
