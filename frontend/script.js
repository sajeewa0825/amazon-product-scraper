// Ensure the DOM content is fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    const scrapeButton = document.getElementById('scrapeButton');
    const keywordInput = document.getElementById('keyword');
    const loadingDiv = document.getElementById('loading');
    const resultsDiv = document.getElementById('results');
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modalMessage');
    const closeModal = document.getElementById('closeModal');

    // Function to show the modal with a specific message
    function showModal(message) {
        modalMessage.textContent = message;
        modal.style.display = "block";
    }

    // Function to hide the modal
    function hideModal() {
        modal.style.display = "none";
    }

    // Close modal when the close button is clicked
    closeModal.onclick = function() {
        hideModal();
    };

    // Close modal when clicking outside of the modal content
    window.onclick = function(event) {
        if (event.target === modal) {
            hideModal();
        }
    };

    // Close modal when pressing the Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            hideModal();
        }
    });

    // Event listener for the scrape button
    scrapeButton.addEventListener('click', () => {
        const keyword = keywordInput.value;

        // Show modal if the keyword input is empty
        if (!keyword) {
            showModal('Please enter a search keyword.');
            return;
        }

        // Show loading indicator
        loadingDiv.classList.remove('hidden');
        resultsDiv.innerHTML = '';

        // Fetch data from the backend API
        fetch(`http://localhost:3000/api/scrape?keyword=${encodeURIComponent(keyword)}`)
            .then(response => {
                loadingDiv.classList.add('hidden');
                if (!response.ok) {
                    return response.json().then(errorData => {
                        throw new Error(errorData.error);
                    });
                }
                return response.json();
            })
            .then(data => {
                // Show modal if no products were found
                if (data.length === 0) {
                    showModal('No products found.');
                } else {
                    // Display the product data
                    data.forEach(product => {
                        const productDiv = document.createElement('div');
                        productDiv.className = 'product';

                        const image = document.createElement('img');
                        image.src = product.imageUrl;
                        productDiv.appendChild(image);

                        const detailsDiv = document.createElement('div');
                        const title = document.createElement('h2');
                        title.textContent = product.title;
                        detailsDiv.appendChild(title);

                        if (product.rating) {
                            const rating = document.createElement('p');
                            rating.textContent = `Rating: ${product.rating}`;
                            detailsDiv.appendChild(rating);
                        }

                        if (product.reviews) {
                            const reviews = document.createElement('p');
                            reviews.textContent = `Reviews: ${product.reviews}`;
                            detailsDiv.appendChild(reviews);
                        }

                        productDiv.appendChild(detailsDiv);
                        resultsDiv.appendChild(productDiv);
                    });
                }
            })
            .catch(error => {
                // Show modal with error message
                loadingDiv.classList.add('hidden');
                showModal(error.message);
                console.error('Error fetching data:', error);
            });
    });
});
