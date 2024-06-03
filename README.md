# Amazon Product Scraper

Welcome to the Amazon Product Scraper! This application allows you to scrape product listings from Amazon based on a given keyword.

## Table of Contents

- [Features](#features)
- [Dependencies](#dependencies)
- [Setup](#setup)
- [Usage](#usage)

## Features

- Scrapes product listings from Amazon for a given keyword.
- Provides product title, rating, number of reviews, and image URL.
- Interactive error handling for better user experience.

## Dependencies

- [axios](https://www.npmjs.com/package/axios): Promise-based HTTP client for the browser and Node.js.
- [cors](https://www.npmjs.com/package/cors): Connect/Express middleware for handling Cross-Origin Resource Sharing (CORS).
- [express](https://www.npmjs.com/package/express): Fast, unopinionated, minimalist web framework for Node.js.
- [jsdom](https://www.npmjs.com/package/jsdom): JavaScript implementation of various web standards, for use with Node.js.
- [nodemon](https://www.npmjs.com/package/nodemon): Automatically restarts the server when changes are detected.

## Setup

Follow these steps to set up the Amazon Product Scraper:

1. Clone the repository:
   git clone https://github.com/your-username/amazon-product-scraper.git

2. Navigate to the project directory:
   cd amazon-product-scraper/backend

3. Install dependencies:
   npm install

## Usage

After setting up the project, you can run the application locally:

1. Start the backend server:
   npm start
   This will start the backend server at http://localhost:3000.

2. Open `frontend/index.html` in your browser to use the frontend interface.

3. Enter a search keyword in the input field and click the "Scrape" button to fetch Amazon product listings.

4. View the results displayed on the webpage. If there are any errors, an interactive popup will appear to notify you.
