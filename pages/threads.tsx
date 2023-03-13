import Link from "next/link";
import { useState } from "react";
import ForumModal from "../components/ForumModal";
import { addNewThreadWithMessage } from "./api/services/services";
import { formatDate } from "./api/utils/format-date"

export default function Threads(props: { posts: any[]; }) {
  const [showModal, setShowModal] = useState(false);

  const handleNewThreadSubmit = async (title: string, body: string) => {
    console.log("Submitting new thread:", title, body);
    await addNewThreadWithMessage(title, body);
    setShowModal(false);
  };

  return (
    <>
      <h2>Threads</h2>
      <p><Link href={`/`}>back to front page</Link></p>
      <button onClick={() => setShowModal(true)}>New Thread</button>
      {showModal && (
        <ForumModal onSubmit={handleNewThreadSubmit} />
      )}
      <h3>Newest threads</h3>
      <table>
      <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Creation timestamp</th>
          </tr>
        </thead>
        <tbody>
      {props.posts.map(post => {
        return (
          <tr key={post.id}>
            <td>{post.id}</td> 
            <td><Link href={`/thread/${post.id}`}>{post.title}</Link></td>
            <td>{formatDate(post.creation_timestamp)}</td>
          </tr>
        )
      })}
      </tbody>
      </table>
    </>
  );
};

export async function getStaticProps() {
  const response = await fetch("http://localhost:3001/api/threads/newest20");
  const data = await response.json();

  return {
    props: {
      posts: data
    }
  };
};