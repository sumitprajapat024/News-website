const API_KEY = 'd762d5bd701249f9accfbb6f86c5cb2e';
const NEWS_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${'d762d5bd701249f9accfbb6f86c5cb2e'}`;

// Toggle Dark Mode
const darkModeToggle = document.getElementById('darkModeToggle');
const darkModeIcon = document.getElementById('darkModeIcon');

darkModeToggle.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    // Change icon based on the mode
    darkModeIcon.className = isDarkMode ? 'fas fa-moon' : 'fas fa-sun';
    darkModeToggle.textContent = isDarkMode ? ' Light Mode' : ' Dark Mode';
    document.querySelector('.navbar').classList.toggle('navbar-dark-mode');
    document.querySelector('.navbar').classList.toggle('navbar-light-mode');
});


const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3000;

// Fetch news data from the API
async function fetchNews() {
  try {
    const response = await fetch(NEWS_URL);
    const data = await response.json();

    if (data.status === 'ok') {
      displayNews(data.articles);
    }
  } catch (error) {
    console.error('Error fetching news:', error);
  }
}

// Display news on the webpage
function displayNews(articles) {
  const newsContainer = document.getElementById('news-container');
  newsContainer.innerHTML = ''; // Clear previous news

  articles.forEach((article) => {
    const newsItem = document.createElement('div');
    newsItem.classList.add('news-item');

    const newsTitle = document.createElement('h2');
    newsTitle.classList.add('news-title');
    newsTitle.textContent = article.title;

    const newsDescription = document.createElement('p');
    newsDescription.textContent = article.description;

    const newsLink = document.createElement('a');
    newsLink.href = article.url;
    newsLink.textContent = 'Read more';
    newsLink.target = '_blank';

    newsItem.appendChild(newsTitle);
    newsItem.appendChild(newsDescription);
    newsItem.appendChild(newsLink);

    newsContainer.appendChild(newsItem);
  });
}

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// API route to fetch news
app.get('/api', async (req, res) => {
  const query = req.query.q || ''; // Assuming there's a query parameter
  const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching news from API:', error);
    res.status(500).json({ error: 'Error fetching news' });
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

// Call the function to fetch news on page load
fetchNews();
