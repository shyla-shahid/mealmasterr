const body = document.querySelector('body');
  const searchform=document.querySelector('form')
  const startbtn=document.getElementById('searchbtn')
  let searchresultdiv=document.querySelector('.searchresult')
  const container=document.querySelector('.container')
  let searchQuery = "";
  const APP_ID='9faa4809';
  const APP_key='a095798c8e95c84171db1f869914d0ef	';
  

  searchbtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    body.classList.add('hide-background');
    

    searchQuery = searchform.querySelector('input').value;
    fetchAPI();
  });
  
searchform.addEventListener("submit", (e) => {
  e.preventDefault();
  
  body.classList.add('hide-background');

  searchQuery = e.target.querySelector("input").value;
 fetchAPI();
})
async function fetchAPI() {
  const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=30`;
  const response = await fetch(baseURL);
  const data = await response.json();
  console.log(data.hits);
  generateHTML(data.hits);
}
function generateHTML(results) {
  
  let generatedHTML = "";
  results.map((result) => {
    generatedHTML += `
    <div class="item">
    <img src="${result.recipe.image}">
    <div class="flexcontainer">
        <h1 class="title">${result.recipe.label}</h1>
        <a class="view-btn" href="${result.recipe.url}" target="_blank">View result</a>
    </div>
    <p class="itemdata">Calories:${result.recipe.calories.toFixed(2)}</p>
    <p class="itemdata">Health Label:${result.recipe.healthLabels}</p>
</div>
    `;
  });
  searchresultdiv.innerHTML = generatedHTML;
}