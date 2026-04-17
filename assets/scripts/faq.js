const questions = document.querySelectorAll('.question')

/* Function to expand/collapse FAQ components */

questions.forEach(function(question) {
    const btn = question.querySelector('.question__btn')

    btn.addEventListener('click', function() {
        questions.forEach(function(item) {
            if (item !== question) {
                item.classList.remove('show-text')
                item.querySelector('.question__btn').setAttribute('aria-expanded', 'false')
            }
        })

        const isExpanded = question.classList.toggle('show-text')
        btn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false')
    })
})
