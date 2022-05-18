const productsContainer = document.getElementById("productsContainer")


function htmlProducts(data) {
    const productList = data.products
    productsContainer.innerHTML = ''
    productList.forEach(product => {
        const productDiv = document.createElement("div")


        productDiv.classList.add('productDiv')
    
        productDiv.innerHTML = `
        <img src="${product.image}" class="productImg">  <img> 
        <h3 class="productName"> ${product.name} </h3> 
        <p class="productDescription"> ${product.description} </p> 
        <span class="productPrice"> <s> $ ${product.oldPrice}.00 </s> </span> <br>
        <span class="productPrice"> $ ${product.price}.00 </span> 
        <button class="buyButton"> Comprar </button>
        `
        
        const buttonInstallment = document.createElement('button')
        buttonInstallment.classList.add('installmentButton')
        buttonInstallment.innerHTML = '<i class="fa-solid fa-percent"></i>'
        productDiv.appendChild(buttonInstallment)
        buttonInstallment.addEventListener('click', function() {
            installmentPop(product.installments)
        })

        productsContainer.appendChild(productDiv)
    });
}

function returnJSON(response) {
    return response.json()
}

function installmentPop(installment) {
    const installmentDiv = document.getElementById("installmentDiv")
    installmentDiv.style.display = 'block'
    
    installmentDiv.innerHTML = ''

    installmentDiv.innerHTML = `<h3> ${installment.count} ${installment.value}</h3>`
}

const installmentDiv = document.getElementById("installmentDiv")
installmentDiv.addEventListener('click', function(e){
    e.currentTarget.style.display = 'none'
    e.currentTarget.innerHTML = ''
}) 

function errorEvt() {
    alert('Aconteceu um erro')
}



let page = 1
function loadMore() {
    page++
    urlLoad(page)
    .then(htmlProducts)
}


window.onload = (e) =>
    e.preventDefault()
    urlLoad(1)
    .then(htmlProducts)
    .catch(errorEvt)


function urlLoad(pageNumber) {
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
        
        xhttp.open('GET', `https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=${pageNumber}`, true)
        xhttp.send()
    })
}



