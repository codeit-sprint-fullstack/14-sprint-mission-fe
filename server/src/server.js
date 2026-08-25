import cors from "cors";
import "dotenv/config";
import express from "express";
import errorHandler from "./middlewares/errorHandler.js";
import articlesRouter from "./routes/articles.js";
import authRouter from "./routes/auth.js";
import commentsRouter from "./routes/comments.js";
import productsRouter from "./routes/products.js";
import usersRouter from "./routes/users.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Panda Market API server is running.");
});

app.use("/products", productsRouter);
app.use("/articles", articlesRouter);
app.use("/comments", commentsRouter);
app.use("/auth", authRouter);
app.use("/users", usersRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
