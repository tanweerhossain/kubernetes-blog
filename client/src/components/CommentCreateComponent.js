import { useState } from "react";
import { saveComments } from "../services/comments";

const CommentCreateComponent = ({ postId }) => {
    const [content, setContent] = useState();

    const onSubmit = async (event) => {
        event.preventDefault();

        await saveComments(postId, content);
        
        setContent('');
    };
    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>New Comment</label>
                <input onChange={e => setContent(e.target.value)} className="form-control" type="text" />
            </div><br />
            <button className="btn btn-primary">Submit</button>
        </form>
    );
};

export default CommentCreateComponent;