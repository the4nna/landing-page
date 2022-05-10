const productsContainer = document.getElementById("productsContainer")

function htmlProducts(productList) {
    productsContainer.innerHTML = ''
    productList.forEach(product => {
        const productImg = document.createElement("img")
        const productName = document.createElement("h3")
        const productDescription = document.createElement("p")
        const oldPrice = document.createElement("span")
        const price = document.createElement("span")
        const installments = document.createElement("span")
        const buyButton = document.createElement("button")

        productImg.src = product.image
        productName.innerHTML = product.name
        productDescription.innerHTML = product.description
        oldPrice.innerHTML = product.oldPrice
        price.innerHTML = product.price
        installments.innerHTML = product.installments

        productsContainer.appendChild(productImg)
        productsContainer.appendChild(productName)
        productsContainer.appendChild(productDescription)
        productsContainer.appendChild(oldPrice)
        productsContainer.appendChild(price)
        productsContainer.appendChild(installments)

    });
    
}

function errorEvt() {
    alert('Aconteceu um erro')
}


window.onload = () =>
    urlLoad()
    .then(htmlProducts)
    .catch(errorEvt)


function urlLoad() {
    return new Promise((resolve, reject) => {
        const xhttp = new XMLHttpRequest()

        xhttp.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200) {
                const response = (JSON.parse(this.responseText))
                resolve(response)
            } else if (this.status === 404) {
                reject()
            }
        }
        xhttp.open('GET', "https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=1", true)
        xhttp.send()
    })
}


console.log(urlLoad())