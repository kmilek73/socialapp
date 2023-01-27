import './Home.css'
import axios from "axios";
import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import AddPost from '../components/AddPost';
import FollowRec from '../components/FollowRec';



const Home = (props) => {
  const [posts, setPosts] = useState([])

  const getLatestPost = () => {
    axios.post("https://akademia108.pl/api/social-app/post/latest")
      .then((res) => { setPosts(res.data) })
      .catch((error) => {
        console.log(error)
      })


  }
  const getNextPost = () => {
    axios.post("https://akademia108.pl/api/social-app/post/older-then", { date: posts[posts.length - 1].created_at })
      .then((res) => { setPosts(posts.concat(res.data)) })
      .catch((error) => {
        console.log(error)
      })


  }
//odświeżanie po dodaniu postów
  const getPrevPost = () => {
    axios.post("https://akademia108.pl/api/social-app/post/newer-then", { date: posts[0].created_at })
      .then((res) => { setPosts(res.data.concat(posts)) }) //tablica która przychodzi dodaj do starszych postów
      .catch((error) => {
        console.log(error)
      })


  }


  useEffect(() => { getLatestPost(); 
  }, [props.user]);


  return (
    <div className="home">
      {props.user && <AddPost  getPrevPost={getPrevPost}/>} 
     
      {props.user && <FollowRec user={props.user} getLatestPost={getLatestPost}  posts={posts}/>}     
       <div className="postList">

        {posts.map((post) => {
          return <Post post={post} key={post.id} getLatestPost={getLatestPost}  user={props.user} username={props.username} setPosts={setPosts}/>
        })}
        <button className="btn loadMore" onClick={getNextPost}>Wczytaj więcej</button>
      </div>
    </div>
  );
}
export default Home;