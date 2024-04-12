const baseURL = 'https://fakestoreapi.com/products'
// This event listener waits for the DOM content to be fully loaded before executing the code inside it.
document.addEventListener("DOMContentLoaded", function() {
    // When the DOM content is loaded, it calls the fetchProductList function to fetch the product data.
    fetchProductList();

    // Event listener for the search button click event.
    document.getElementById("search-button").addEventListener("click", function(event) {
        event.preventDefault(); // Prevents the default form submission behavior.
        handleSearch(); // Calls the handleSearch function to filter products based on search input.
    });

    // Event listener for the keypress event on the search input field.
    document.getElementById("search-input").addEventListener("keypress", function(event) {
        // Checks if the Enter key is pressed.
        if (event.key === "Enter") {
            event.preventDefault(); // Prevents the default form submission behavior.
            handleSearch(); // Calls the handleSearch function to filter products based on search input.
        }
    });

    // Event listener to handle clicks outside of the search input field.
    document.addEventListener("click", function(event) {
        const searchInput = document.getElementById("search-input");
        // Checks if the clicked element is not the search input field.
        if (!event.target.matches("#search-input")) {
            searchInput.value = ""; // Clears the search input field.
            handleSearch(); // Calls the handleSearch function to display all products.
        }
    }); 
});

// Function to fetch the list of products from the API.
function fetchProductList() {
    fetch(baseURL)
    .then(response => response.json()) // Parses the response as JSON.
    .then(data => {
        window.productData = data; // Saves the fetched product data globally.
        displayAllProducts(window.productData); // Displays all products after fetching.
    })
    .catch(error => console.error('Error fetching product list:', error)); // Handles errors.
}

// Function to display all products.
function displayAllProducts(products) {
    const productList = document.getElementById('product-list');
        productList.innerHTML = ''; // Clears the product list.

    // Iterates over each product and creates HTML elements to display them.
    products.forEach(product => {
        const productDiv = document.createElement('div'); // Creates a <div> element for each product.
        productDiv.classList.add('product');

        // Sets the inner HTML of the product <div> with product information.
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>Category:${product.category}</p>
            <p>Price:${product.price}</p>
            <p>Description:${product.description}</p>
            <p>Rating: ${product.rating}</p>
            <button class="buy-button" data-count="${product.remainingcount}">Buy</button>
            <button class="delete-button" data-id="${product.id}">Delete</button> 
        `;

        productList.appendChild(productDiv); // Appends the product <div> to the product list.
    });
}

// Function to handle search functionality.
function handleSearch() {
    const searchInput = document.getElementById('search-input').value.toLowerCase(); // Gets the search input value.
    const filteredProducts = window.productData.filter(product => {
        // Filters products based on search input (title or description containing the search query).
        return product.title.toLowerCase().includes(searchInput) || product.description.toLowerCase().includes(searchInput);
    });
    displayAllProducts(filteredProducts); // Displays filtered products.
  }
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-button')) {
      const shouldDelete = confirm('Are you sure you want to delete this product?');
      if (shouldDelete) {
        // If confirmed, delete the movie
        deleteProduct(event.target.dataset.id);
      }
    }
  });

// // Event delegation to handle buy button clicks and show remaining count.
// document.addEventListener('click', function(event) {
//     if (event.target.classList.contains('buy-button')) { // Checks if the clicked element is a buy button.
//         const remainingCount = event.target.dataset.count; // Gets the remaining count from the button's data attribute.
//         alert(`Remaining count: ${remainingCount}`); // Shows an alert with the remaining count.
//     }
// });

// adding a new product 
function addProduct (){
    fetch(baseURL,{
        method:"POST",
        body:JSON.stringify(
            {
                title: 'test product',
                price: 13.5,
                description: 'lorem ipsum set',
                image: 'https://i.pravatar.cc',
                category: 'electronic'
            }
        ),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(data =>  {
        console.log("Product added successfully:", data);
    })
    .catch(error => {
        console.error("Error adding product:", error);
        // Handle errors if necessary
    });
};
addProduct();

//adding updating a specific product 
// let id = 7 
function updateProduct (id){
    fetch(`${baseURL}/${id}`,{ // uses backticks for template literal
            method:"PATCH",
            body:JSON.stringify(
                {
                    title: "Gold Plated Princess White" ,
                    price: 10.99,
                    description: 'lorem ipsum set',
                    image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
                    category: 'electronic'
                }
            ),
            headers: {
                "Content-Type": "application/json"
            }
        
        })
            .then(res=>res.json())
            .then(data=>
                console.log("Product updated successfully:", data));
};
// updateProduct(id)
// displaying a specific product
function displayProduct(){
        fetch(`${baseURL}/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load product');
            }
            return response.json();
        })
        .then(product => {
            console.log('product loaded:', product);
        })
        .catch(error => {
            console.error('Error loading product:', error);


        });
}
// displayProduct();
// deleting a single product
function deleteProduct(id) {
    fetch(`${baseURL}/${id}`, {
        method: "DELETE"
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Error deleting product');
        }
        return res.json();
    })
    .then(data => {
        console.log(data); // Log the response JSON data
        // Remove the product from the DOM
        const productDiv = document.querySelector(`.product[data-id="${id}"]`);
        if (productDiv) {
            productDiv.remove();
        }
    })
    .catch(error => {
        console.error('Error deleting product:', error);
    });
}
function deleteProduct(id) {
    fetch(`${baseURL}/${id}`, {
        method: "DELETE"
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Error deleting product');
        }
        return res.json();
    })
    .then(data => {
        console.log(data); // Log the response JSON data
        // Remove the product from the DOM
        const productDiv = document.querySelector(`.product[data-id="${id}"]`);
        if (productDiv) {
            productDiv.remove();
        }
    })
    .catch(error => {
        console.error('Error deleting product:', error);
    });
}
function deleteProduct(id) {
    fetch(`${baseURL}/${id}`, {
        method: "DELETE"
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Error deleting product');
        }
        return res.json();
    })
    .then(data => {
        console.log(data); // Log the response JSON data
        // Remove the product from the DOM
        const productDiv = document.querySelector(`.product[data-id="${id}"]`);
        if (productDiv) {
            productDiv.remove();
        }
    })
    .catch(error => {
        console.error('Error deleting product:', error);
    });
}
const id = 19;
deleteProduct(id);