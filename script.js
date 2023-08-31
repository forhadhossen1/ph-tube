const handleCategory = async () => {
    const response = await fetch(` https://openapi.programming-hero.com/api/videos/categories`);
    const data = await response.json();
    const videos = data.data;
    // console.log(videos);

    const tabContainer = document.getElementById('tab-container');
    videos.slice(0, 4).forEach(category => {
       const div = document.createElement('div') ;
       div.innerHTML = `
            <button onclick = "handleVideos('${category.category_id}')" class="btn px-6">${category.category}</button>
       `;

       tabContainer.appendChild(div);
    });
};

const handleVideos = async (categoryId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
    const data = await response.json();
    const video = data.data;
    console.log(video);
}

handleCategory();