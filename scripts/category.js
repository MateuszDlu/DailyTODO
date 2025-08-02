const categoriesList = [];


function renderCategoriesList(){
  let categoriesListHTML = '';

  categoriesList.forEach((categorieObj, index) => {
    const {name} = categorieObj;
    const html = `<div class="category-container">
      <div class="categorie-title">
        <span class="title-text">${name}</span>
        <div class="buttons-container">
          <button class="category-delete-button">X</button>
          <button class="category-modify-button">M</button>
        </div>
      </div>
      <button class="task-add-button">+</button>
    </div>`
    categoriesListHTML += html;
  });
  document.querySelector('.js-categories-container').innerHTML = categoriesListHTML + `<button class="category-add-button js-category-add-button">+</button>`;
}

renderCategoriesList()

document.querySelector('.js-category-add-button').addEventListener('click', () => {
  addCategory();
})


function addCategory(){
  const name = ''
  categoriesList.push({name})
  renderCategoriesList()
}