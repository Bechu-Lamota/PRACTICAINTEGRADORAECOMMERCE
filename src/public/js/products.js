console.log('Hola')

const nameInput = document.getElementById('nameInput')
const codeInput = document.getElementById('codeInput')
const stockInput = document.getElementById('stockInput')
const priceInput = document.getElementById('priceInput')
const productForm = document.getElementById('productForm')
const sendButton = document.getElementById('sendButton')


productForm.addEventListener('submit', e => {
  e.preventDefault()

  const title = nameInput.value
  const price = priceInput.value
  const stock = stockInput.value
  console.log({ title, price, stock })

  fetch('/api/products', {
    method: 'POST',
    body: JSON.stringify({ title, price, stock }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => console.log(data))
})

const deleteProduct = id => {
  console.log(id)

  fetch(`/api/products/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => console.log(data))
}