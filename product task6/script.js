// Products array to store all products
let products = [];
let isEditing = false;
let editingIndex = -1;

// DOM elements
const productForm = document.getElementById('productForm');
const productsTableBody = document.getElementById('productsTableBody');
const noProductsMessage = document.getElementById('noProductsMessage');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const submitBtn = document.getElementById('submitBtn');
const searchBtn = document.getElementById('searchBtn');
const clearBtn = document.getElementById('clearBtn');

// Event listeners using addEventListener
document.addEventListener('DOMContentLoaded', init);
productForm.addEventListener('submit', handleFormSubmit);
searchBtn.addEventListener('click', searchProducts);
clearBtn.addEventListener('click', clearSearch);
categoryFilter.addEventListener('change', filterProducts);

// Handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    
    // Clear previous error messages
    clearErrorMessages();
    
    // Get form values
    const productName = document.getElementById('productName').value.trim();
    const productDescription = document.getElementById('productDescription').value.trim();
    const productPrice = parseFloat(document.getElementById('productPrice').value); 
    const productCategory = document.getElementById('productCategory').value;
    const productAvailability = document.getElementById('productAvailability').checked;
    
    // Validate form inputs to ensure they are not empty or invalid and to add or update products
    if (!validateForm(productName, productDescription, productPrice, productCategory, productAvailability)) {
        return;
    }
    
    if (isEditing) {
        // Update existing product
        updateProduct(editingIndex, productName, productDescription, productPrice, productCategory, productAvailability);
    } else {
        // Add new product
        addProduct(productName, productDescription, productPrice, productCategory, productAvailability);
    }
    
    // Clear form and display updated products and 
    // **********************************save to localStorage**********************************
    clearForm();
    displayProducts();
    saveToLocalStorage();
    
    console.log('Current products:', products);
}

// Form validation function
function validateForm(name, description, price, category, availability) {
    let isValid = true;
    
    // Validate Product Name
    if (!name) {
        showError('nameError', 'Product name cannot be empty.');
        isValid = false;
    }
    
    // Validate Description
    if (!description) {
        showError('descriptionError', 'Description cannot be empty.');
        isValid = false;
    }
    
    // Validate Price
    if (!price || price <= 0) {
        showError('priceError', 'Price should be a positive number.');
        isValid = false;
    }
    
    // Validate Category
    if (!category) {
        showError('categoryError', 'Category should be selected.');
        isValid = false;
    }
    return isValid;
}

// Show error message
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
}

// Clear error messages
function clearErrorMessages() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => element.textContent = '');
}

// Add product using push() method
function addProduct(name, description, price, category, availability) {
    const newProduct = {
        productName: name,
        description: description,
        price: price,
        category: category,
        availability: availability
    };
    
    products.push(newProduct); 
    
    alert(`Product "${name}" has been added successfully!`);
    console.log('Product added:', newProduct);
}

// Update product
function updateProduct(index, name, description, price, category, availability) {
    products[index].productName = name;
    products[index].description = description;
    products[index].price = price;
    products[index].category = category;
    products[index].availability = availability;
    
    // Reset editing state
    isEditing = false;
    editingIndex = -1;
    submitBtn.textContent = 'Add Product';
    
    alert(`Product "${name}" has been updated successfully!`);
    console.log('Product updated:', products[index]);
}

// Delete product using splice() method
function deleteProduct(index) {
    const product = products[index];
    
    if (confirm(`Are you sure you want to delete "${product.productName}"?`)) {
        products.splice(index, 1);
        displayProducts();
        saveToLocalStorage();
        
        alert(`Product "${product.productName}" has been deleted successfully!`);
        console.log('Product deleted. Remaining products:', products);
    }
}

// Edit product
function editProduct(index) {
    const product = products[index];

    document.getElementById('productName').value = product.productName;
    document.getElementById('productDescription').value = product.description;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productCategory').value = product.category;
    document.getElementById('productAvailability').checked = product.availability;
    
    // Set editing state
    isEditing = true;
    editingIndex = index;
    submitBtn.textContent = 'Update Product';
    
    // Clear any error messages
    clearErrorMessages();
    
    // Scroll to form
    document.querySelector('.form-container').scrollIntoView({ behavior: 'smooth' });
}

// Display products using innerHTML
function displayProducts(productsToShow = products) {
    if (productsToShow.length === 0) {
        productsTableBody.innerHTML = '';
        noProductsMessage.style.display = 'block';
        return;
    }
    
    noProductsMessage.style.display = 'none';
    
    let html = '';
    
    productsToShow.forEach((product, index) => {
        // Get original index for edit/delete operations
        const originalIndex = products.indexOf(product);
        
        // Use conditional statements for row colors
        let rowClass = '';
        let categoryClass = '';
        
        switch (product.category) {
            case 'Electronics':
                rowClass = 'electronics-row';
                categoryClass = 'electronics-category';
                break;
            case 'Clothing':
                rowClass = 'clothing-row';
                categoryClass = 'clothing-category';
                break;
            case 'Books':
                rowClass = 'books-row';
                categoryClass = 'books-category';
                break;
            case 'Home & Garden':
                rowClass = 'home-garden-row';
                categoryClass = 'home-garden-category';
                break;
            case 'Sports':
                rowClass = 'sports-row';
                categoryClass = 'sports-category';
                break;
            default:
                rowClass = '';
                categoryClass = '';
        }
        
        const availabilityText = product.availability ? 'Available' : 'Not Available';
        const availabilityClass = product.availability ? 'available' : 'unavailable';
        
        html += `
            <tr class="${rowClass}">
                <td>${product.productName}</td>
                <td class="description" title="${product.description}">${product.description}</td>
                <td class="price">$${product.price.toFixed(2)}</td>
                <td><span class="category ${categoryClass}">${product.category}</span></td>
                <td class="${availabilityClass}">${availabilityText}</td>
                <td class="action-buttons">
                    <button class="update-btn" onclick="editProduct(${originalIndex})">Edit</button>
                    <button class="delete-btn" onclick="deleteProduct(${originalIndex})">Delete</button>
                </td>
            </tr>
        `;
    });
    
    productsTableBody.innerHTML = html;
}

// Search products by name or category***************************
function searchProducts() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        displayProducts();
        return;
    }
    
    const filteredProducts = products.filter(product => 
        product.productName.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
    
    displayProducts(filteredProducts);
    
    if (filteredProducts.length === 0) {
        alert('No products found matching your search criteria.');
    }
    
    console.log('Search results:', filteredProducts);
}

// Filter products by category
function filterProducts() {
    const selectedCategory = categoryFilter.value;
    
    if (selectedCategory === '') {
        displayProducts();
        return;
    }
    
    const filteredProducts = products.filter(product => 
        product.category === selectedCategory
    );
    
    displayProducts(filteredProducts);
    console.log('Filtered products:', filteredProducts);
}

// Clear search 
function clearSearch() {
    searchInput.value = '';
    categoryFilter.value = '';
    displayProducts();
}

// Clear form
function clearForm() {
    document.getElementById('productName').value = '';
    document.getElementById('productDescription').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productCategory').value = '';
    document.getElementById('productAvailability').checked = false;
    
    // Clear error messages
    clearErrorMessages();
    
    // Reset editing state
    isEditing = false;
    editingIndex = -1;
    submitBtn.textContent = 'Add Product';
}

// Save to localStorage
function saveToLocalStorage() {
    localStorage.setItem('products', JSON.stringify(products));
}

// Load from localStorage
function loadFromLocalStorage() {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
        products = JSON.parse(savedProducts);
    }
}

//to start the app 
function init() {
    loadFromLocalStorage();
    displayProducts();
    console.log('Product Management System initialized');
    console.log('Loaded products from localStorage:', products);
}