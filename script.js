const sourceImages = [
    "image1.jpg",
    "image2.jpg",
    "image3.jpg",
    "image4.jpg",
    "image5.jpg",
    "image6.jpg",
    "image7.jpg",
    "image8.jpg",
]
const defaultImage = "default.jpg"

const randomImages = [...sourceImages, ...sourceImages].sort((a, b) =>
    Math.random() > 0.5 ? 1 : -1
)

console.log(randomImages)

const gameContainer = document.querySelector("#memory-game")

let counter = 0
for (let randomImage of randomImages) {
    gameContainer.innerHTML += `
        <div>
            <img class="image-card" data-idx="${counter}" src="images/${defaultImage}">
        </div>
    `
    counter++
}

const imageCards = document.querySelectorAll(".image-card")

let firstImageName = ""
let firstImageIdx = ""
const matchedImages = []

for (let imageCard of imageCards) {
    imageCard.addEventListener("click", () => {
        const idx = imageCard.dataset.idx
        const imageName = randomImages[idx]
        imageCard.src = `images/${imageName}`

        if (!firstImageName) {
            firstImageName = imageName
            firstImageIdx = idx
        } else {
            if (
                firstImageName == imageName &&
                firstImageIdx !== idx &&
                !matchedImages.includes(imageName)
            ) {
                matchedImages.push(imageName)
            }
            firstImageName = ""
            firstImageIdx = ""
            clearImages()
        }
        console.log(matchedImages)
    })
}

function clearImages() {
    setTimeout(() => {
        for (let imageCard of imageCards) {
            const idx = imageCard.dataset.idx
            const imageName = randomImages[idx]
            if (!matchedImages.includes(imageName)) {
                imageCard.src = `images/${defaultImage}`
            }
        }
    }, 400)
}