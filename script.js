let dabba = document.querySelector("#dabba")
let peddadabba = document.querySelector("#peddadabba")
let word = ''


dabba.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        getdata(word)
        word = ''

    } else if ("ABCDEFGHIJKLMNOPQRSTUVWXYZ".toLowerCase().includes(e.key)) {
        word += e.key
    }
})


let getdata = async (word) => {
    let bd = document.body


    peddadabba.innerHTML = null;
    let response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    let data = await response.json()
    console.log(data);
    // let meanings = data[0]
    let cnt = 0
    while (cnt < 4) {
        if (cnt < 3) {
            // console.log(data.length);
            // console.log(data[0].meanings[cnt].definitions[cnt].definition);
            peddadabba.innerHTML += `<b>${data[0].meanings[cnt].partOfSpeech} </b>: ${data[0].meanings[cnt].definitions[cnt].definition}<br>`
            cnt++
        } else {
            break
        }
    }
    cnt = 0;
    if (data[0].meanings[cnt].antonyms[cnt] != undefined) {
        peddadabba.innerHTML += `<b>Synonyms: </b>`

    }
    while (cnt < 2) {
        if (data[0].meanings[cnt].synonyms[cnt] === undefined) {
            break
        }
        if (cnt < 1) {
            peddadabba.innerHTML += `${data[0].meanings[cnt].synonyms[cnt]},`
            cnt++
        } else {
            peddadabba.innerHTML += `${data[0].meanings[cnt].synonyms[cnt]}<br>`
            break
        }
    }

    cnt = 0;
    // console.log(cnt);
    if (data[0].meanings[cnt].antonyms[cnt] != undefined) {
        peddadabba.innerHTML += `<b>Antonyms: </b>`
    }
    while (cnt < 2) {
        if (data[0].meanings[cnt].antonyms[cnt] === undefined) {
            break
        }
        if (cnt < 1) {
            peddadabba.innerHTML += `${data[0].meanings[cnt].antonyms[cnt]},`
            cnt++
        } else {
            peddadabba.innerHTML += `${data[0].meanings[cnt].antonyms[cnt]}<br>`
            break
        }
    }
    peddadabba.innerHTML += `<b>Phonetic: </b>${data[0].phonetic}<br>`




}
