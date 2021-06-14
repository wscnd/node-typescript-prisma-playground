import { PrismaClient } from "@prisma/client";
import express from "express";
import morgan from "morgan";
import os from "os";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

const prisma = new PrismaClient();

app.get("/posts", async (req, res) => {
  const posts = await prisma.post.findMany();
  console.dir(posts, { depth: Infinity });
  res.json(posts);
});

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  console.dir(users, { depth: Infinity });
  res.json(users);
});

const localIp = os.networkInterfaces()["eth0"]?.[0]?.address;
const port = 3000;

app.listen(port, async () => {
  await prisma.$connect().then(() => {
    console.log(`listening on http://${localIp}:${port}`);
  });
});
