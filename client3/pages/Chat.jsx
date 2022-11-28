import './Chat.css'

const Chat = () => {
  return (
    <div id ="chat">
        <ul id="listUser">
            
        </ul>
        <div className = "grid-box" id = "chatbox">
            <div className = "grid-item" id = "left-box">
                <div id = "header">
                    <p style={{ marginTop: "5px"}}>List friends</p>
                </div>
            </div>
        <div className="grid-item" id = "right-box">
            <div id = "mess-his"></div>
            <div id = "input-box">
                <input type="text" name="input-mess" id="input-mess" />
                <button type="submit" id = "btn-send">send</button>
            </div>
        </div>
        </div>

            <div id = "div-file">
                <p>Choose your file</p>
                <input type="text" name="fileUsername" id="fileUsername" />
                <input type="file" name="file" id="file" />
                <button type="submit" id ="send-file">Send file</button>
            </div>
    </div>
  )
}

export default Chat