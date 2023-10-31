import React, { useEffect, useState } from 'react'
import Post from '../components/Post'
import {server_url} from '../App'

const Home = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetch(`${server_url}/post`).then(response => {
          response.json().then(posts => {
            setPosts(posts);
          });
        });
      }, []);

    return (
        <>
            {posts.length > 0 && posts.map((post) => (
                <Post  {...post} key={post._id}  />
            ))}
        </>
    )
}

export default Home