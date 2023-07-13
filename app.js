const express = require('express');
const app = express();
const postsRouter = require("./routes/posts.route")
const PORT = 3000;

app.use(express.json());
app.use('/api', [postsRouter]);

app.listen(PORT, () => {
  console.log(`${PORT}번에서 서버가 시작되었습니다`)
});