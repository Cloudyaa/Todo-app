const editBtn = document.querySelector('.todo-edit');
const form = document.querySelector('.todo-input');

editBtn.addEventListener('click', () => {
    form.classList.toggle('hidden');
});
