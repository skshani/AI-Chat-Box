let promptA = document.querySelector('#prompt')
let chatContainer = document.querySelector(".chat-container")

//let text2 =document.getElementsByClassName(".ai-chat-area")


const Api_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBXPePlc6ulkgz6SAl3tWiEtHVu9XKld_M"
let user = {
    data: null,
}

async function generateResponse(aiChatBox) {

    let text2 = aiChatBox.querySelector('.ai-chat-area')
    let requestOption = {
        method: "POST",
        header: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "contents": [{ "parts": [{ "text": user.data }] }]
        })
    }

    let response = await fetch(Api_URL, requestOption)
    let data = await response.json();
    let apiResponse = data.candidates[0].content.parts[0].text.replace().trim();
    text2.innerHTML = apiResponse;
    //console.log(apiResponse);


}

//create dynmic div and show data
function createChatBox(html, classes) {
    let div = document.createElement("div");
    div.innerHTML = html;
    div.classList.add(classes);
    return div;
}

//handle chat-area for user
function chatResponsehandle(message) {
    user.data = message
    let html = `<img src="user.png" alt="" id="userImage" width="50">
                <div class="user-chat-area">
            ${user.data}
            </div>`
    promptA.value = ""
    let userChatBox = createChatBox(html, "user-chat-box")
    chatContainer.appendChild(userChatBox)

    setTimeout(() => {
        let html1 =      `<img src="robot.jpeg" alt="" id="aiImage" width="50">
                           <div class="ai-chat-area">
                          </div>`
        let aiChatBox = createChatBox(html1, "ai-chat-box")
        chatContainer.appendChild(aiChatBox)
        generateResponse(aiChatBox)
    }, 3000)
}

//handle input box
promptA.addEventListener('keydown', (e) => {
    if (e.key == "Enter")
        chatResponsehandle(promptA.value)


})