const question = $('.main'),
    answers = $('.answer'),
    answersInput = $('.answer textarea');

//make textarea auto size themselves
// autosize($('textarea'));
// $('textarea').autoResize();
$('textarea').on('input', function() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
    let lineCount = 0;
    let lines = this.value;
    let matches = lines.match(/\n/g);
    let breaks = matches ? matches.length : 0;
    console.log(lines);
    console.log(matches);
    console.log(breaks);
});

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

// make textarea submit on enter keypress
$('.main textarea').keypress(function(e) {
    if (e.which == 13 && !e.shiftKey) {
        $(this)
            .closest('form')
            .submit();
        e.preventDefault();
    }
});
