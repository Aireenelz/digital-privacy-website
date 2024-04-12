// variables
const newsQuery = document.getElementById("news-query");
const newsType = document.getElementById("news-title");
const newsdetails = document.getElementById("news-exceprt");

// variable to store news data
var newsDataArr = [];

// API
const API_KEY = "";
const TECHNOLOGY_NEWS = "https://newsapi.org/v2/top-headlines?country=us&category=technology&pageSize=24&apiKey=";
const SEARCH_NEWS = "https://newsapi.org/v2/everything?q=";

// Get technology news when resource page is loaded
window.onload = function() {
    fetchTechnologyNews();
};

// Fetch technology news
const fetchTechnologyNews = async () => {
    const response = await fetch(TECHNOLOGY_NEWS + API_KEY);
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        // Handle errors
        console.log(response.status, response.statusText);
        return;
    }

    displayNews();
};

const fetchQueryNews = async() => {
    if(newsQuery.value == null) {
        return;
    }
    
    const response = await fetch(SEARCH_NEWS + encodeURIComponent(newsQuery.value) + "&apiKey=" + API_KEY);
    newsDataArr = [];

    if(response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        console.log(myJson);
        newsDataArr = myJson.articles;
    } else {
        // Handle errors
        console.log(response.status, response.statusText);
    }

    displayNews();
}

// Display the news that has been fetched
function displayNews() {
    const newsContent = document.querySelector('.news-content .cards');
    newsContent.innerHTML = '';

    if (newsDataArr.length === 0) {
        // Handle case where no news data is available
        newsContent.innerHTML = "<h5>No data found.</h5>";
        return;
    }

    newsDataArr.forEach(news => {
        const card = document.createElement('li');
        card.className = 'card';

        const img = document.createElement('img');
        img.src = news.urlToImage ? news.urlToImage : 'images/default-thumbnail.jpg';
        img.alt = 'News Thumbnail';
        card.appendChild(img);

        const title = document.createElement('h2');
        title.textContent = news.title;
        card.appendChild(title);

        const excerpt = document.createElement('p');
        excerpt.textContent = news.description ? news.description : 'No description available.';
        card.appendChild(excerpt);

        const readMoreLink = document.createElement('a');
        readMoreLink.href = news.url;
        readMoreLink.textContent = 'Read More';
        readMoreLink.className = 'normal-button';
        card.appendChild(readMoreLink);

        // Append the card to the news content
        newsContent.appendChild(card);
    });
}