import './Post.css'
import { useState } from "react";
import axios from 'axios';

const Post = (props) => {
    const [likesCount, setLikesCounts] = useState(props.post.likes.length);
    const [deleteModalVisible, setdeleteModalVisible] = useState(false);
    const [doesUserLiked, setDoesUserLiked] = useState(props.post.likes.filter(like => like.username === props.user?.username).length !== 0);

    const deletePost = (id) => {
        axios.post("https://akademia108.pl/api/social-app/post/delete", {
            post_id: id,
        })
            .then((res) => {
                props.setPosts((posts) => {
                    return posts.filter((post) => post.id !== res.data.post_id);

                })
            })
            .catch((error) => {
                console.log(error);
            });

    }
    const likePost = (id, isLiked) => {
        axios.post('https://akademia108.pl/api/social-app/post/' + (isLiked ? 'dislike' : 'like'), {
            post_id: id
        })
            .then(() => {
                setLikesCounts(likesCount + (isLiked ? -1 : 1));
                setDoesUserLiked(!isLiked);
            })
    }


    const unfollow = (id) => {
        axios.post("https://akademia108.pl/api/social-app/follows/disfollow",{
            leader_id: id,
        })
            .then(() => {
                props.getLatestPost();
console.log('klik')
            })
            .catch((error) => {
                console.error(error)
            })
    }

    return (
        <div className="post">
            <div className="avatar">
                <img src={props.post.user.avatar_url} alt={props.post.user.username} />
            </div>
            <div className="postData">
                <div className="postMeta">
                    <div className="autor">{props.post.user.username}</div>
                    <div className="data">{props.post.created_at.substring(0, 10)}</div>
                </div>
                <div className="postContent">{props.post.content}</div>
                <div className="like">{props.user?.username === props.post.user.username && <button className="btn" onClick={

                    () => setdeleteModalVisible(true)}>Delete</button>}

                    {props.user && props.user.username !== props.post.user.username && ( <button className="btn" 
                    onClick={() => unfollow(props.post.user.id)}>unFollow</button>)}



                    {props.user && <button className="btn btn_unlike" onClick={() => likePost(props.post.id, doesUserLiked)}>
                    {doesUserLiked ? "DisLike" : "Like"}
                    </button>}
                    {likesCount}
                </div>
            </div>

            {deleteModalVisible && (<div className='deleteConfirmation'>
                <h3>Are you sure you want to delete post</h3>
                <button className="btn yes" onClick={() => deletePost(props.post.id)}>Yes</button>
                <button className="btn no" onClick={() => setdeleteModalVisible(false)
                }>No</button>

            </div>)}


        </div>)
}
export default Post;