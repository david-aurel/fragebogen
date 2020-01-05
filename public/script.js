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
    for (let i = 0; i < answersInput.length; i++) {
        if (!answersInput[i].value) {
            answersInput
                .eq(i)
                .parent()
                .parent()
                .addClass('highlight');
            return;
        }
    }
}
highlight();

//make textarea auto size themselves
// autosize($('textarea'));
function resizeTextarea() {
    // $('textarea').autoResize();
    let textarea = $('textarea');

    textarea.on('input', function() {
        let height = parseFloat(this.style.height);
        let scrollHeight = this.scrollHeight - height;
        if (scrollHeight > 0) {
            this.style.height = height + scrollHeight + 'px';
        }
    });
    for (let i = 0; i < textarea.length; i++) {
        let scrollHeight = textarea.eq(i)[0].scrollHeight;
        $('textarea')
            .eq(i)
            .height(scrollHeight + 'px');
    }
}
resizeTextarea();

// make textarea submit on enter keypress
$('.main textarea').keypress(function(e) {
    if (e.which == 13 && !e.shiftKey) {
        $(this)
            .closest('form')
            .submit();
        e.preventDefault();
    }
});
