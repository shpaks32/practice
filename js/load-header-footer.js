const basePath = window.location.hostname.includes('github.io')
  ? '/practice/'
  : '/'

document.addEventListener('DOMContentLoaded', function () {
  fetch(basePath + 'header.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('header').innerHTML = data
    })
    .catch(error => console.error('Error loading header:', error))

  fetch(basePath + 'footer.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('footer').innerHTML = data
    })
    .catch(error => console.error('Error loading footer:', error))

  document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
    if (link.href.includes('https://') || link.href.includes('http://')) {
      return
    }
    link.href = basePath + link.getAttribute('href')
  })

  document.querySelectorAll('script').forEach(script => {
    if (
      script.src &&
      (script.src.includes('https://') || script.src.includes('http://'))
    ) {
      return
    }
    if (script.src) {
      script.src = basePath + script.getAttribute('src')
    }
  })
})

var app = new Vue({
  el: '#app',
  data: {
    products: [
      {
        id: 1,
        title: 'Valencia Orange',
        short_text: 'Sweet and juicy Valencia oranges.',
        image: 'images/valencia_orange.jpg',
        desc: 'Delicious oranges known for their sweetness and versatility.',
        characteristics: {
          resistance: 'HR: Citrus Canker; IR: Citrus Greening',
          plant: [
            'Strong trees that produce abundant fruit.',
            'Requires warm climates for optimal growth.',
            'Highly productive variety.'
          ],
          fruit: [
            'Bright orange color with a smooth texture.',
            'Balanced sweetness with a hint of acidity.',
            'Average fruit size: 180 – 200 grams.'
          ],
          cycle: ['Spring', 'Summer'],
          color: 'Orange'
        }
      },
      {
        id: 2,
        title: 'Mandarin Orange',
        short_text: 'Easy-to-peel mandarin oranges.',
        image: 'images/mandarin_orange.jpg',
        desc: 'Popular for their sweetness and convenient size.',
        characteristics: {
          resistance: 'HR: Citrus Canker; IR: Citrus Greening',
          plant: [
            'Compact trees suitable for smaller spaces.',
            'Resistant to common citrus pests.',
            'Ripens earlier than other varieties.'
          ],
          fruit: [
            'Bright orange skin that peels effortlessly.',
            'Sweet and juicy segments.',
            'Average fruit size: 100 – 120 grams.'
          ],
          cycle: ['Winter', 'Spring'],
          color: 'Orange'
        }
      },
      {
        id: 3,
        title: 'Blood Orange',
        short_text: 'Distinctive and flavorful blood oranges.',
        image: 'images/blood_orange.jpg',
        desc: 'Known for their deep red flesh and rich citrus flavor.',
        characteristics: {
          resistance: 'HR: Citrus Canker; IR: Citrus Greening',
          plant: [
            'Medium-sized trees with ornamental value.',
            'Requires cool nights to develop color.',
            'Moderate productivity.'
          ],
          fruit: [
            'Deep red to maroon flesh color.',
            'Sweet-tart flavor with berry undertones.',
            'Average fruit size: 150 – 170 grams.'
          ],
          cycle: ['Winter', 'Spring'],
          color: 'Red'
        }
      },
      {
        id: 4,
        title: 'Clementine',
        short_text: 'Small and seedless clementine oranges.',
        image: 'images/clementine_orange.jpg',
        desc: 'Easy to peel and perfect for snacking.',
        characteristics: {
          resistance: 'HR: Citrus Canker; IR: Citrus Greening',
          plant: [
            'Dwarf trees suitable for containers.',
            'Highly productive with dense foliage.',
            'Adaptable to various climates.'
          ],
          fruit: [
            'Bright orange skin that peels easily.',
            'Sweet and juicy segments without seeds.',
            'Average fruit size: 80 – 100 grams.'
          ],
          cycle: ['Fall', 'Winter'],
          color: 'Orange'
        }
      },
      {
        id: 5,
        title: 'Satsuma Orange',
        short_text: 'Seedless and easy-to-peel satsuma oranges.',
        image: 'images/satsuma_orange.jpg',
        desc: 'Sweet and aromatic with a loose rind.',
        characteristics: {
          resistance: 'HR: Citrus Canker; IR: Citrus Greening',
          plant: [
            'Vigorous trees with spreading growth habit.',
            'Excellent cold tolerance.',
            'Consistent yield each season.'
          ],
          fruit: [
            'Bright orange skin with a thin, easy-to-peel rind.',
            'Sweet and juicy flesh with a delicate flavor.',
            'Average fruit size: 120 – 140 grams.'
          ],
          cycle: ['Fall', 'Winter'],
          color: 'Orange'
        }
      }
    ],
    product: {},
    cart: [],
    btnVisible: 0,
    orderSummary: null,
    orderProducts: []
  },
  mounted: function () {
    this.getProduct()
    this.getCart()
  },
  methods: {
    getProduct: function () {
      const productId = window.location.hash.replace('#', '')
      if (productId) {
        this.product = this.products.find(p => p.id == productId) || {}
        this.checkInCart(productId)
      }
    },
    addToCart (id) {
      let cart = JSON.parse(localStorage.getItem('cart')) || []
      if (!cart.includes(id)) {
        cart.push(id)
        localStorage.setItem('cart', JSON.stringify(cart))
      }
      this.btnVisible = 1
    },
    goToCart () {
      window.location.href = '/practice/contact-us.html'
    },

    checkInCart: function (id) {
      let cart = JSON.parse(localStorage.getItem('cart')) || []
      this.btnVisible = cart.includes(parseInt(id)) ? 1 : 0
    },
    getCart: function () {
      this.cart = JSON.parse(localStorage.getItem('cart')) || []
    }
  }
})
