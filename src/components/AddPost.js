import './AddPost.css';

import axios from 'axios';
import { useState } from 'react';

const AddPost = (props) => {

    const [postContent, setPostContent] = useState("")

    const addPost = (e) => {
        e.preventDefault();
        console.log('klik')
        if (!postContent) {
            return;
        }
        axios.post("https://akademia108.pl/api/social-app/post/add", { content: postContent, })
            .then(() => { props.getPrevPost();
            setPostContent(''); })
            .catch((error) => { console.log(error) })
    }
    return (
        <form className="addPostForm" onSubmit={addPost}>
            <textarea placeholder="add post"
                onChange={(e) => setPostContent(e.target.value)}
                value={postContent}></textarea>
            <button className="btn"> DODAJ POST </button>
        </form>
    )
}
export default AddPost