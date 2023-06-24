const socket = io();
let textarea =document.querySelector('#textarea');
let messageArea = document.querySelector('.message__area');
let username;
do{
    username = prompt('Enter your name')
} while(!username)

textarea.addEventListener('keyup',(e)=>{
    if(e.key ==="Enter"){
        sendMessage(e.target.value); // what ever in the text area  will be forwarded 
    }
})

function sendMessage(message){
    let msg = { 
        user:username, 
        message:message.trim()
    }
    // append message
    appendMessage(msg,'outgoing');
    scrollToBottom();

    socket.emit('message',msg);
    textarea.value="";

}

// now send the msg to server





function appendMessage(msg,type){
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className,'message');

    let markup = `<h4>${msg.user}</h4>
                <p>${msg.message}</p>`

    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv);
}

// recieve message

socket.on('message', (msg) =>{
    appendMessage(msg,'incoming');
    scrollToBottom();
})

// whenever the msg container gets full then  display should be scrolled down automatically so that we can see the last received message
function scrollToBottom(){
        messageArea.scrollTop = messageArea.scrollHeight;
}