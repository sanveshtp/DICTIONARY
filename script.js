let dabba = document.querySelector("#dabba")
let peddadabba = document.querySelector("#peddadabba")
let word = ''


dabba.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        getdata(word)
        dabba.value = ''
        word = ''
    } else if ("abcdefghijklmnopqrstuvwxyz".includes(e.key)) {
        word += e.key
    }
})

let getdata = async (word) => {
    peddadabba.innerHTML = null;
    let response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    if (response.status > 400) {
        peddadabba.innerHTML = "Sorry cutie, there's no english word like that :(";
    } else {
        let data = await response.json()
        let cnt = 0
        while (cnt < 4) {
            if ((data[0].meanings[0].partOfSpeech) == undefined) {
                break
            }
            if (cnt < 1) {
                // console.log(data.length);
                // console.log(data[0].meanings[cnt].definitions[cnt].definition);
                peddadabba.innerHTML += `<b>${data[0].meanings[0].partOfSpeech} </b>: ${data[0].meanings[0].definitions[cnt].definition}<br>`
                cnt++
            } else {
                break
            }
        }
        if (data[0].meanings != null) {
            cnt = 0
            while (cnt < 4) {
                if (data[0].meanings[1].partOfSpeech === undefined) {
                    break
                }
                if (cnt < 1) {
                    // console.log(data.length);
                    // console.log(data[0].meanings[cnt].definitions[cnt].definition);
                    peddadabba.innerHTML += `<b>${data[0].meanings[1].partOfSpeech} </b>: ${data[0].meanings[1].definitions[cnt].definition}<br>`
                    cnt++
                } else {
                    break
                }
            }
        }

        if (data[0].phonetic != undefined) {
            peddadabba.innerHTML += `<b>Phonetic: </b>${data[0].phonetic}<br>`
        }

        // SYNONYMS 0
        cnt = 0;
        if (data[0].meanings[0].synonyms.length != 0 || data[0].meanings[1].synonyms.length != 0) {
            if (data[0].meanings[0].synonyms[1] !== undefined) {
                peddadabba.innerHTML += `<b>Synonyms: </b>`
                while (cnt < 2) {
                    if (cnt < 1) {
                        peddadabba.innerHTML += `${data[0].meanings[0].synonyms[cnt]},`
                        cnt++
                    } else {
                        peddadabba.innerHTML += `${data[0].meanings[0].synonyms[cnt]}`
                        break
                    }
                }

            }

            else if (data[0].meanings[1].synonyms[1] !== undefined) {
                // SYNONYMS 1
                peddadabba.innerHTML += `<b>Synonyms: </b>`

                cnt = 0;
                while (cnt < 2) {
                    if (cnt < 1) {
                        peddadabba.innerHTML += `${data[0].meanings[1].synonyms[cnt]},`
                        cnt++
                    } else {
                        peddadabba.innerHTML += `${data[0].meanings[1].synonyms[cnt]}`

                        break
                    }
                }
            }
            peddadabba.innerHTML += '<br>'
        }



        // ANTONYMS 0
        cnt = 0;
        if (data[0].meanings[0].antonyms.length != 0 || data[0].meanings[1].antonyms.length != 0) {
            if (data[0].meanings[0].antonyms[1] != undefined) {
                peddadabba.innerHTML += `<b>Antonyms: </b>`
                while (cnt < 2) {
                    if (cnt < 1) {
                        peddadabba.innerHTML += `${data[0].meanings[0].antonyms[cnt]},`
                        cnt++
                    } else {
                        peddadabba.innerHTML += `${data[0].meanings[0].antonyms[cnt]}`
                        break
                    }
                }
            }
            else if (data[0].meanings[1].antonyms[1] != undefined) {
                // ANTONYMS 1
                peddadabba.innerHTML += `<b>Antonyms: </b>`
                cnt = 0;
                while (cnt < 2) {
                    if (cnt < 1) {
                        peddadabba.innerHTML += `${data[0].meanings[1].antonyms[cnt]},`
                        cnt++
                    } else {
                        peddadabba.innerHTML += `${data[0].meanings[1].antonyms[cnt]}`
                        break
                    }
                }
            }


        }
    }

}
