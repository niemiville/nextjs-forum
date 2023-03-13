import Link from "next/link";
import { useState } from "react";
import ForumMessageModal from "../../components/ForumMessageModal";
import { addNewMessageToThread } from "../api/services/services";
import { formatDate } from "../api/utils/format-date"

export default function Thread(props: { posts: { "title": any, "rows": any[] } }) {
  const [showModal, setShowModal] = useState(false);

  const handleNewThreadSubmit = async (body: string) => {
    console.log("Submitting new message:", props.posts.rows[0].thread_id, body);
    await addNewMessageToThread(props.posts.rows[0].thread_id, body);
    setShowModal(false);
  };

  return (
    <div>
      <h2>Thread</h2>
      <p><Link href={`/threads`}>back to threads</Link></p>
      <button onClick={() => setShowModal(true)}>Answer to thread</button>
      {showModal && (
        <ForumMessageModal onSubmit={handleNewThreadSubmit} />
      )}
      <h3>{props.posts.title}</h3>
      <div>
        {props.posts.rows.map(post => {
          return (
            <div key={post.id}>
              <div className="postContainer"><div className="postIdDate">{post.id} {formatDate(post.creation_timestamp)}</div><div className="postLikes">Likes: {post.likes} Dislikes: {post.likes}</div></div>
              <div className="postText">{post.text}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export async function getStaticPaths() {
  const response = await fetch("http://localhost:3001/api/threads/newest20");
  const data = await response.json();

  const thePaths = data.map((thread: { id: any; }) => {
    return { params: { id: thread.id.toString() } }
  });

  return {
    paths: thePaths,
    fallback: false
  };
};

export async function getStaticProps(context: { params: { id: any; }; }) {
  const response = await fetch(`http://localhost:3001/api/threads/${context.params.id}`);
  const data = await response.json();
  
  return {
    props: {
      posts: data
    }
  };
};

/* export async function getServerSideProps() {
  
  const response = await fetch(`http://localhost:3001/api/thread/16`);
  const data = await response.json();

  return {
    props: {
      posts: data
    }
  }
}; */