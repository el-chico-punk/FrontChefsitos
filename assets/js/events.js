import { products } from './products.js'

const d = document
const cartArray = []
let totalPrice = 0

window.addEventListener('DOMContentLoaded', (e) => {
  const $itemTemplate = d.getElementById('car-list-item').content

  d.addEventListener('click', (e) => {

    if (e.target.matches('.btn-cart')) {
      const product = e.target.getAttribute('data-product')
      const $cloneItem = d.importNode($itemTemplate, true)

      const productSelected = products.find((item) => product === item.product)

      if (!productSelected) return

      if (cartArray.find(item => item.product === productSelected.product)) {
        const $item = d.querySelector(`[data-list='${productSelected.product}']`)
        const $quantity = $item.querySelector('.price-quantity')
        const item = cartArray.find(item => item.product === productSelected.product)

        cartArray.map(item => {
          if (item.product === productSelected.product) {
            item.quantity = item.quantity + 1
          }
        })

        $quantity.textContent = `${item.quantity} x ${item.quantity * item.price}`

        cartArray.forEach(item => {
          totalPrice += item.price * item.quantity
        })

        d.querySelector('.total-value').textContent = `Total: $${totalPrice}`

        return
      }

      cartArray.push({ ...productSelected, quantity: 1 })

      $cloneItem.querySelector('.item-list').setAttribute('data-list', productSelected.product)
      $cloneItem.querySelector('.title-product').textContent = productSelected.product
      $cloneItem.querySelector('.photo-product').src = productSelected.image
      $cloneItem.querySelector('.price-quantity').textContent = `1 x ${productSelected.price}`

      cartArray.forEach(item => {
        totalPrice += item.price * item.quantity
      })

      d.querySelector('.cart-list').prepend($cloneItem)
      d.querySelector('.total-value').textContent = `Total: $${totalPrice}`
      d.querySelector('.products-number').textContent = cartArray.length
    }
  })
})