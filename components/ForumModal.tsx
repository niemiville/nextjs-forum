import { useState } from "react";

interface ForumModalProps {
  onSubmit: (title: string, body: string) => void;
}

function ForumModal({ onSubmit }: ForumModalProps) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(title, body);
    setTitle("");
    setBody("");
  };

  return (
    <div className="threadModal">
      <h2>New thread</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title" />
        <input
          type="text"
          id="title"
          placeholder="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <br/>
        <label htmlFor="body" />
        <textarea
          id="body"
          placeholder="Body"
          value={body}
          onChange={(event) => setBody(event.target.value)}
        />
        <br/>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ForumModal;
