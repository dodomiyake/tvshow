const form = document.querySelector("#searchForm");
const showData = document.querySelector("#showData");
const showContainer = document.querySelector("#showImg");

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const searchTerm = form.elements.query.value;
  console.log(searchTerm);
  const config = { params: { q: searchTerm}}
  const res = await axios.get(`https://api.tvmaze.com/search/shows`, config );
  console.log(res.data[0].show.name);
  console.log(res.data);
  showImg.innerHTML = '';
  getShows(res.data);
  form.elements.query.value = '';
  
});

const getShows = (shows) => {
  for (let result of shows) {
    if (result.show.image) {
      
      const showColumn = document.createElement("DIV");
      const showCard = document.createElement("DIV");
      const showCardImg = document.createElement("DIV");
      const showFigure = document.createElement("FIGURE");
      const showLink = document.createElement("A");
      const showCardContent = document.createElement("DIV");
      const showContent = document.createElement("DIV");
      
      const imgs = document.createElement("IMG");
      const showName = document.createElement('P')
      const showYear = document.createElement('P')

      showName.innerText = result.show.name
      showYear.innerText = result.show.premiered.slice(0,4)

      showColumn.classList.add('column', 'is-4-desktop', 'is-3-widescreen', 'is-half-tablet')
      showCard.classList.add('card')
      showCardImg.classList.add('card-image')
      showFigure.classList.add('image')
      showCardContent.classList.add('card-content')
      showContent.classList.add('content')
      showName.classList.add('title', 'is-5')
      showYear.classList.add('subtitle', 'is-6', 'is-family-primary')

      
      imgs.src = result.show.image.medium;
      imgs.classList.add('image', 'is-200x200')      
      
      
      
      showContent.append(showName)
      showContent.append(showYear)

      showCardContent.append(showContent)
      
      showLink.append(imgs);

      showFigure.append(showLink)
      
      showCardImg.append(showFigure)

      showCard.append(showCardImg);
      
      showColumn.append(showCard);
      showColumn.append(showCardContent)

      showContainer.append(showColumn)
      
    }
  }
};


