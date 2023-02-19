"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
const cors = require('cors');
const app = (0, express_1.default)();
app.use(express_1.default.static('build'));
app.use(cors());
app.use(express_1.default.json());
dotenv_1.default.config();
const requestLogger = (request, _response, next) => {
    console.log('Method:', request.method);
    console.log('Path:  ', request.path);
    console.log('Body:  ', request.body);
    console.log('---');
    next();
};
app.use(requestLogger);
const pool = new pg_1.Pool({
    connectionString: process.env.DB_URI
});
const connectToDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield pool.connect();
    }
    catch (err) {
        console.log(err);
    }
});
app.get("/api/threads20", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield pool.connect();
        const sql = "SELECT * FROM thread LIMIT 20;";
        const { rows } = yield client.query(sql);
        const todos = rows;
        client.release();
        res.send(todos);
    }
    catch (error) {
        console.log(error);
    }
}));
app.get("/journeys/:page", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield pool.connect();
        const journeysPerPage = 20;
        const offset = parseInt(req.params.page) * journeysPerPage;
        const sql = `SELECT id, departure_station_name, return_station_name, covered_distance_m, duration_s 
                FROM journeys ORDER BY id ASC LIMIT ${journeysPerPage} OFFSET ${offset};`;
        const { rows } = yield client.query(sql);
        client.release();
        res.send(rows);
    }
    catch (error) {
        console.log(error);
    }
}));
const unknownEndpoint = (_request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
};
app.use(unknownEndpoint);
app.listen(process.env.PORT, () => {
    void connectToDB();
    console.log(`Backend server is running on port ${process.env.PORT}`);
});
