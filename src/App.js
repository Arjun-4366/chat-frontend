import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainContainer from "./Components/MainContainer";
import Login from "./Components/Login";
import ChatHome from "./Components/ChatHome";
import Chatlist from "./Components/Chatlist";
import ChatArea from "./Components/ChatArea";
import UserGroups from "./Components/UserGroups";
import CreateGroup from "./Components/CreateGroup";

import AllUsers from "./Components/AllUsers";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="app" element={<MainContainer />}>
          <Route path="welcome" element={<ChatHome />} />
          <Route path="chat" element={<ChatArea />} />
          <Route path="createGroup" element={<CreateGroup />} />
          <Route path="users" element={<UserGroups />} />
          <Route path="groups" element={<AllUsers />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
