import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import backgroundImage from '../assets/background.jpg'; // Ensure this path is correct

const SearchForm = () => {
  const [productType, setProductType] = useState('');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [discount, setDiscount] = useState('');
  const [filter, setFilter] = useState('lowest');

  const brandOptions = {
    Shoes: ['PUMA', 'ADIDAS', 'NIKE', 'CAMPUS', 'Skechers', 'CROCS', 'Reebok', 'New Balance', 'Converse', 'Vans'],
    "Mobile Phones": ['Samsung', 'Apple', 'OnePlus', 'Xiaomi', 'Realme', 'Nokia', 'Oppo', 'Vivo', 'Google', 'Sony'],
    Laptops: ['HP', 'Dell', 'Lenovo', 'Asus', 'Acer', 'Microsoft', 'Razer', 'Apple', 'Toshiba', 'LG'],
    Watches: ['Fossil', 'Casio', 'Timex', 'Titan', 'Sonata', 'Seiko', 'Apple', 'Samsung', 'Garmin', 'Fitbit'],
    Headphones: ['Boat', 'Sony', 'JBL', 'Sennheiser', 'Bose', 'Apple', 'Beats', 'Audio-Technica', 'Philips', 'Skullcandy'],
    TV: ['Samsung', 'LG', 'Sony', 'Panasonic', 'TCL', 'Philips', 'OnePlus', 'Xiaomi', 'Mi', 'Vizio'],
    Refrigerator: ['Samsung', 'LG', 'Whirlpool', 'Godrej', 'Haier', 'Bosch', 'Panasonic', 'Electrolux', 'Miele', 'Frigidaire'],
    Furniture: ['IKEA', 'Nilkamal', 'Godrej Interio', 'Durian', 'Urban Ladder', 'Pepperfry', 'HomeTown', 'Fabindia', 'Woodsworth', 'Sleepwell'],
    Clothing: ['Levi\'s', 'Puma', 'Adidas', 'Zara', 'H&M', 'Nike', 'Reebok', 'Tommy Hilfiger', 'Calvin Klein', 'United Colors of Benetton'],
    All: [],
  };

  const handleProductTypeChange = (e) => {
    setProductType(e.target.value);
    setSelectedBrands([]);
  };

  const handleBrandChange = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let searchUrl = `https://www.flipkart.com/search?q=${productType}&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off`;

    if (productType !== 'All' && selectedBrands.length > 0) {
      selectedBrands.forEach((b) => {
        searchUrl += `&p[]=facets.brand%255B%255D%3D${encodeURIComponent(b)}`;
      });
    }

    if (discount) {
      searchUrl += `&p[]=facets.discount_range_v1%255B%255D%3D${discount}%25+or+more`;
    }

    if (filter === 'lowest') {
      searchUrl += '&sort=price_asc';
    } else if (filter === 'highest') {
      searchUrl += '&sort=price_desc';
    }

    window.open(searchUrl, '_blank');
  };

  useEffect(() => {
    // Set background image on the body
    document.body.style.backgroundImage = `url(${backgroundImage})`;
    document.body.style.backgroundSize = 'cover'; // Cover the entire viewport
    document.body.style.backgroundPosition = 'center'; // Center the image
    document.body.style.backgroundRepeat = 'no-repeat'; // Do not repeat the image
    document.body.style.margin = '0'; // Ensure no margin
    document.body.style.height = '100vh'; // Full height
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-lg transform transition-transform duration-500 hover:scale-105">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Flipkart Scrapping Tool</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-lg font-semibold mb-2">Product Type</label>
            <select
              value={productType}
              onChange={handleProductTypeChange}
              className="block appearance-none w-full border border-gray-300 rounded-lg px-4 py-3 leading-tight focus:outline-none focus:border-purple-500 transition duration-200"
              required
            >
              <option value="">Select Product Type</option>
              {Object.keys(brandOptions).map((product) => (
                <option key={product} value={product}>{product}</option>
              ))}
            </select>
          </div>

          {productType && productType !== 'All' && (
            <div>
              <label className="block text-gray-700 text-lg font-semibold mb-2">Brand</label>
              <div className="grid grid-cols-2 gap-4">
                {brandOptions[productType].map((brand) => (
                  <label key={brand} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => handleBrandChange(brand)}
                      className="mr-2 leading-tight"
                    />
                    <span className="text-gray-700">{brand}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="block text-gray-700 text-lg font-semibold mb-2">Discount (% or more)</label>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="shadow border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-purple-500 transition duration-200"
              placeholder="e.g., 50"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-lg font-semibold mb-2">Price Filter</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="block appearance-none w-full border border-gray-300 rounded-lg px-4 py-3 leading-tight focus:outline-none focus:border-purple-500 transition duration-200"
            >
              <option value="lowest">Lowest</option>
              <option value="highest">Highest</option>
            </select>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-500 to-blue-600 hover:bg-gradient-to-l text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center w-full"
            >
              <FaSearch className="mr-2" />
              Search on Flipkart
            </button>
          </div>
        </form>

        {/* Footer Section */}
        <footer className="mt-8 text-center text-gray-600 text-lg">
          Developed by - <strong>toxicandid</strong>
        </footer>
      </div>
    </div>
  );
};

export default SearchForm;
