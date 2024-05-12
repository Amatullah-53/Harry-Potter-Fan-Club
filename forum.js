
$(document).ready(function() {
    $('.answer-btn').click(function() {
        // Check if a textarea already exists
        if ($(this).next('.answers').find('textarea').length === 0) {
            let answerBox = $('<textarea></textarea><button class="btn btn-success publish-btn">Publish</button>');
            $(this).next('.answers').append(answerBox);
            answerBox.focus();
        }
    });

    $(document).on('click', '.publish-btn', function() {
        let answerText = $(this).prev('textarea').val();
        let answerHtml = '<div class="answer">' + answerText +
                         '<button class=" btn btn-danger like-btn">👍 <span class="like-count">0</span></button></div>';
        $(this).parent().prepend(answerHtml);
        $(this).prev('textarea').remove();
        $(this).remove();
    });

    $(document).on('click', '.like-btn', function() {
        let count = parseInt($(this).find('.like-count').text());
        $(this).find('.like-count').text(count + 1);
    });

    $('#update-btn').click(function() {
        $('.question').each(function() {
            // Detach answers from the DOM and sort them
            let answers = $(this).find('.answer').detach().sort(function(a, b) {
                return parseInt($(b).find('.like-count').text()) - parseInt($(a).find('.like-count').text());
            });

            // Re-append sorted answers
            $(this).find('.answers').append(answers);
        });
    });
});