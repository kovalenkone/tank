document.querySelectorAll('.product-card').forEach(card => {
  const wrapper = card.querySelector('.product-card-image-wrapper')
  const img = card.querySelector('img.cover')

  const images = img.dataset.images.split(',').map(src => src.trim())

  let currentIndex = 0

  images.forEach(src => {
    const i = new Image()
    i.src = src
  })

  const indicators = document.createElement('div')
  indicators.className = 'product-card-indicators'

  images.forEach((_, i) => {
    const dot = document.createElement('span')
    if (i === 0) dot.classList.add('active')
    indicators.appendChild(dot)
  })

  wrapper.appendChild(indicators)
  const dots = indicators.querySelectorAll('span')

  function setImage(index) {
    currentIndex = Math.max(0, Math.min(index, images.length - 1))
    img.src = images[currentIndex]

    dots.forEach(dot => dot.classList.remove('active'))
    dots[currentIndex].classList.add('active')
  }

  /* ---------- DESKTOP HOVER ---------- */
  wrapper.addEventListener('mousemove', e => {
    const rect = wrapper.getBoundingClientRect()
    const x = e.clientX - rect.left

    const index = Math.floor((x / rect.width) * images.length)
    if (index !== currentIndex) {
      setImage(index)
    }
  })

  wrapper.addEventListener('mouseleave', () => {
    setImage(0)
  })

  /* ---------- TOUCH SWIPE ---------- */
  let startX = 0

  wrapper.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX
  })

  wrapper.addEventListener('touchmove', e => {
    const moveX = e.touches[0].clientX
    const diff = startX - moveX

    if (Math.abs(diff) > 30) {
      if (diff > 0) {
        setImage(currentIndex + 1) // swipe left
      } else {
        setImage(currentIndex - 1) // swipe right
      }
      startX = moveX
    }
  })
})
