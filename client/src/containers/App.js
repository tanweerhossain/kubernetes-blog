import PostCreateComponent from "../components/PostCreateComponent";
import PostListContainer from "./PostListContainer";

// eslint-disable-next-line
export default () => (
  <div className="container">
    <h1>Create Post</h1>
    <hr />
    <PostCreateComponent />
    <hr />
    <h1>Posts</h1>
    <PostListContainer />
  </div>
);
