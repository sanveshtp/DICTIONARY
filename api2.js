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
    let meanings = data[0].meanings[0].definitions
    let cnt = 1
    for (let i of meanings) {
        if (cnt < 3) {
            peddadabba.innerHTML += `<b>Definition ${String(cnt)}</b>: ${i.definition}<br>`
            cnt++
        }
    }
    peddadabba.innerHTML += `<b>Synonyms :</b>`
    synonyms = data[0].meanings[0].synonyms
    for (let i in synonyms) {
        if (i < 2) {
            peddadabba.innerHTML += `<br>${synonyms[i]}`
        }
    }
}
