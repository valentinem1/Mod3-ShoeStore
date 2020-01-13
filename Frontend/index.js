const shoesUrl = "http://localhost:3000/shoes"
const shoeList = document.querySelector('#shoe-list')
const img = document.querySelector('#shoe-image')
const mainShoe = document.querySelector('#main-shoe')
const h4ShoeName = document.querySelector('#shoe-name')
const pShoeDesc = document.querySelector('#shoe-description')
const pShoeSize = document.querySelector('#shoe-price')
const reviewsUl = document.querySelector('#reviews-list')
const formContainer = document.querySelector('#form-container')


fetch(shoesUrl)
.then(r => r.json())
.then(shoes => shoes.forEach(shoe => displayShoes(shoe)))


function displayShoes(shoe){
    const li = document.createElement('li')
    li.className = "list-group-item"
    li.id = `shoe-${shoe.id}`
    li.innerText = shoe.name


    shoeList.append(li)

    mainContainerShoe(shoe)

    shoeList.addEventListener("click", (event) => {
        
        if(event.target.innerText === shoe.name){
            mainContainerShoe(shoe)
        }
    })
}

function mainContainerShoe(shoe){
    img.src = shoe.image
    h4ShoeName.innerText = shoe.name
    h4ShoeName.id = `shoe-${shoe.id}`
    pShoeDesc.innerText = shoe.description
    pShoeSize.innerText = `Price: $${shoe.price}`
}

function reviewsList(){
    const newReviewLi = document.createElement('li')
    newReviewLi.className = "list-group-item"
    reviewsUl.append(newReviewLi)
}
reviewsList()

function createForm(shoe){
    const form = document.createElement('form')
    form.id = "new-review"

    const div = document.createElement('div')
    div.className = "form-group"

    const textarea = document.createElement('textarea')
    textarea.className = "form-control"
    textarea.id = "review-content"
    textarea.rows = "3"

    const input = document.createElement('input')
    input.type = "submit"
    input.className = "btn btn-primary"

    div.append(textarea, input)
    form.append(div)
    formContainer.append(form)

    form.addEventListener("submit", (event)=>{
        event.preventDefault()
        const reviewValue = event.target["review-content"].value
        const shoeId = parseInt(event.target.offsetParent.querySelector('.card-title').id.split("")[5])
        fetch(`${shoesUrl}/${shoe.id}/reviews`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            "reviews": reviewValue
        })
    })
    .then(r => r.json())
    .then(review => reviewsList())
})
}

createForm()