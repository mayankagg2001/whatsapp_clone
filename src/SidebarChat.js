import React , {useState,useEffect} from 'react'
import "./SidebarChat.css"
import {Avatar} from "@material-ui/core";
import db from "./firebase";
import {Link} from "react-router-dom";
import Dom from 'material-ui/utils/dom';
function SidebarChat({addNewChat,name,id}) {
    const [seed,setseed] = useState("");
    useEffect(() => {
        
        setseed(Math.floor(Math.random()*5000));
        
    }, [])
    
    const createChat = () => {
        const roomName = prompt("Please enter name for chat");

        if(roomName)
        {
           db.collection("rooms").add({
               name:roomName,
           });
        }
    }

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
        <div className="sidebarChat">
            <Avatar src = {`https://avatars.dicebear.com/api/male/${seed}.svg`} />
            <div className = "sidebarChat__info">
                <h2>{name}</h2>
                <p>Last message...</p>
            </div>
        </div>
        </Link>
    ) :
    (
        <div onClick = {createChat} className="sidebarChat">
            <h2>Add New Chat</h2>
        </div>
    )
}

export default SidebarChat
