import { refs } from "./data.js";
export function createMarkup(imgArr) {
  
  imgArr.forEach(el => {
      refs.galleryEl.insertAdjacentHTML(

          'beforeEnd',
          `<a class="photo-card" href="${el.largeImageURL}">
          <div>

          
          <img src=${el.webformatURL} alt=${el.tags} title=${el.tags} loading="lazy" width='480' height='320'/>
          </div>

          <div class="info">
            <p class="info-item">
              <b>Likes: ${el.likes}</b>
            </p>
            <p class="info-item">
              <b>Views: ${el.views}</b>
            </p>
            <p class="info-item">
              <b>Comments: ${el.comments}</b>
            </p>
            <p class="info-item">
              <b>Downloads: ${el.downloads}</b>
            </p>
          </div>
        </a>`
      );
    });
}
