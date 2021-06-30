# React - Dynamic Search

## Description

This is my solution to a take-home assignment done in couple of days in spare time.<br />
It features a finished React + TypeScript app with unit tests.<br />

## Notes
Original csv file was parsed into JSON using [CSVJSON](https://www.npmjs.com/package/csvjson-csv2json) with extra regex substitutions to transform string array of images:

```
s/additional_image_link": \(.*\)/additional_image_link": [\1]/g
s/jpg, /jpg", "/g
```

Product thumbnails are fetched on demand using [`<img loading=lazy>`](https://web.dev/browser-level-image-lazy-loading/)<br />
Partial offline mode and reliable image caching are implemented via CRA's Service Worker with [tweaks](https://create-react-app.dev/docs/making-a-progressive-web-app/#customization) to support external images.
This app won't work completely offline due to chunk with JSON data being bigger than CRA's hardwired [cachable size limit](https://github.com/cra-template/pwa/issues/13), but it will keep working offline if chunk was already loaded. 

## Available Scripts

This is a [CRA](https://create-react-app.dev/) project. In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run deploy`

Deploys the app via GitHub Pages

## Task

The general idea of this coding challenge is to implement a basic auto-complete list which will be updated dynamically while the user types in a search box. The result will be comprised of products containing information like title, price and a couple of images.

### Task Description
1. Parse and load all the items from the provided product feed file (products.csv). The file contains around 20K products with the following basic product information:
	* **title**: the title of the product.
	* **gtin**: a unique identifier.
	* **gender**: The gender of that particular product can take 3 values (female, male, unisex).
	  Some falsely values in this column are inserted on purpose to see how you deal with error cases. That said, it's completely up to you to decide how you treat these rows.
	* **price**: The normal retail price of the product.
	* **sale_price**: The price of the product after a discount is applied.
	* **image_link**: The main image of the product.
	* **additional_image_link**: A comma-separated list of additional images (might be an empty field).
2. Create a web page which at its very top will contain a search box. The latter will have an auto-complete feature which will display all the products in a grid list below the search component.
3. The list should be updated on every key-press event.
4. A pagination limit of 100 elements should be applied to the results.
5. Every item of the list should contain the title, gtin, gender, the two prices (price and sale_price) together with a thumbnail of the `image_link`.
6. Each item should be expandable and on mouse click it should reveal the rest of the images as defined in the `additional_image_link`
7. The specifics of the page layout as well as the design of the individual result items is up to you.

Optional:
1. Create some basic filtering by `gender` and by `sale_price`. Specifically, create a drop down containing the three options for gender (male, female and unisex) and a check-box which once checked will include only items that are currently on sale (sale_price < price). The update on the resulting list must happen dynamically on selection.
2. Gain extra points if you fetch the images asynchronously.
3. Additional points for making the images cache-able and displayable in off-line mode, i.e. while off-line, make sure that all the images that have already been fetched from previous queries to be immediate accessible.
