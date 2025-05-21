document.addEventListener("DOMContentLoaded", function () {
    renderAdvertisements(advertisementsData);
});


// Sample data for advertisements that we put in an array
const advertisementsData = [
  {
    hotel: "Melmar",
    location: "Rethymmon city, Crete, Greece",
    image: "images/melmar.jpg",
    price: "4 068 SEK",
    contact: "melmar@hotells.com", 
    details: "Beach: 100 m <br>Shopping: 50 m <br>Pool: Yes <Br>Bar: Yes"
  },
  {
    hotel: "Bro & Sister",
    location: "Georgioupolis, Crete, Greece",
    image: "images/broandsister.jpg",
    price: "4 998 SEK",
    contact: "bs@hotells.com", 
    details: "Beach: 700 m <br>Shopping: 500 m <br>Pool: Yes <Br>Bar: No"
  },
  {
    hotel: "Romantica Crete",
    location: "Georgioupolis, Crete, Greece",
    image: "images/romatica.jpg",
    price: "5 068 SEK",
    contact: "romantica@hotells.com", 
    details: "Beach: 500 m <br>Shopping: 800 m <br>Pool: Yes <Br>Bar: No"
  },
  {
    hotel: "Kato Stalos Mare",
    location: "Kato Stalos, Crete, Greece",
    image: "images/katos.jpg",
    price: "6 137 SEK",
    contact: "mare@hotells.com", 
    details: "Beach: 400 m <br>Shopping: 500 m <br>Pool: Yes <Br>Bar: Yes"
  },
  {
    hotel: "Margarita Beach Resort",
    location: "AgiaMarina, Crete, Greece",
    image: "images/margarita.jpg",
    price: "6 468 SEK",
    contact: "margarita@hotells.com", 
    details: "Beach: 100 m <br>Shopping: 500 m <br>Pool: Yes <Br>Bar: No"
  },
  {
    hotel: "Nostalgie",
    location: "Georgioupolis, Crete, Greece",
    image: "images/faros.jpg",
    price: "6 698 SEK",
    contact: "nostalgie@hotells.com", 
    details: "Beach: 50 m <br>Shopping: 50 m <br>Pool: Yes <Br>Bar: Yes"
  },
];

function renderAdvertisements(data) {
    const adsContainer = document.getElementById("adsContainer");
    adsContainer.innerHTML = ""; // Cleans the ads

    data.forEach(ad => {  //this is the HTML and bootstrap that shows dinamically when uploading the page and by the filtering.
        adsContainer.innerHTML += `
            <div class="col-md-4">
                <div class="card p-3 mb-3 shadow-lg"> <!-- Skuggat kort -->
                    <img src="${ad.image}" class="card-img-top border border-secondary rounded-3 shadow-sm"> <!-- Bild med ram, rundade kanter och skugga -->
                    <div class="card-body">
                        <h5 class="card-title">${ad.hotel}</h5>
                        <p class="card-text">${ad.location}</p>
                        <p class="card-text fw-bold fs-4">${ad.price}</p>
                        <p class="contact-info">Contact: ***</p>
                        <button class="btn btn-info shadow-sm" onclick="toggleContact(this, '${ad.contact}')">Show Contact</button>
                        <button class="btn btn-primary shadow-sm" onclick="showDetails('${ad.details}')">Details</button>
                    </div>
                </div>
            </div>
        `;
    });
}

document.getElementById("filterInput").addEventListener("input", function () { //Event listener that catchs when the user writes in the input field.
    const searchText = this.value.toLowerCase();
    const filteredAds = advertisementsData.filter(ad => ad.hotel.toLowerCase().includes(searchText)); // this go through every ad and put it in the new list if the ad includes the text in the input field.
    renderAdvertisements(filteredAds); // this calls the function that renders the ads but this time the filtered ads.
});


function toggleContact(button, contactInfo) {
    const contactElement = button.previousElementSibling; // this finds the previous element the function took as a parameter. (Before the "show contact" button is a paragraph that contains "***")

    if (contactElement.textContent.includes("***")) {
        contactElement.textContent = "Contact: " + contactInfo; // if the paragraph contains '***' then the contactInfor shows and the button shift text to 'hide content'.
        button.textContent = "Hide Contact";
    } else {
        contactElement.textContent = "Contact: ***"; // The email shows here and if we click the button the textcontent '***' will be shown again and the button text shifts to 'Show Contact'.
        button.textContent = "Show Contact";
    }
}

function showDetails(details) {//this function triggers from the details button and calls a modal from the index.html
    document.getElementById("modalBody").innerHTML = details;
    var detailsModal = new bootstrap.Modal(document.getElementById("detailsModal"));
    detailsModal.show();
}



// Initial rendering
renderAdvertisements(advertisementsData);



