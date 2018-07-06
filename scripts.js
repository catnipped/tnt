let carddata = new Object();

function fetchCardData() {
	$.getJSON('cards.json', function(data){
		carddata = data.cards;
		showAllCards()
	});
};

function addCard (id) {

    let card = carddata[id];
    console.log(card);


    let text = '';
    if (card.text != undefined) {
      text = card.text
		}

		let types = '';
		if (card.type != undefined) {
				types = card.type
		}

		let name = '';
		let nr = '';
		if (card.name != undefined && card.nr != undefined) {
				nr = '<span class="nr">'+card.nr+' | </span>';
				info = '<span class="info">' + nr +  card.name +'</span>';
		}

		if (card.type == "library") {
				let newHtml = ('<div class="card ' + types + '">' + info + '<span class="text">' + text + '</span></div>');
				$('#cards').append( newHtml );
		}
		if (card.type == "map") {
				let newHtml = ('<div class="card ' + types + '"><h1 class="info">' + card.name +'</h1><span class="text">' + text + '</span></div>');
				$('#cards').append( newHtml );
		}

    replaceInlineSymbol(/\[u /g,'<span class="underlined">');
		replaceInlineSymbol(/\[S /g,'<span class="symbol smidighet">');
		replaceInlineSymbol(/\[K /g,'<span class="symbol kraft">');
		replaceInlineSymbol(/\[U /g,'<span class="symbol kunskap">');
		replaceInlineSymbol(/\[C /g,'<span class="symbol charm">');
		replaceInlineSymbol(/\[L /g,'<span class="symbol lib">');
		replaceInlineSymbol(/\[v /g,'<span class="verb">');
		replaceInlineSymbol(/\[n /g,'<span class="number">');
		replaceInlineSymbol(/\[h /g,'<span class="heading">');
		replaceInlineSymbol(/\[p /g,'<span class="path">');
		replaceInlineSymbol(/\]/g,'</span>');
	  // replaceInlineSymbol(/\(/g,'(');
	  // replaceInlineSymbol(/\)/g,')');
	  replaceInlineSymbol(/\undefined/g,'');
	  replaceInlineSymbol(/\n/g,'<hr>');


	}

function replaceInlineSymbol (symbol, symbol_img) {
    $('.card:last-of-type span').html(function(i, text) {
    return text.replace(symbol, symbol_img);
    });
}

function submitCards() {
    let cards = $('[name=cards]').val();
    console.log(cards);
    let listOfCards = JSON.parse("[" + cards + "]");
    console.log(listOfCards);
    console.log (listOfCards.length);
    for (let i = 0; i < (listOfCards.length) ; i++) {
        let id = '' + listOfCards[i] + '';
        console.log(id);
        addCard(id);
        dynamicTextHeight();
    };
};

function showAllCards() {
		$('#cards').empty()
	for (let i = 0; i < (carddata.length) ; i++) {
			addCard(i);
			dynamicTextHeight(i);
	};
}

function dynamicTextHeight() {
    if ($('.card:last-of-type .text').height() > 190) {
    	let current_size = $('.card:last-of-type .text').css('font-size')
        let current_height = $('.card:last-of-type .text').css('line-height')
        current_height = parseFloat(current_height);
        current_height = current_height - 0.5;
        console.log(current_height);
        current_size = parseFloat(current_size);
        current_size = current_size - 0.5;
        current_size = Math.max(current_size, 4);
        console.log(current_size);
        $('.card:last-of-type .text').css('line-height', current_height + 'px');
        $('.card:last-of-type .text').css('font-size', current_size + 'px');
        dynamicTextHeight();
    }
};

function toggleLowInk() {
    $("[name=lowInk]").change(function(){
        if ( this.checked ){
            $(".card").addClass('low-ink');
        } else {
            $('.low-ink').removeClass('low-ink');
        };
    })
};

function loadFile() {
    var input, file, fr;

    if (typeof window.FileReader !== 'function') {
      alert("The file API isn't supported on this browser yet.");
      return;
    }

    input = document.getElementById('fileinput');
    if (!input) {
      alert("Um, couldn't find the fileinput element.");
    }
    else if (!input.files) {
      alert("This browser doesn't seem to support the `files` property of file inputs.");
    }
    else if (!input.files[0]) {
      alert("Please select a file before clicking 'Load'");
    }
    else {
      file = input.files[0];
      fr = new FileReader();
      fr.onload = receivedText;
      fr.readAsText(file);
    }

    function receivedText(e) {
      lines = e.target.result;
      var newArr = JSON.parse(lines);
			console.log(newArr)
			carddata = newArr.cards;
			showAllCards();
    }


  }
