const categoriesList = [];


function renderCategoriesList(){
  let categoriesListHTML = '';

  categoriesList.forEach((categorieObj, index) => {
    const {categoryName} = categorieObj;
    const html = `<div class="category-container">
      <div class="categorie-title">
        <span class="title-text">${categoryName}</span>
        <div class="buttons-container">
          <button class="category-delete-button">X</button>
          <button class="category-modify-button">M</button>
        </div>
      </div>
      <button class="task-add-button">+</button>
    </div>`
    categoriesListHTML += html;
  });
  document.querySelector('.js-categories-container').innerHTML = categoriesListHTML;
}

renderCategoriesList()

document.querySelector('.js-category-add-button').addEventListener('click', () => {
  document.querySelector('.js-title-input-popup').style.visibility = 'visible';
  document.querySelector('.js-title-too-long-error').style.visibility = 'hidden';
  document.querySelector('.js-title-input').value = '';
})

document.querySelector('.js-title-input-button-confirm').addEventListener('click', () => {
  addCategory();
})

document.querySelector('.js-title-input-button-deny').addEventListener('click', () => {
  document.querySelector('.js-title-input-popup').style.visibility = 'hidden';
  document.querySelector('.js-title-too-long-error').style.visibility = 'hidden';
})

function addCategory(){
  const categoryName = document.querySelector('.js-title-input').value;
  if(categoryName.length >= 25){
    document.querySelector('.js-title-too-long-error').style.visibility = 'visible';
  }else{
    categoriesList.push({categoryName})
    document.querySelector('.js-title-input-popup').style.visibility = 'hidden';
    document.querySelector('.js-title-too-long-error').style.visibility = 'hidden';
    renderCategoriesList()
  }
}