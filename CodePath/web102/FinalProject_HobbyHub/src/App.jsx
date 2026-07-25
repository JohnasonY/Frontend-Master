import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeFeed from "./pages/HomeFeed";
import CreatePost from "./pages/CreatePost";
import PostDetail from "./pages/PostDetail";
import EditPost from "./pages/EditPost";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeFeed />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/posts/:id/edit" element={<EditPost />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
