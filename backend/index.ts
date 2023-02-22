import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { Pool } from "pg";
const cors = require('cors')
const app = express();
app.use(express.static('build'))
app.use(cors())
app.use(express.json())
dotenv.config();

const requestLogger = (request: Request, _response: Response, next: NextFunction) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
};
app.use(requestLogger);

const pool = new Pool({
  connectionString: process.env.DB_URI
});

const connectToDB = async () => {
  try {
    await pool.connect();
  } catch (err) {
    console.log(err);
  }
};

app.get("/api/threads/newest20", async (_req: Request, res: Response) => {
  try {
    const client = await pool.connect();

    const sql = "SELECT * FROM thread ORDER BY creation_timestamp DESC LIMIT 20;";
    const { rows } = await client.query(sql);
    const todos = rows;
    client.release();
    res.json(todos);
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/threads/:id", async (req: Request, res: Response) => {
  const threadTitleQuery = "SELECT title FROM thread WHERE id = $1;";
  const query = "SELECT * FROM message WHERE thread_id = $1 ORDER BY id ASC;"; //Maybe add LIMIT
  const values = [req.params.id];
  try {
    const client = await pool.connect();

    var { rows } = await client.query(threadTitleQuery, values);
    const title = rows[0].title;

    var { rows } = await client.query(query, values);

    client.release();
    res.json({ title, rows })
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/threads", async (req: Request, res: Response) => {
  const query = "INSERT INTO thread(title, creation_timestamp) VALUES($1, current_timestamp) RETURNING *;";
  const values = [req.body.title];

  try {
    const client = await pool.connect();
    const { rows }  = await client.query(query, values);
    client.release();
    res.send(rows)
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/threads/new-thread-with-message", async (req: Request, res: Response) => {
  try {
    const threadQuery = "INSERT INTO thread(title, creation_timestamp) VALUES($1, current_timestamp) RETURNING *;";
    const threadValues = [req.body.title];

    const client = await pool.connect();

    var { rows }  = await client.query(threadQuery, threadValues);
    const threadRow = rows[0];

    const messageQuery = "INSERT INTO message(thread_id, text, creation_timestamp) VALUES($1, $2, $3) RETURNING *;";
    const messageValues = [threadRow.id, req.body.text, threadRow.creation_timestamp];
    var { rows }  = await client.query(messageQuery, messageValues);
    const messageRow = rows;

    client.release();

    res.send( { threadRow, messageRow } );
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/message", async (req: Request, res: Response) => {
  const query = "INSERT INTO message(thread_id, text, creation_timestamp) VALUES($1, $2, current_timestamp) RETURNING *;";
  const values = [req.body.thread_id, req.body.text];

  try {
    const client = await pool.connect();
    const { rows }  = await client.query(query, values);
    client.release();
    res.send(rows)
  } catch (error) {
    console.log(error);
  }
});

const unknownEndpoint = (_request: Request, response: Response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

app.listen(process.env.PORT, () => {
  void connectToDB();
  console.log(`Backend server is running on port ${process.env.PORT}`);
});