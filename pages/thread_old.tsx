import Link from "next/link";

export default function ThreadOld(props: { posts: { "title": any, "rows": any[] } }) {
  return (
    <div>
      <h2>Thread</h2>
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

export async function getStaticProps() {
  const response = await fetch("http://localhost:3001/api/thread/16");
  const data = await response.json();

  return {
    props: {
      posts: data
    }
  }
}