import express from "express";
import bodyParser from "body-parser";
const app=express();
const port=3000;
let db={};
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.render("index.ejs");
})
app.post("/submit",(req,res)=>{
   let title=req.body["postTitle"];
   let content=req.body["postContent"];
   let Sno=Object.keys(db).length+1;
   db[Sno] ={title: title,content:content};

   res.render("index.ejs",{db:db});
   
})
app.post("/read",(req,res)=>{
   let rowId=req.body["rowId"];
   let title=db[rowId].title;
   let content=db[rowId].content;
   res.send({title:title,content:content});
   
})

app.post("/update",(req,res)=>{
    
    let UpdatedTitle=req.body["updateTitle"];
    let UpdatedContent=req.body["updateContent"];
    let rowId=req.body["updateKey"];
    
    // Check if the entry with the given rowId exists in the db
    if (db.hasOwnProperty(rowId)) {
        db[rowId].title = UpdatedTitle;
        db[rowId].content = UpdatedContent;

        

        res.render("index.ejs", { db: db });
    } 
})
app.post("/delete",(req,res)=>{
    
    let rowId=req.body["deleteKey"];
    console.log(rowId);
    if (db[rowId]) {
        delete db[rowId];
        
    }
    res.render("index.ejs",{db:db});
})
app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
}) 