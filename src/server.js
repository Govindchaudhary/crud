let express = require('express');
let pg = require('pg');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let cors = require('cors');

const PORT=3001;

let pool = new pg.Pool({
    user:"postgres",
    database:"demo",
    password:"password",

    host:"localhost",
    port:5432,
    max:10

});



let app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(morgan('dev'));

app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-With, Content-Type,Accept");
    next();
});


app.get('/api/users',function(request,response){
    pool.connect((err,db,done) => {
        if(err)
        return response.status(400).send({message:err});
        else{
            db.query('SELECT * from demo_table',(err,table)=> {
                done();
                if(err)
                   return response.status(400).send({message:err});
                else
                {
                    return response.status(200).send(table.rows);
                }
            })
        }
    })
})

app.get('/api/user:id',function(request,response){
    pool.connect((err,db,done) => {
        if(err)
        return response.status(400).send({message:err});
        else{
            db.query('SELECT * from demo_table where id=$1',[request.params.id],(err,table)=> {
                done();
                if(err)
                   return response.status(400).send({message:err});
                else
                {
                    return response.status(200).send(table.rows);
                }
            })
        }
    })
})

app.post('/api/new-user',function(request,response){
    
    var name=request.body.name;
    var date = request.body.date;
    var email=request.body.email;
    var id=request.body.id;
    
    let values=[ name , date , email ,id];

    pool.connect((err,db,done) => {
        if(err)
        {
            console.log(err);
        }
        else{
            db.query('INSERT INTO demo_table ( name, date, email,id) VALUES ($1,$2,$3,$4)',[...values],(err,table)=>{
                done();
                if(err)
                   return console.log(err);
                else
                {
                   
                    console.log("Data Inserted");
                    
                    return response.status(200).send({message:"data inserted suucessfully"});
                    
                }
                   
            })
        }
    })
})

app.put('/api/update:id',function(request,response){
    
    var name=request.body.name;
    var date = request.body.date;
    var email=request.body.email;
    let id=request.params.id;
    
    

    pool.connect((err,db,done) => {
        if(err)
        {
            console.log(err);
        }
        else{
            db.query('UPDATE demo_table SET name=$1,date=$2,id=$3,email=$4 where id=$5',[name,date,id,email,id],(err,table)=>{
                done();
                if(err)
                   return console.log(err);
                else
                {
                   
                    console.log("Data Updated");
                    
                    return response.status(200).send({message:"data updated suucessfully"});
                    
                }
                   
            })
        }
    })
})

app.delete('/api/remove:id',function(request,response){
    let id=request.params.id;
    pool.connect((err,db,done) => {
        if(err)
          return response.status(400).send(err);
        else{
            db.query('DELETE  from demo_table where id=$1',[id],(err,result)=>{
                done();
                if(err)
                  return response.status(400).send(err);
                else{
                    return response.status(200).send({message:"data deleted successfully"});
                }
            })
        }
    })
})

app.listen(PORT,()=> console.log("listening on port",+PORT));