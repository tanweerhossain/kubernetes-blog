import { useState } from 'react';
import { savePosts } from '../services/posts';

const PostCreateComponent = () => {
    const [title, setTitle] = useState();

    const onSubmit = async (event) => {
        event.preventDefault();

        await savePosts(title);
        
        setTitle('');
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>Title</label>
                <input onChange={e => setTitle(e.target.value)} className="form-control" type="text" />
            </div><br />
            <button className="btn btn-primary">Save</button>
        </form>
    );
};

export default PostCreateComponent;