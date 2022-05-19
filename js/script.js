const productsContainer = document.getElementById("productsContainer")
const registerForm = document.getElementById("registerForm")
const shareForm = document.getElementById("shareForm")

registerForm.addEventListener('submit', function(e) {
    sendData(e)
})

function sendData(e) {
    e.preventDefault()

    let haveError = false
    let inputName = document.forms['registerForm']['name']

    if(!inputName.value) {
        haveError = true
        inputName.classList.add('inputError')
    } else {
        inputName.classList.remove('inputError')
    }

    let inputEmail = document.forms['registerForm']['email']

    if(!inputEmail.value) {
        haveError = true
        inputEmail.classList.add('inputError')
    } else {
        inputEmail.classList.remove('inputError')
    }

    let inputCPF = document.forms['registerForm']['cpf']

    if(!inputCPF.value) {
        haveError = true
        inputCPF.classList.add('inputError')
    } else {
        inputCPF.classList.remove('inputError')
    }

    let selectGender = document.forms['registerForm']['gender']

    if(!selectGender.value) {
        haveError = true
        selectGender.classList.add('inputError')
    } else {
        selectGender.classList.remove('inputError')
    }

    if(!haveError) {
        registerForm.submit()
    }
}

shareForm.addEventListener('submit', function(e) {
    friendData(e)
})

function friendData(e) {
    e.preventDefault()

    let haveError = false
    let inputName = document.forms['shareForm']['name']

    if(!inputName.value) {
        haveError = true
        inputName.classList.add('inputError')
    } else {
        inputName.classList.remove('inputError')
    }

    let inputEmail = document.forms['shareForm']['email']

    if(!inputEmail.value) {
        haveError = true
        inputEmail.classList.add('inputError')
    } else {
        inputEmail.classList.remove('inputError')
    }
    if(!haveError) {
        registerForm.submit()
    }
}


function htmlProducts(data) {
    const productList = data.products
    productsContainer.innerHTML = ''
    productList.forEach(product => {

        const productDiv = document.createElement('div')
        productDiv.classList.add('productDiv')
    
        productDiv.innerHTML = `
        <img src="${product.image}" class="productImg">  <img> 
        <h3 class="productName"> ${product.name} </h3> 
        <p class="productDescription"> ${product.description} </p>
        <span class="productPrice"> <s> $ ${product.oldPrice}.00 </s> </span> <br>
        <span class="productPrice"> $ ${product.price}.00 </span> 
        <button class="buyButton"> Comprar </button>
        `

        const installmentsDiv = document.createElement('div')
        installmentsDiv.style.display = 'none'
        productDiv.insertBefore(installmentsDiv, productDiv.children[4])
        installmentsDiv.innerHTML = `<span class="installmentSpan"> ou ${product.installments.count} de R$${product.installments.value} </span>`
        installmentsDiv.addEventListener('click', function() {
            installmentsDiv.style.display = 'none'
        })

        
        const buttonInstallment = document.createElement('button')
        buttonInstallment.classList.add('installmentButton')
        buttonInstallment.innerHTML = '<i class="fa-solid fa-percent"></i>'
        productDiv.appendChild(buttonInstallment)
        buttonInstallment.addEventListener('click', function() {
            productDiv.children[4].style.display = 'none'
            installmentsDiv.style.display = 'block'
        })

        productsContainer.appendChild(productDiv)
    });
}



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