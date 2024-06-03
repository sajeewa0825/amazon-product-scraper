const express = require('express');
const axios = require('axios');
const { JSDOM } = require('jsdom');
const cors = require("cors");

const app = express();
const port = 3000;

// Enable CORS
app.use(cors());

// Endpoint to scrape Amazon search results
app.get('/api/scrape', async (req, res) => {
    const keyword = req.query.keyword;

    // Check if the keyword query parameter is missing
    if (!keyword) {
        return res.status(400).json({ error: 'Keyword is required' });
    }

    try {
        // Fetch the Amazon search results page
        const response = await axios.get(`https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`);

        // Parse the HTML using JSDOM
        const dom = new JSDOM(response.data);

        // Extract the document object from the JSDOM instance
        const document = dom.window.document;

        // Extract product elements from the search results
        const products = [];
        const productElements = document.querySelectorAll('.s-main-slot .s-result-item');

        // Check if no products were found
        if (productElements.length === 0) {
            return res.status(404).json({ error: 'No products found' });
        }

        // Extract product data from each element
        productElements.forEach((productElement) => {
            const titleElement = productElement.querySelector('h2 a span');
            const ratingElement = productElement.querySelector('.a-icon-alt');
            const reviewsElement = productElement.querySelector('.a-size-small .a-link-normal');
            const imageElement = productElement.querySelector('.s-image');

            const title = titleElement ? titleElement.textContent : null;
            const rating = ratingElement ? ratingElement.textContent : null;
            const reviews = reviewsElement ? reviewsElement.textContent : null;
            const imageUrl = imageElement ? imageElement.src : null;

            if (title) {
                products.push({
                    title,
                    rating,
                    reviews,
                    imageUrl
                });
            }
        });

        res.json(products);

    } catch (error) {
        if (error.response) {
            return res.status(error.response.status).json({ error: 'Failed to fetch data from Amazon' });
        } else if (error.request) {
            return res.status(500).json({ error: 'No response received from Amazon' });
        } else {
            return res.status(500).json({ error: 'Failed to scrape Amazon' });
        }
    }
});

// Handle 404 errors
app.all("*", (req, res, next) =>{
    res.status(404).json({
      status:404,
      message:"404 not found"
    })
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
