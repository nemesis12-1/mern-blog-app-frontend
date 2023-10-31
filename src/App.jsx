import "./App.css";

import Home from "./Pages/Home";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import MainLayout from "./components/MainLayout";
import { Routes, Route } from "react-router-dom"
import { UserContextProvider } from "./context/UserContext";
import CreatePost from "./Pages/CreatePost";
import PostPage from "./Pages/PostPage";
import EditPostPage from "./Pages/EditPostPage";

export const server_url = 'https://weblog-9c7k.onrender.com'

function App() {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>

            <Route index element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/edit/:id" element={<EditPostPage />} />

          </Route>

        </Routes>
      </UserContextProvider>

    </>
  );
}

export default App;
