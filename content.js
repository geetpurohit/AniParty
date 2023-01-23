let playButton = document.getElementById('play');
let generateButton = document.getElementById('generate')
let tempButton = document.getElementById('tempbutton')
playButton.addEventListener("click", mainFunc);
generateButton.addEventListener("click", generateKey);
tempButton.addEventListener("click", sendtimer);

async function mainFunc(){
    playButton.innerHTML = "Play/Pause";
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    chrome.webNavigation.getAllFrames({tabId: tab.id}, (details) => {
        
        chrome.scripting.executeScript({
            target: { tabId: tab.id, frameIds: [details[1].frameId]},
            func: getVideo,
            args: [document],
        })
    });
    console.log(document.details)
    return 0;
}

async function generateKey(){
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.webNavigation.getAllFrames({tabId: tab.id}, (details) => {
        chrome.scripting.executeScript({
            target: { tabId: tab.id, frameIds: [details[1].frameId]},
            func: makeid, 
            args: [document],
        },
        (result) => {
            document.querySelector('#key').innerHTML = 'Key: ' + result[0].result;
        })
    });
    
    return 0;
}

async function sendtimer(){
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    chrome.webNavigation.getAllFrames({tabId: tab.id}, (details) => {
        chrome.scripting.executeScript({
            target: { tabId: tab.id, frameIds: [details[1].frameId]}, //i suspect this line means that target is the anipahe
            func: sendtime,
            args: [document],
        },
        (result) =>{
            document.querySelector('#room').innerHTML += result[0].result;
        })
    })
}

function makeid() {
        // here document is anipahe website with video button
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 20; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
   return result
}

function getVideo(popup) {
    // here document is anipahe website with video button
    let playButton2 = document.querySelector("button.plyr__controls__item.plyr__control");
    if(playButton2){ playButton2.click();}
    const res = new Date(1000 * document.querySelector('video').currentTime).toISOString().slice(11, 19);
    console.log(res)
    if(!playButton2) {popup.body.innerHTML = "<div> There is no video </div>";} 
}


function sendtime(){
    // here document is anipahe website with video button
    var ExtensionId = 'anmkfccloggodifmempjhfdkfhgcgbhd';
    const res = new Date(1000 * document.querySelector('video').currentTime).toISOString().slice(11, 19);
    chrome.runtime.sendMessage(ExtensionId, {timeinfo:res})

}