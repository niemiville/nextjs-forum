import Link from "next/link"

export default function Threads(props: { posts: any[]; }) {
  return (
    <>
      <h2>Threads</h2>
      <table>
      <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Creation timestamp</th>
          </tr>
        </thead>
        <tbody>
      {props.posts.map((post, index) => {
        return (
          <tr key={post.id}>
            <td>{post.id}</td> 
            <td>{post.title}</td>
            <td>{post.creation_timestamp}</td>
          </tr>
        )
      })}
      </tbody>
      </table>
    </>
  )
}

export async function getStaticProps() {
  const response = await fetch("http://localhost:3001/api/threads/newest20");
  const data = await response.json();

  return {
    props: {
      posts: data
    }
  }
}