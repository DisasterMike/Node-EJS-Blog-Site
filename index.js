import express from "express";

const app = express();
const port = 3000;

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))

let posts = [];
let uniqueId = 1;

app.get("/", (req, res) => {
    res.render("index.ejs",
        {
            blogPosts: posts
        }
    );
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs")
});

app.post("/posts/create", (req, res) => {
    // console.log(req.body);
    posts.push({ id: uniqueId, title: req.body.title, content: req.body.content });
    uniqueId += 1;
    res.redirect("/");
});

app.get("/posts/:id/edit", (req, res) => {
    // console.log(req.params.id);
    res.render("edit.ejs", {
        blogPost: posts[req.params.id - 1]
    })
});

app.post("/update/:id", (req, res) => {
    // console.log(req.body);
    posts[req.params.id - 1].title = req.body.title;
    posts[req.params.id - 1].content = req.body.content;
    res.redirect("/");
});

app.listen(port, () =>{
    console.log(`Listening on port ${port}!`);
});