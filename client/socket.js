import { io } from "socket.io-client"
const div = document.querySelector(".chat");
const form = document.querySelector(".form");
const logoutBtn = document.querySelector(".logout")

let User;


const socket = io("http://localhost:3000")

socket.on("connect", () => {
    div.innerText = `You connected with id ${socket.id}`
});

socket.on("loginSuccess", (user) => {
    console.log(user)
    User = user;
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.querySelector("#name").value;
    const password = document.querySelector("#password").value;

    socket.emit('logIn', {name: name, password: password});
})

logoutBtn.addEventListener('click', () => {
    socket.emit('logOut', {name: User.name});
})