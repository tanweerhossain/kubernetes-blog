const CommentListComponent = ({ comments }) => {
    return (
        <ul>
            {
                comments
                    .map(comment => (
                        <li key={comment.id}>
                            <p>{
                                (() => {
                                    switch (comment.status) {
                                        case 'ACCEPTED': {
                                            return comment.content;
                                        }
                                        case 'REJECTED': {
                                            return <span className="text-danger">{'Comment Rejected'}</span>;
                                        }
                                        case 'PENDING': {
                                            return <span className="text-warning">{'Comment awaiting for moderation'}</span>;
                                        }
                                    }
                                })()
                            }</p>
                        </li>
                    ))
            }
        </ul>
    );
};

export default CommentListComponent;