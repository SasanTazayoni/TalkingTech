/////////////////////////////////////////   FAQ PAGE   /////////////////////////////////////////

const questions = document.querySelectorAll('.question');

/* Function to expand/collapse FAQ components */
questions.forEach(function(question) {
    const btn = question.querySelector('.question__btn');

    btn.addEventListener('click', function() {
        questions.forEach(function(item) {
            if (item !== question) {
                toggleQuestion(item, true)
            }
        });

        toggleQuestion(question)
    });
});

/* Function to gradually collapse/expand FAQ content */
function toggleQuestion (question, justClose = false) {
    const opened = question.classList.contains('show-text');

    if (justClose && !opened) return; 
        
    if (!opened) {
        question.classList.add('show-text');
    }

    const answer = question.querySelector('.answer__text p');
    const answerHeight = answer.getBoundingClientRect().height
    const finalHeight = opened ? 0 : answerHeight;
    let height = opened ? answerHeight : 0;
    if (!opened) answer.style.height = 0;
    
    const interval = setInterval(() => {
        answer.style.height = (opened ? --height : ++height) + "px";
        if (height === finalHeight) {
            clearInterval(interval);
            answer.style.height = "auto";
            if (opened) question.classList.remove('show-text');
        }
    }, 300 / finalHeight );
}
