import React ,{useState ,useEffect} from 'react'
import "./Feed.css"
import StoryReel from './StoryReel'
import MessageSender from './MessageSender'
import Post from './Post'
import { useStateValue } from './stateProvider'
import db from "./firebase"

function Feed() {
    const [{user},dispatch]=useStateValue();
    const [posts,setPosts]=useState([]);

    useEffect(() => {
            db.collection("posts").orderBy("timestamp","desc").onSnapshot(snapshot=>
                setPosts(snapshot.docs.map((doc)=>({
                    id:doc.id,
                    data: doc.data()
                })
                ))

            )        
    }, [])

    return (
        <div className="feed"> 
            <StoryReel className="storyReel"/>
            <MessageSender user={user.displayName} className="messageSender"/>

            {posts.map(post=>{
                return(
                    <Post
                    key={post.id}
                    postID={post.id}
                    profilePic={post.data.profilePic}
                    message={post.data.message}
                    timestamp={post.data.timestamp}
                    username={post.data.username}
                    image={post.data.image}
                    />
                )
            })}
        </div>
    )
}

export default Feed
