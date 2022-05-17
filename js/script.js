const productsContainer = document.getElementById("productsContainer")


function htmlProducts(data) {
    const productList = data.products
    productsContainer.innerHTML = ''
    productList.forEach(product => {
        const productDiv = document.createElement("div")
        //const installments = document.createElement("span")

        productDiv.classList.add('productDiv')
    
        productDiv.innerHTML = `
        <div id="installmentDiv"> </div>
        <img src="${product.image}" class="productImg">  <img> 
        <h3 class="productName"> ${product.name} </h3> 
        <p class="productDescription"> ${product.description} </p> 
        <span class="productPrice"> <s> $ ${product.oldPrice}.00 </s> </span> <button id="installmentButton" onclick="installmentPop()"> <i class="fa-solid fa-percent"></i> </button>
        <span class="productPrice"> $ ${product.price}.00 </span> 
        <button class="buyButton"> Comprar </button>
        `
        
        productsContainer.appendChild(productDiv)


    });
}


function installmentPop(data) {
    const installmentDiv = document.getElementById("installmentDiv")
    installmentDiv.style.display = 'block'

    const installmentList = data.products
    installmentDiv.innerHTML = ''

    installmentList[0].installments.forEach(installment => {
        installmentDiv.innerHTML = `<h3> ${installment.count} </h3>`
    });
}


function errorEvt() {
    alert('Aconteceu um erro')
}


window.onload = (e) =>
    e.preventDefault()
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