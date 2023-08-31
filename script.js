const handleCategory = async () => {
    const response = await fetch(` https://openapi.programming-hero.com/api/videos/categories`);
    const data = await response.json();
    const videos = data.data[0];
    console.log(videos);
};

handleCategory();