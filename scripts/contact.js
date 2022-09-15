
const submitBtn = document.querySelector('.submit-btn');
const resetBtn = document.querySelector('.reset-btn');
const confirmBtn = document.querySelector('.confirm-btn');
const form = document.querySelector('.contact-form__content');
const modal = new bootstrap.Modal(document.querySelector('#formModal'))

form.addEventListener('submit', function(e) {
    e.preventDefault();
    modal.show();
});

confirmBtn.addEventListener('click', function() {
    resetBtn.click();
});