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

    //always add it to the first one
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

//handle topic selection behaviour
function topic() {
    //add highlightclass to topic list
    let title = $('.title h1').text(),
        topic = $('.select a');

    for (let i = 0; i < topic.length; i++) {
        if (topic.eq(i).text() === title) {
            topic.eq(i).addClass('topicHighlight');
        }
    }

    if (localStorage.getItem('topicExpand')) {
        $('.selectWrapper i').addClass('turn');
        $('.select').addClass('topicExpand');
    }

    function toggleExpand() {
        if (localStorage.getItem('topicExpand')) {
            $('.selectWrapper i').removeClass('turn');
            $('.select').removeClass('topicExpand');
            localStorage.removeItem('topicExpand');
        } else {
            $('.selectWrapper i').addClass('turn');
            $('.select').addClass('topicExpand');
            localStorage.setItem('topicExpand', true);
        }
    }

    // toggle topic selection
    $('.selectWrapper i').on('click', function() {
        toggleExpand();
    });
}
topic();

//handle textarea behaviour
function resizeTextarea() {
    // autosize($('textarea'));
    // $('textarea').autoResize();
    let textarea = $('textarea');

    textarea.on('input', function() {
        let height = parseFloat(this.style.height);
        let scrollHeight = this.scrollHeight - height;

        this.style.height = height + scrollHeight + 'px';
    });
    //make it go to the right height after refresh
    for (let i = 0; i < textarea.length; i++) {
        let scrollHeight = textarea.eq(i)[0].scrollHeight;
        let elementHeight = textarea.eq(i)[0].style.height;

        if (scrollHeight != 0) {
            textarea.eq(i)[0].style.height = scrollHeight + 'px';
        }
    }

    // make textarea submit on enter keypress
    textarea.keypress(function(e) {
        if (e.which == 13 && !e.shiftKey) {
            $(this)
                .closest('form')
                .submit();
            e.preventDefault();
        }
    });

    //make textarea submit when textarea loses focus
    textarea.focusout(function() {
        $(this)
            .closest('form')
            .submit();
    });
}
resizeTextarea();
