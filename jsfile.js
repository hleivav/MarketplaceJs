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
    pool: true,
    bar: true,
    details: "Beach: 100 m <br>Shopping: 50 m <br>Pool: Yes <Br>Bar: Yes"
  },
  {
    hotel: "Bro & Sister",
    location: "Georgioupolis, Crete, Greece",
    image: "images/broandsister.jpg",
    price: "4 998 SEK",
    contact: "bs@hotells.com", 
    pool: false,
    bar: false,
    details: "Beach: 700 m <br>Shopping: 500 m <br>Pool: No <Br>Bar: No"
  },
  {
    hotel: "Romantica Crete",
    location: "Georgioupolis, Crete, Greece",
    image: "images/romatica.jpg",
    price: "5 068 SEK",
    contact: "romantica@hotells.com", 
    pool: true,
    bar: true,
    details: "Beach: 500 m <br>Shopping: 800 m <br>Pool: Yes <Br>Bar: Yes"
  },
  {
    hotel: "Kato Stalos Mare",
    location: "Kato Stalos, Crete, Greece",
    image: "images/katos.jpg",
    price: "6 137 SEK",
    contact: "mare@hotells.com", 
    pool: true,
    bar: true,
    details: "Beach: 400 m <br>Shopping: 500 m <br>Pool: Yes <Br>Bar: Yes"
  },
  {
    hotel: "Margarita Beach Resort",
    location: "AgiaMarina, Crete, Greece",
    image: "images/margarita.jpg",
    price: "6 468 SEK",
    contact: "margarita@hotells.com", 
    pool: true,
    bar: false,
    details: "Beach: 100 m <br>Shopping: 500 m <br>Pool: Yes <Br>Bar: No"
  },
  {
    hotel: "Nostalgie",
    location: "Georgioupolis, Crete, Greece",
    image: "images/faros.jpg",
    price: "6 698 SEK",
    contact: "nostalgie@hotells.com", 
    pool: true,
    bar: true,
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
//Adds listener to the 3 components that filter the results
document.getElementById("filterInput").addEventListener("input", filterAdvertisements);
document.getElementById("filterPool").addEventListener("change", filterAdvertisements);
document.getElementById("filterBar").addEventListener("change", filterAdvertisements);


function filterAdvertisements() {
  //Gets the value of the 3 listened components and puts them in variables.
    const searchText = document.getElementById("filterInput").value.toLowerCase();
    const filterPool = document.getElementById("filterPool").checked;
    const filterBar = document.getElementById("filterBar").checked;

  // filter the list
    const filteredAds = advertisementsData.filter(ad => {
        let matchesSearch = ad.hotel.toLowerCase().includes(searchText);
        let matchesPool = !filterPool || ad.pool;
        let matchesBar = !filterBar || ad.bar;

        return matchesSearch && matchesPool && matchesBar;
    });

    renderAdvertisements(filteredAds);
}


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

let sortAscending = true; // Default: from high to low

document.getElementById("sortButton").addEventListener("click", function () {
    sortAscending = !sortAscending; // when calling this method the sortAscending changes.

    // Sorts by price
    advertisementsData.sort((a, b) => {
        let priceA = parseInt(a.price.replace(/\s/g, ""));
        let priceB = parseInt(b.price.replace(/\s/g, ""));
        return sortAscending ? priceA - priceB : priceB - priceA;
    });

    // if the button text shows ascending, change to descending an vice versa.
    this.textContent = sortAscending ? "Sort from highest price" : "Sort from lowest price";

    // render the ads by the new sorting order.
    renderAdvertisements(advertisementsData);
});



// Initial rendering
renderAdvertisements(advertisementsData);



