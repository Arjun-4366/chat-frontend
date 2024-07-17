import { IconButton, TextField, Button } from "@mui/material";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateGroup() {
  const darkMode = useSelector((state) => state.darkModeKey);
  const [members, setMembers] = useState([]);
  let [isSelected, setIsSelected] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [group, setGroup] = useState();
  const userData = localStorage.getItem("userDetails");
  const navigate = useNavigate();
  if (!userData) {
    console.log("user is not authenticated");
    navigate("/");
  }

  useEffect(() => {
    if (!userData) {
      console.log("user is not authenticated");
      navigate(-1);
    }
    // console.log('user refreshed')
    const fetchUsers = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${JSON.parse(userData).data.token}`,
          },
        };
        const response = await axios.get("https://chat-server-flame.vercel.app/users", config);
        // console.log("data from backend", response);\
        console.log("all members", response.data);

        setMembers(response.data);
        console.log("members array", members);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUsers();
  }, [userData, navigate]);

  const selectionHandler = (userId) => {
    console.log("userId", userId);
    const index = selectedUsers.indexOf(userId);
    console.log("index", index);

    if (index === -1) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      const updatedMembers = [...selectedUsers];
      updatedMembers.splice(index, 1);
      setSelectedUsers(updatedMembers);
    }

    setIsSelected(isSelected);
  };
  useEffect(() => {
    console.log("selected users", selectedUsers);
  }, [selectedUsers]);

  const handleCreateGroup = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(userData).data.token}`,
      },
    };
    const response = await axios.post(
      "https://chat-server-flame.vercel.app/chat/creategroup",
      {
        name: group,
        users: selectedUsers,
      },
      config
    );
    console.log(response.data);
    navigate("/app/groups");
  };

  return (
    <div className="create-group-container">
      <div className={"create-group" + (darkMode ? " bg-dark" : "")}>
        <TextField
          label="Enter Group Name"
          className={"grp-input" + (darkMode ? " dark" : "")}
          onChange={(e) => setGroup(e.target.value)}
        />
      </div>
      <div className={"users-container" + (darkMode ? " bg-dark" : "")}>
        {members.map((user, index) => (
          <div
            key={index}
            className={
              "user-select" +
              (selectedUsers.includes(user._id) ? " selected" : "") +
              (darkMode ? " bg-dark" : "")
            }
            onClick={() => selectionHandler(user._id)}>
            <p className="chat-icon">{user.userName.charAt}</p>
            <p className="chat-name">{user.userName}</p>
            
          </div>
        ))}
      </div>
      <Button variant="contained" onClick={handleCreateGroup}>
        Create
      </Button>
    </div>
  );
}

export default CreateGroup;
