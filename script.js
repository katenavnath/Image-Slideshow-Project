document.addEventListener("DOMContentLoaded", function () {
    let inputFile = document.getElementById("imageInput");
    let startSliderBtn = document.getElementById("startSlider");
    let sliderDom = document.querySelector(".carousel .list");
    let thumbnailBorderDom = document.querySelector(".carousel .thumbnail");
    let nextDom = document.getElementById("next");
    let prevDom = document.getElementById("prev");
    let carouselDom = document.querySelector(".carousel");
    let timeRunning = 3000;
    let timeAutoNext = 7000;
    let runTimeOut;
    let runNextAuto;
    let images = [];

    inputFile.addEventListener("change", function (event) {
        let files = event.target.files;
        if (files.length > 0) {
            for (let file of files) {
                let imgURL = URL.createObjectURL(file);
                images.push(imgURL);

                let sliderItem = document.createElement("div");
                sliderItem.classList.add("item");
                sliderItem.innerHTML = `
                    <img src="${imgURL}" alt="Uploaded Image">
                    <div class="content">
                        <div class="author">User</div>
                        <div class="title"></div>
                        <div class="topic"></div>
                        <div class="des">This is a newly added image</div>
                        <div class="buttons">
                            <button>Like</button>
                            <button>Add Favorite</button>
                        </div>
                    </div>
                `;
                sliderDom.appendChild(sliderItem);

                let thumbItem = document.createElement("div");
                thumbItem.classList.add("item");
                thumbItem.innerHTML = `
                    <img src="${imgURL}" alt="Thumbnail">
                    <div class="content">
                        <div class="title">Thumbnail</div>
                        <div class="description">Newly uploaded</div>
                    </div>
                `;
                thumbnailBorderDom.appendChild(thumbItem);
            }
            startSliderBtn.style.display = "block";
        }
    });

    startSliderBtn.addEventListener("click", function () {
        if (sliderDom.children.length > 0) {
            carouselDom.classList.add("active");
            startAutoSlide();
        } else {
            alert("Please upload at least one image.");
        }
    });

    nextDom.onclick = function () {
        showSlider("next");
    };

    prevDom.onclick = function () {
        showSlider("prev");
    };

    function showSlider(type) {
        let sliderItemsDom = sliderDom.querySelectorAll(".item");
        let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll(".item");

        if (sliderItemsDom.length > 0) {
            if (type === "next") {
                sliderDom.appendChild(sliderItemsDom[0]);
                thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
                carouselDom.classList.add("next");
            } else {
                sliderDom.prepend(sliderItemsDom[sliderItemsDom.length - 1]);
                thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
                carouselDom.classList.add("prev");
            }

            clearTimeout(runTimeOut);
            runTimeOut = setTimeout(() => {
                carouselDom.classList.remove("next", "prev");
            }, timeRunning);

            startAutoSlide();
        }
    }

    function startAutoSlide() {
        clearTimeout(runNextAuto);
        runNextAuto = setTimeout(() => {
            nextDom.click();
        }, timeAutoNext);
    }
});

