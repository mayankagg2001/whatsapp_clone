import React , {useEffect,useState} from 'react'
import "./Chat.css"
import {Avatar,IconButton} from "@material-ui/core";
import {AttachFile,MoreVert,SearchOutlined} from "@material-ui/icons";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import { useParams } from 'react-router';
import db from "./firebase";
import firebase from "firebase";
import { useStateValue } from './StateProvider';
function Chat() {
    
    const[seed,setSeed] = useState("");
    const[input,setInput] = useState("");
    const { roomId } = useParams();
    const [roomName,setRoomName] = useState("");
    const [messages,setMessages] = useState([]);
    const [{user},dispatch] = useStateValue();
    useEffect(() => {
        if(roomId){
            db.collection('rooms').doc(roomId).onSnapshot(snapshot=>(
                setRoomName(snapshot.data().name)
            ));

            db.collection("rooms").doc(roomId).collection("messages").orderBy('timestamp','asc').onSnapshot(
                snapshot=>(
                    setMessages(snapshot.docs.map(
                        (doc)=>doc.data()
                    ))
                )
            );
        }
    }, [roomId])
    
    useEffect(() => {
    setSeed(Math.floor(Math.random()*5000));
    }, [])

    const sendMessage = (e)=>{
        e.preventDefault();
        db.collection("rooms").doc(roomId).collection('messages').add(
            {   message:input,
                name:user.displayName,
                timestamp:firebase.firestore.FieldValue.serverTimestamp()
            }
        );
        setInput("");
    }
    
    return (
        <div className = "Chat">
            <div className="chat__header">
                <Avatar src = {`https://avatars.dicebear.com/api/male/${seed}.svg`} />
                <div className="chat__headerInfo">
                <h3>{roomName}</h3>
                <p>Last seen at ...</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
            {messages.map((message)=>(
                <p className={`chat__message ${message.name==user.displayName && "chat__reciever"}`}>
                    <span className="chat__name">{message.name}</span>
                    {message.message}
                    <span className="chat__timestamp">
                        {new Date(message.timestamp?.toDate()).toUTCString()}
                    </span>
                </p>
            ))}
            </div>
            <div className="chat__footer">
                <InsertEmoticonIcon />
                <form>
                    <input type="text" placeholder = "Type a message" value={input} onChange={e=>setInput(e.target.value)}/>
                    <button type = "submit" onClick={sendMessage} />
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
