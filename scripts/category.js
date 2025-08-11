const categoriesList = [{categoryName: 'category name', tasks: ['task1', 'task2', 'task3']}];


function renderCategoriesList(){
  let categoriesListHTML = '';

  categoriesList.forEach((categorieObj, index) => {
    let categoryTasksHTML = ``;
    categorieObj.tasks.forEach((task) => {
      const taskHTML = `
        <div class="task-container">
          <span class="task-text js-task-text">${task}</span>
          <div class="buttons-container">
            <button class="task-cross-button js-task-cross-button">-</button>
            <button class="task-modify-button js-task-modify-button">M</button>
          </div>
        </div>`
      categoryTasksHTML += taskHTML;
    })
    const {categoryName} = categorieObj;
    const html = `<div class="category-container">
      <div class="categorie-title">
        <span class="title-text js-title-text-${index}">${categoryName}</span>
        <div class="buttons-container">
          <button class="category-delete-button js-category-delete-button">&#10006;</button>
          <button class="category-modify-button js-category-modify-button">M</button>
        </div>
      </div>
      ${categoryTasksHTML}
      <button class="task-add-button js-task-add-button">+</button>
    </div>`
    categoriesListHTML += html;
  });
  document.querySelector('.js-categories-container').innerHTML = categoriesListHTML;
  addEventListenersToCategoryDeleteButtons();
  addEventListenersToCategoryModifyButtons();
}

renderCategoriesList()

document.querySelector('.js-category-add-button').addEventListener('click', () => {
  document.querySelector('.js-title-input-popup').style.visibility = 'visible';
  document.querySelector('.js-title-error').innerHTML = '';
  document.querySelector('.js-title-input').value = '';
  document.querySelector('.js-title-input').focus();
})

document.querySelector('.js-title-input').addEventListener('keydown', (event) =>{
  if(event.key === 'Enter'){
    addCategory();
  }
})

document.querySelector('.js-title-input-button-confirm').addEventListener('click', () => {
  addCategory();
})

document.querySelector('.js-title-input-button-deny').addEventListener('click', () => {
  document.querySelector('.js-title-input-popup').style.visibility = 'hidden';
  document.querySelector('.js-title-error').innerHTML = '';
})

function addCategory(){
  const categoryName = document.querySelector('.js-title-input').value;
  if(categoryName.length <= 0){
    document.querySelector('.js-title-error').innerHTML = 'Title too short'
  }else if(categoryName.length > 25){
    document.querySelector('.js-title-error').innerHTML = 'Title too long (>25)'
  }else{
    categoriesList.push({categoryName})
    document.querySelector('.js-title-input-popup').style.visibility = 'hidden';
    document.querySelector('.js-title-error').innerHTML = '';
    renderCategoriesList()
  }
}

function addEventListenersToCategoryDeleteButtons(){
  document.querySelectorAll('.js-category-delete-button').forEach((deleteButton, index) => {
    deleteButton.addEventListener('click', () => {
      categoriesList.splice(index, 1);
      renderCategoriesList();
    });
  });
}

function addEventListenersToCategoryModifyButtons(){
  document.querySelectorAll('.js-category-modify-button').forEach((modifyButton, index) => {
    modifyButton.addEventListener('click', () => {
      const existingInput = document.querySelector(`.js-title-modify-input-${index}`);
      if (existingInput) {
        confirmCategoryEdit(index);
        return;
      }

      modifyButton.innerHTML = `&#x2713;`
      modifyButton.classList.add('modify-category-active')

      const originalTitle = categoriesList[index];
      document.querySelector(`.js-title-text-${index}`).innerHTML = `<input  class="title-modify-input js-title-modify-input-${index}">`

      const input = document.querySelector(`.js-title-modify-input-${index}`)
      input.value = originalTitle.categoryName;
      input.focus();
      
      input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          confirmCategoryEdit(index);
        }
      });
    });
  });
}

function confirmCategoryEdit(index) {
  const input = document.querySelector(`.js-title-modify-input-${index}`);
  const categoryName = input.value.trim();

  if (categoryName.length <= 0) {
    alert("Title too short");
    return;
  } else if (categoryName.length > 25) {
    alert("Title too long (>25)");
    return;
  }

  categoriesList.splice(index, 1, {categoryName});
  renderCategoriesList();
}