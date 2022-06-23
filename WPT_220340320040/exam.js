let dbpparams={
    port:3306,
    host:"localhost",
    user:"root",
    password:"cdac",
    database:"exam"
};
const mysql=require("mysql2");
const con=mysql.createConnection(dbpparams);

const express=require("express");
const { response } = require("express");
const app=express();

app.use(express.static("static"));

app.get("/getitem",(req,res)=>{
    let input=req.query.x;
    console.log(input);
    let output={
        itemfoundstatus:false,
        itemdetails:{
            bookid:1,bookname:"abc",price:200
            },
        };
        con.query("selct * from item where bookno =?",[input],(error,rows)=>{
            if(rows.length>0)
            {
                output.itemfoundstatus=true;
                output.itemdetails=rows[0];
            }
            response.send(output);
        });
    });

    app.get("/additem",(req,res)=>{
        let input={
        bookid:req.query.x,
        bookname:req.query.y,
        price: req.query.z,
    };
    console.log(input);
    let output=true;

    con.query(
        "insert into item(bookid,bookname,price) values (?,?,?)",
        [input.bookid,input.bookname,input.price],
        (error,intoisert)=>{
            if(error)
            {

            }
            elseif(intoisert.affectedrows >0)
            {
                output=true;
            }
            res.send(output);
        }
    );
});



app.get("/updateitem",(req,res)=>{
    let output=false;
    let input={
    bookid:req.query.bookid,
    bookname:req.query.bookname,
    price: req.query.price,
};


con.query(
    "update into set bookname=?,price=? where itemno=?",
    [input.bookid,input.bookname,input.price],
    (error,intoisert)=>{
        if(error)
        {

        }
        elseif(intoisert.affectedrows >0)
        {
            output=true;
        }
        res.send(output);
    }
);
});
