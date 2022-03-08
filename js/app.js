// Set year in footer for copyright
document.getElementById("year").innerHTML = new Date().getFullYear();

// Init Vars
var word_count = _.size(words)
var words_ordered = _.shuffle(words)
var current_word = 0;
var results = [];
var resultsModal = new bootstrap.Modal('#results', { backdrop: 'static', keyboard: false });

$(".progress-bar").attr('aria-valuemax', word_count);
$(".progress-bar").width((((current_word + 1 ) / word_count) * 100) + '%');
$(".progress-fraction").html('1/' + word_count)

console.debug(word_count, "words");
console.debug("ordered", words_ordered);

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
        console.debug(current_word);
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

        current_word = 0;
        $(".word").html(words_ordered[current_word]);
        $(".progress-bar").attr('aria-valuenow', current_word);
        $(".progress-bar").width((((current_word + 1 ) / word_count) * 100) + '%');

        $(".correct-words").html(correct.sort().join(', '));
        $(".missed-words").html(missed.sort().join(', '));

        resultsModal.show();
        $(".progress-fraction").html('1/' + word_count)
    } 
}

// Go to previous word
function back () {
    if (current_word > 0) {
        current_word -= 1;
        console.debug(current_word);
        $(".word").html(words_ordered[current_word]);
        $(".progress-bar").attr('aria-valuenow', current_word);
        $(".progress-bar").width((((current_word + 1 ) / word_count) * 100) + '%');
        $(".progress-fraction").html(current_word + '/' + word_count)
    }
}

$(document).ready(function() {
    $(".word").html(words_ordered[current_word])
    $(".correct").click(function(){
        results[current_word] = 1;
        advance()
    });
    $(".missed").click(function(){
        results[current_word] = 0;
        advance()
    });
    $(".back").click(function(){
        back()
    });
});