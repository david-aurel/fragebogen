const question = $('.main'),
    answers = $('.answer'),
    answersInput = $('.answer textarea');

// toggle highlight class on answer field
question.on('click', function(e) {
    const item = $(e.target).next();

    if (item.hasClass('highlight')) {
        item.removeClass('highlight');
    } else {
        item.addClass('highlight');
    }
});

//loop trough answer fields and add highlight class, if input isnt empty.
function highlight() {
    for (let i = 0; i < answersInput.length; i++) {
        if (answersInput[i].value) {
            var parent = answersInput
                .eq(i)
                .parent()
                .parent();

            parent.addClass('highlight');
        }
    }
}
highlight();
