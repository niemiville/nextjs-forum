import Link from "next/link";
import { useState } from "react";
import ForumMessageModal from "../../components/ForumMessageModal";
import { addNewMessageToThread } from "../api/services/services";

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
      <table>
        <thead>
          <tr>
            <th>message id</th>
            <th>thread id</th>
            <th>user id</th>
            <th>text</th>
            <th>likes</th>
            <th>dislikes</th>
            <th>creation timestamp</th>
          </tr>
        </thead>
      <tbody>
      {props.posts.rows.map(post => {
        return (
          <tr key={post.id}>
            <td>{post.id}</td> 
            <td>{post.thread_id}</td>
            <td>{post.user_id}</td>
            <td>{post.text}</td>
            <td>{post.likes}</td>
            <td>{post.dislikes}</td>
            <td>{post.creation_timestamp}</td>
          </tr>
        )
      })}
      </tbody>
      </table>
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