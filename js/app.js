// Set year in footer for copyright
document.getElementById("year").innerHTML = new Date().getFullYear();

// Init Vars
var word_count, words_ordered, current_word;
var results = [];
var resultsModal = new bootstrap.Modal('#results', { backdrop: 'static', keyboard: false });

resetWords()

// Trim Final Comma and Space from results
function removeLastCommaSpace (strng) {        
    var n = strng.lastIndexOf(", ");
    var a = strng.substring(0,n) 
    return a;
}

// Go To Next Word
function advance () {
    if ((current_word += 1) < word_count) {
        // If not at the end of the list
        $(".word").html(words_ordered[current_word]);
        $(".progress-bar").attr('aria-valuenow', current_word);
        $(".progress-bar").width((((current_word + 1) / word_count) * 100) + '%');
        $(".progress-fraction").html((current_word + 1) + '/' + word_count)
    } else {
        // Once the words list is finished create the results
        console.debug("results", results)
        var correct = [];
        var missed = [];

        _.forEach(results, function(result, i) {
            if (result == 1) {
                correct.push(words_ordered[i])
            } else {
                missed.push(words_ordered[i])
            }
        });

        $(".correct-words").html(correct.sort().join(', '));
        $(".missed-words").html(missed.sort().join(', '));

        resetWords();
        resultsModal.show();
    } 
}

function resetWords () {
    word_count = _.size(words)
    words_ordered = _.shuffle(words)

    console.debug(word_count, "words");
    console.debug("ordered", words_ordered);

    current_word = 0;
    $(".word").html(words_ordered[current_word]);
    $(".progress-bar").attr('aria-valuenow', current_word);
    $(".progress-bar").width((((current_word + 1 ) / word_count) * 100) + '%');
    $(".progress-fraction").html('1/' + word_count)
}

// Go to previous word
function back () {
    if (current_word > 0) {
        current_word -= 1;
        $(".word").html(words_ordered[current_word]);
        $(".progress-bar").attr('aria-valuenow', current_word);
        $(".progress-bar").width((((current_word + 1 ) / word_count) * 100) + '%');
        $(".progress-fraction").html(current_word + '/' + word_count);
    }
}

function loadWords (version) {
    $.getScript( 'js/words.' + version + '.js' ).done( function ( script, textStatus ) {
        resetWords();
    })
}

$(document).ready(function() {
    $(".word").html(words_ordered[current_word])
    $(".correct").click(function(){
        results[current_word] = 1;
        advance();
    });
    $(".missed").click(function(){
        results[current_word] = 0;
        advance();
    });
    $(".back").click(function(){
        back();
    });
    $(".version").click(function(){
        var version = $(this).text();
        console.log(version);
        $('.current-version').text('v' + version);
        loadWords(version);
    });
});