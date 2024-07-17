import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainContainer from "./Components/MainContainer";
import Login from "./Components/Login";
import ChatHome from "./Components/ChatHome";
import ChatArea from "./Components/ChatArea";
import UserGroups from "./Components/UserGroups";
import CreateGroup from "./Components/CreateGroup";
import AllUsers from "./Components/AllUsers";
import Register from "./Components/Register";
import Profile from "./Components/Profile";



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="app" element={<MainContainer />}>
          <Route path="welcome" element={<ChatHome />} />
          <Route path="chat/:_id" element={<ChatArea />} />
          <Route path="chat/:_id" element={<ChatArea />} />
          <Route path="createGroup" element={<CreateGroup />} />
          <Route path="users" element={<AllUsers />} />
          <Route path="groups" element={<UserGroups />} />
          <Route path="profile" element={<Profile />} />

        </Route>
      </Routes>
    </div>
    
  );
}

export default App;
