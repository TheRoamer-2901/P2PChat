import { io } from "socket.io-client"
const div = document.querySelector(".chat");
const log = document.querySelector(".user-log")
const videoGrid = document.querySelector(".video-grid")



const socket = io("http://localhost:3000")
const myPeer = new Peer()
console.log("peer id: ", myPeer.id);
let myPeerId

const roomId = 10
const connectedPeers = {}

socket.on("connect", () => {
    myPeerId = socket.id
    div.innerText = `You connected with id ${socket.id}`
});



myPeer.on('open', id => {
    socket.emit('join-room', roomId, id)
})


const myVideo = document.createElement("video");
myVideo.muted = true;

navigator.mediaDevices.getUserMedia({ 
    audio: true, 
    video: true 
}).then((stream) => {
    addVideoStream(myVideo, stream)

    socket.on('user-connected', (userId) => {
        connectToNewUser(userId, stream)
    })

    myPeer.on('call', call => {
        call.answer(stream)
        const video = document.createElement('video')
        call.on('stream', remoteStream => {
            addVideoStream(video, remoteStream)
        }) 
        call.on('close', () => {
            alert("user leaved");
            video.remove()
            socket.emit('disconnected', userId)
        })
    })

})

socket.on('user-disconnected', userId => {
    console.log("leave id: ", userId);
    if(connectedPeers[userId]){
        console.log("peer: ", connectedPeers[userId]);
        connectedPeers[userId].video.remove()
        connectedPeers[userId].close()
    } 
}) 


function connectToNewUser(userId, stream) {
    const call = myPeer.call(userId, stream)
    const video = document.createElement('video')
    call.on('stream', remoteStream => {
        addVideoStream(video, remoteStream)
    })

    call.on('close', () => {
        alert("user leaved");
        video.remove()
        socket.emit('disconnected', userId)
    })
    connectedPeers[userId] = {video : video, call : call}
}

function addVideoStream(video, stream) {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
        video.play()
    })
    videoGrid.append(video)
}