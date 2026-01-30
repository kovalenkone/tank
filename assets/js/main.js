document.addEventListener('DOMContentLoaded', () => {
  // utils
  function noScrollBody(value) {
    const body = document.querySelector('body')

    value ? body.classList.add('no-scroll') : body.classList.remove('no-scroll')
  }

  // cards images
  document.querySelectorAll('.product-card').forEach(card => {
    const wrapper = card.querySelector('.product-card-image')
    const img1 = wrapper.querySelector('img.cover')

    const img2 = img1.cloneNode()
    wrapper.appendChild(img2)

    img2.classList.add('hidden')

    const images = img1.dataset.images.split(',').map(s => s.trim())

    let currentIndex = 0
    let activeImg = img1
    let hiddenImg = img2

    images.forEach(src => {
      const i = new Image()
      i.src = src
    })

    const indicators = document.createElement('div')
    indicators.className = 'product-card-indicators'

    images.forEach((_, i) => {
      const span = document.createElement('span')
      if (i === 0) span.classList.add('active')
      indicators.appendChild(span)
    })

    wrapper.after(indicators)
    const dots = indicators.querySelectorAll('span')

    function setImage(index) {
      index = Math.max(0, Math.min(index, images.length - 1))
      if (index === currentIndex) return

      hiddenImg.src = images[index]
      hiddenImg.classList.remove('hidden')
      activeImg.classList.add('hidden')
      ;[activeImg, hiddenImg] = [hiddenImg, activeImg]

      currentIndex = index
      dots.forEach(d => d.classList.remove('active'))
      dots[currentIndex].classList.add('active')
    }

    wrapper.addEventListener('mousemove', e => {
      const rect = wrapper.getBoundingClientRect()
      const x = e.clientX - rect.left
      const index = Math.floor((x / rect.width) * images.length)
      setImage(index)
    })

    wrapper.addEventListener('mouseleave', () => setImage(0))

    let startX = 0
    wrapper.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX
    })

    wrapper.addEventListener('touchmove', e => {
      const diff = startX - e.touches[0].clientX
      if (Math.abs(diff) > 30) {
        setImage(currentIndex + (diff > 0 ? 1 : -1))
        startX = e.touches[0].clientX
      }
    })
  })

  // burger
  const burger = document.querySelector('.header-burger')
  const menu = document.querySelector('.header-bottom')

  burger.addEventListener('click', function () {
    if (menu.classList.contains('open')) {
      menu.classList.remove('open')
      noScrollBody(false)
    } else {
      menu.classList.add('open')
      noScrollBody(true)
    }
  })

  // filter
  const filterButton = document.querySelector('.in-stock-filter-btn')
  const filterCloseButton = document.querySelector('.filter-close')
  const filter = document.querySelector('.filter')

  if (filterButton && filter && filterCloseButton) {
    filterButton.addEventListener('click', function () {
      filter.classList.add('open')
      noScrollBody(true)
    })

    filterCloseButton.addEventListener('click', function () {
      filter.classList.remove('open')
      noScrollBody(false)
    })
  }
})
