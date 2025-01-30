let entry;

async function langs() {
    const post = await fetch("https://libretranslate.com/languages").then((res) => res.json());
    let options="";
    for (let i = 1; i < post.length; i++) {
        options = options + `<option value="${post[i]["code"]}">${post[i]["name"]}</option>`;
      }
    document.getElementById("lang").innerHTML = options;
}
langs()

document.addEventListener('mousedown', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: () => window.getSelection().toString()
        }, (results) => {
            entry = results[0].result;
        });
      });
    });

document.getElementById("define").onclick = define;
document.getElementById("sound").onclick = pronounce;
document.getElementById("translate").onclick = translate;

async function define() {
    
    if (entry.trim().length === 0) {
        alert("you didn't select anything!")
    }

    try {
        const response = await fetch(`https://dictionaryapi.com/api/v3/references/collegiate/json/${entry}?key=86359a9c-27f7-483c-a2f1-fd6882bb4583`);
        const data = await response.json();
        let text="";
        
        for (let i = 0; i < data.length; i++) {
            text = text + `<li>${data[i].shortdef[0]}</li>`;
          }
        document.getElementById("definition").innerHTML = `<ul>${text}</ul>`;
    }
    catch(error) {
        console.error(error)
    }
}

async function pronounce(){

    if (entry.trim().length === 0) {
        alert("you didn't select anything!")
    }

    try {
        const response = await fetch(`https://dictionaryapi.com/api/v3/references/collegiate/json/${entry}?key=86359a9c-27f7-483c-a2f1-fd6882bb4583`);
        const data = await response.json();
        let base = data[0].hwi.prs[0].sound.audio;
        let pronunciation = new Audio(`https://media.merriam-webster.com/audio/prons/en/us/mp3/${base[0]}/${base}.mp3`);
        pronunciation.play();
    }
    catch(error) {
        console.error(error)
    }
}

function translate(){
    if (entry.trim().length === 0) {
        alert("you didn't select anything!")
    }
    var sourceText = entry;
    var sourceLang = 'en';
    var targetLang = document.getElementById("lang").value;
    
    var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl="+ sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(sourceText);
    
    $.getJSON(url, function(data) {
        $('p#definition').text(data[0][0][0]);
      });
  
  }
