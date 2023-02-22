import { useState } from "react";

interface ForumModalProps {
  onSubmit: (body: string) => void;
}

function ForumMessageModal({ onSubmit }: ForumModalProps) {
  const [body, setBody] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(body);
    setBody("");
  };

  return (
    <div>
      <h2>Write your answer</h2>
      <form onSubmit={handleSubmit}>
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

export default ForumMessageModal;
