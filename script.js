const apiKey = 'a3df21d5b9bb4143991212ebcd0ea680';

const blogContainer = document.getElementById("blog-container");

// Start search for code
const searchFeild = document.getElementById('search-input') // input
const searchButton = document.getElementById('search-button') // button

async function fetchRandom() {
    try {
        // create url
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apiKey}`;

        //server down hole website crush hobe na
        const response = await fetch(apiUrl);
        const data = await response.json();
        // console.log(data);
        return data.articles;

    } catch (error) {
        console.error("Error fetching rrandom news", error);
        return []
    }
}

//search button click event
searchButton.addEventListener("click", async () => {
    const query = searchFeild.value.trim();
    if (query !== "") {
        try {
            const articles = await fetchNewsQuery(query);
            displayBlogs(articles);
        } catch (error) {
            console.log("Error fetching news by query", error);
        }
    }
});

async function fetchNewsQuery(query) {
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error fetching news by query", error);
        return [];
    }
}
// create html
function displayBlogs(articles) {
    blogContainer.innerHTML = "";
    articles.forEach((articles) => {
        //create : <div class="blog-card"></div>
        const blogCard = document.createElement
            ("div")
        blogCard.classList.add("blog-card");
        // create image
        const img = document.createElement("img")
        img.src = articles.urlToImage;
        img.alt = articles.image
        // create h2
        const title = document.createElement("h2")
        // iska matlab 130 carecter cross hone per h2 .... show hoga
        const truncatedTitle =
            articles.title.length > 30
                ? articles.title.slice(0, 30) + "...."
                : articles.title;
        title.textContent = truncatedTitle;

        // create <p></p>
        const description = document.createElement("p")
        // iska matlab 130 carecter cross hone per paragraph ... show hoga
        const truncatedDescription =
            articles.description.length > 130
                ? articles.description.slice(0, 130) + "..."
                : articles.description;
        description.textContent = truncatedDescription;
        // description.textContent = articles.description

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        //if you click new then open new tab
        blogCard.addEventListener("click", () => {
            window.open(articles.url, "_blank");
        })
        blogContainer.appendChild(blogCard);
    })
}

(async () => {
    try {
        const articles = await fetchRandom();
        displayBlogs(articles)
    } catch (error) {
        console.error("Error fetching rrandom news", error);
    }
})();