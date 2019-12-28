const question = $('.main');

question.on('click', function(e) {
    const item = $(e.target).next();
    console.log(item);

    if (item.hasClass('highlight')) {
        item.addClass('highlight');
    } else {
        item.removeClass('highlight');
    }
});
