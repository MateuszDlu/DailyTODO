const categoriesList = [{categoryName: 'category1', tasks: ['task1', 'task2', 'task3']}, {categoryName: 'category2', tasks: ['task4', 'task5']}];


function renderCategoriesList(){
  let categoriesListHTML = '';

  categoriesList.forEach((categorieObj, index) => {
    let categoryTasksHTML = ``;
    categorieObj.tasks.forEach((task, taskIndex) => {
      const taskHTML = `
        <div class="task-container">
          <span class="task-text js-task-text js-task-text-${index}-${taskIndex}">${task}</span>
          <div class="buttons-container">
            <button class="task-cross-button js-task-cross-button js-task-cross-button-${index}-${taskIndex}" data-category-index=${index} data-task-index=${taskIndex}>-</button>
            <button class="task-modify-button js-task-modify-button js-task-modify-button-${index}-${taskIndex}" data-category-index=${index} data-task-index=${taskIndex}>M</button>
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
  addEventListenersToTaskAddButtons();
  addEventListenersToTaskModifyButtons();
  addEventListenersToTaskDeleteButtons()
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
    categoriesList.push({categoryName, tasks:[]})
    document.querySelector('.js-title-input-popup').style.visibility = 'hidden';
    document.querySelector('.js-title-error').innerHTML = '';
    renderCategoriesList()
  }
}

function addTaskToCategory(categoryIndex){
  categoriesList[categoryIndex].tasks.push('');
  const newTaskIndex = categoriesList[categoryIndex].tasks.length - 1;
  renderCategoriesList();
  
  const modifyButton = document.querySelector(`.js-task-modify-button-${categoryIndex}-${newTaskIndex}`);
  
  modifyTask(categoryIndex, newTaskIndex, modifyButton);
}

function addEventListenersToCategoryDeleteButtons(){
  document.querySelectorAll('.js-category-delete-button').forEach((deleteButton, index) => {
    deleteButton.addEventListener('click', () => {
      categoriesList.splice(index, 1);
      renderCategoriesList();
    });
  });
}

function addEventListenersToTaskAddButtons(){
  document.querySelectorAll('.js-task-add-button').forEach((addTaskButton, index) => {
    addTaskButton.addEventListener('click', () => {
      addTaskToCategory(index);
    });
  });
}

function modifyTask(categoryIndex, taskIndex, modifyButton){
  modifyButton.innerHTML = `&#x2713;`
  modifyButton.classList.add('modify-active')

  const originalTitle = categoriesList[categoryIndex].tasks[taskIndex];
  document.querySelector(`.js-task-text-${categoryIndex}-${taskIndex}`).innerHTML = `<input  class="task-modify-input js-task-modify-input-${categoryIndex}-${taskIndex}">`

  const input = document.querySelector(`.js-task-modify-input-${categoryIndex}-${taskIndex}`)
  input.value = originalTitle;
  input.focus();
  
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      confirmTaskEdit(categoryIndex, taskIndex);
    }
  });
}

function addEventListenersToTaskModifyButtons() {
  document.querySelectorAll('.js-task-modify-button').forEach((modifyButton) => {
    modifyButton.addEventListener('click', () => {
      const categoryIndex = parseInt(modifyButton.dataset.categoryIndex, 10);
      const taskIndex = parseInt(modifyButton.dataset.taskIndex, 10);

      const existingInput = document.querySelector(`.js-task-modify-input-${categoryIndex}-${taskIndex}`);
      if (existingInput) {
        confirmTaskEdit(categoryIndex, taskIndex);
        return;
      }
      modifyTask(categoryIndex, taskIndex, modifyButton)
    });
  });
}

function addEventListenersToTaskDeleteButtons() {
  document.querySelectorAll('.js-task-cross-button').forEach((deleteButton) => {
    deleteButton.addEventListener('click', () => {
      const categoryIndex = parseInt(deleteButton.dataset.categoryIndex, 10);
      const taskIndex = parseInt(deleteButton.dataset.taskIndex, 10);

      categoriesList[categoryIndex].tasks.splice(taskIndex, 1)
      renderCategoriesList();
    });
  });
}

function confirmTaskEdit(categoryIndex, taskIndex) {
  const input = document.querySelector(`.js-task-modify-input-${categoryIndex}-${taskIndex}`);
  const taskName = input.value.trim();

  categoriesList[categoryIndex].tasks.splice(taskIndex, 1, taskName);
  renderCategoriesList();
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
      modifyButton.classList.add('modify-active')

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
  const oldCategory = categoriesList[index]
  const categoryName = input.value.trim();

  if (categoryName.length <= 0) {
    alert("Title too short");
    return;
  } else if (categoryName.length > 25) {
    alert("Title too long (>25)");
    return;
  }

  categoriesList.splice(index, 1, {categoryName, tasks: oldCategory.tasks});
  renderCategoriesList();
}