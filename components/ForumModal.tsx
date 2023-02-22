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
    <div>
      <h2>New Thread</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <label htmlFor="body">Body</label>
        <textarea
          id="body"
          value={body}
          onChange={(event) => setBody(event.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ForumModal;
