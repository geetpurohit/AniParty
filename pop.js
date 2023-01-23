async function getTime() {
    roomMembers = ['member1', 'member2']
    timeinfo = ''
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            if(request.msg === "timeinfo"){timeinfo = request.timeinfo}
        }
    )
    return [document.querySelector('video').currentTime, document.querySelector('video').paused, roomMembers, timeinfo];
}

async function fetchtimefrombackground() {

}

async function mainFunc(){
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.webNavigation.getAllFrames({tabId: tab.id}, (details) => {
        //here its in popup
        chrome.scripting.executeScript({
            target: { tabId: tab.id, frameIds: [details[1].frameId]},
            func: getTime, //here its in DOM of animepahe
            args: [document],
        },
        (result) => {

            const res = new Date(1000 * result[0].result[0]).toISOString().slice(11, 19);
            document.querySelector('#time').innerHTML = 'Time: ' + res;
            result[0].result[1] ? bool = 'Paused' : bool = 'Playing'
            document.querySelector('#status').innerHTML = 'Video is currently: ' + bool
            var s = ''
            for(let i = 0; i < result[0].result[2].length; i++){s +=  result[0].result[2][i] +': '+ '<br/>' }
            console.log(result[0].result[3])
            document.querySelector('#room').innerHTML = s
        });  
    });

}

mainFunc(); //runs mainFunc once
setInterval(mainFunc, 250); //after that runs it every 1/4th of a second

