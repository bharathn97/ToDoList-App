const express=require("express");
const bodyparser=require("body-parser");
const app=express();
const mongoose=require("mongoose");

mongoose.connect("mongodb+srv://bharathnagendrababu:Test123@cluster0.tw2n1qa.mongodb.net/todolistDB");
const itemsSchema=
  {
    name : String
  };
  const item= mongoose.model(
    "Item",itemsSchema
  );
  const item1 = new item({
    name :"Welcome to your to do list!"
  });
  const item2 = new item({
    name :"Hit + button to add a new item"
  });
  const item3 = new item({
    name :"Hit this to delete an item"
  });
  const defaultitems=[item1,item2,item3];
const listSchema={
  name:String,
  listitem:[itemsSchema]
};
const list=mongoose.model("List",listSchema);
app.set("view engine",'ejs');
app.use(express.static("public"));
app.get("/",function(req,res){
  item.find().then(items=>{
    if(items.length==0)
    {
      item.insertMany(defaultitems).then(()=>{
        console.log("Added successfully!");
      }).catch((err)=>{
        console.log(err);
      });
      res.redirect("/");
    }
    else{
    res.render("list",{listtitle: "Today",newlistitem: items ,route: "/"});
  }
  }).catch((err)=>{
    console.log(err);
  });
});
app.use(bodyparser.urlencoded({extended:true}));
app.post("/",function(req,res)
{
const itemName = req.body.newItem;
const ListName=req.body.list;
const item4=new item({
  name: itemName
});
if(ListName==="Today")
{
item4.save();
res.redirect("/");
}
else
{
  list.findOne({name:ListName}).then((foundlist)=>
{
  foundlist.listitem.push(item4);
  foundlist.save();
  res.redirect("/"+ListName);
})
}
});
app.post("/delete",function(req,res){
  const checkedItemId=req.body.checkbox;
  const LISTNAME=req.body.LISTNAME;
  if(LISTNAME==="Today")
  {
    item.findByIdAndRemove(checkedItemId).then(()=>{
  console.log("Successfully removed!");
}).catch((err)=>{
  console.log(err);
});
  res.redirect("/");
  }
  else
  {
    let doc =  list.findOneAndUpdate({name:LISTNAME}, {$pull: {items: {_id: checkedItemId}}}, {
            new: true
          }).then(function (foundList)
          {
            res.redirect("/" + LISTNAME);
          }).catch( err => console.log(err));
}
});
app.get("/:customlistname",function(req,res)
{
  const listname=req.params.customlistname;
  list.findOne({name:listname}).then((foundlist)=>{
    if(!foundlist)
    {
      const Listitem=new list({
        name:listname,
        listitem:defaultitems
      });
      Listitem.save();
      res.redirect("/"+listname);
}
  else
  {
  res.render("list",{newlistitem:foundlist.listitem,listtitle:foundlist.name});
}
  }).catch((err)=>{
    console.log(err);
  });

});
app.listen(process.env.PORT || 9797,function(){
  console.log("SERVER STARTED RUNNING ON 9797");
});
app.post("/work",function(req,res)
{
  let item=req.body.newItem;
  workitems.push(workitems);
  res.redirect("/work");
})
