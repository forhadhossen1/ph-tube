const handleCategory = async () => {
    const response = await fetch(` https://openapi.programming-hero.com/api/videos/categories`);
    const data = await response.json();
    const videos = data.data;
    // console.log(videos);

    const tabContainer = document.getElementById('tab-container');
    videos.slice(0, 4).forEach(category => {
        const div = document.createElement('div');
        div.innerHTML = `
            <button onclick = "handleVideos('${category.category_id}')" class="btn px-6">${category.category}</button>
       `;

        tabContainer.appendChild(div);
    });
};

const handleVideos = async (categoryId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    // console.log(categoryId);
    const data = await response.json();
    const allData = data.data;
    console.log(allData);




    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    const noContainer = document.getElementById('no-video');
    noContainer.innerHTML = '';

    if (allData.length === 0) {
        const noVideo = document.createElement('div');
        noVideo.innerHTML = `
        <div class="text-center items-center">
        <div class="flex justify-center py-5"><img src="Icon.png" alt="no video worning"></div>
        <h2 class = "text-3xl py-4 font-bold">Oops !! Sorry, There is no <br> content here</h2>
    </div>
        `;
        noContainer.appendChild(noVideo);
    }



    else {
        allData.forEach((video) => {
            console.log(video?.others?.posted_date);
            const div = document.createElement('div');
            div.innerHTML = `
        <div class="card bg-base-100">

        <figure>
            <img src="${video?.thumbnail}" alt="video thumble" class="rounded-lg h-72 w-full" />
            ${video?.others?.posted_date ? `
            <div class="absolute bottom-0 mb-40 right-3 rounded-lg bg-gray-600">
            <p class="text-center">${convertToHoursMinutes(video.others.posted_date)}</p>
            </div>` : ''}
        </figure>



    <div class="flex">
        <div class="py-3 px-2">
            <img src="${video?.authors[0]?.profile_picture || ''}" alt="" class="w-12 h-12 rounded-full">
        </div>

        
        <div class="">
            <h2 class="card-title py-3">${video?.title}</h2>
            <h4 class="text-xl py-3">
            ${video?.authors[0]?.profile_name || ''}

            <div class="${video?.authors[0]?.verified ? 'badge badge-primary h-5 w-5 rounded-full' : ''}">
            ${video?.authors[0]?.verified ? '✓ ' : ''}
          </div>
            </h4>

            <div>
                <h5 class="text-left py-3">${video?.others?.views ? video.others.views : " "} views
                </h5>
            </div>
        </div>
    </div>
</div>
        `;
            cardContainer.appendChild(div);
        });
    }
}

handleCategory();
handleVideos("1000");

convertToHoursMinutes = (postedDate) => {
    const hours = Math.floor(postedDate / 3600);
    const minutes = hours % 60;

    const timeString = `${hours}:hrs ${minutes}:min ago`;

    return timeString;
}