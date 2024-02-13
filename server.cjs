const express = require('express')
const bodyParser = require('body-parser')
const {ObjectId} = require('mongodb')
// Importing the required functions from dbConnection.cjs
const {connectToDb, getDb} = require('./dbConnection.cjs')
const cors = require('cors')
//creating instance for express
const app = express()
app.use(cors())
app.use(bodyParser.json())


// using promise
// function ready() {
//   return new Promise(function(resolve, reject) {
//     connectToDb();
//     resolve();    
//     })
// }
// async function executeFunc() {
//   await ready();
//   app.listen(8000)
//   console.log('Listening to port 8000')
// }
// executeFunc()

//using callback
let db
connectToDb(function(error) {
    if(error) {
        console.log('Could not establish connection...')
        console.log(error)
    } else {
        const port = process.env.port || 8000  //when run render process.env.port when run local system 8000 taken
        app.listen(port)
        db = getDb()
        console.log(`Listening on port {port}...`)
    }
})
 //before running app.listen() we make sure db connectivity is established other wise not found of db


// app.get('/', function(request,response){
//    response.send('achieved')
// })

app.post('/add-entry', function(request,response){
    db.collection('ExpensesData').insertOne(request.body).then(function() {
        response.status(201).json(
            {
                "status" :" Entry added successfully"
            }
        )
    }).catch(function (){
        response.status(500).json({
            "status" :"Enter Not added"
        })    
    })
})


app.get('/get-entries', function(request, response)
    //find does not  return the data it returns a cursor(pointer of first data in collection) we have to iterate it and in a array and give it as response
    
  {
    const entries=[]
    db.collection('ExpensesData')
    .find()
    .forEach(entry=>entries.push(entry))
    .then(function(){
        response.status(200).json(entries)
    }).catch(function(){
        response.status(500).json({
            "status" : "could not fetch "
        })
    })
  }

)


// //using query (https:localhost/delete-entry?name='mouly')
// app.delete('/delete-entry', function(request, response) {
//     if(ObjectId.isValid(request.query.id)) {
//         db.collection('ExpensesData').deleteOne({
//             _id : new ObjectId(request.query.id)
//         }).then(function() {
//             response.status(200).json({
//                 "status" : "Entry successfully deleted"
//             })
//         }).catch(function() {
//             response.status(500).json({
//                 "status" : "Entry not deleted"
//             })
//         })
//     } else {
//         db.collection('ExpensesData').deleteOne({
//             name : (request.query.name),
//             dept : (request.query.dept)
//         }).then(function() {
//             response.status(200).json({
//                 "status" : "Entry successfully deleted"
//             })
//         }).catch(function() {
//             response.status(500).json({
//                 "status" : "Entry not deleted"
//             })
// })
// }
// })



app.delete('/delete-entry', function(request, response) {
    const query = request.body;
    console.log(query)
    if (Object.keys(query).length === 0) {
        response.status(400).json({ "status": "Invalid request. Provide query criteria in the request body." });
        return;
    }

    db.collection('ExpensesData').deleteOne(query)
        .then(function() {
            response.status(200).json({ "status": "Entry successfully deleted" });
        }).catch(function() {
            response.status(500).json({ "status": "Entry not deleted" });
        });
});

//delete-entry using body

//patch using param(https:localhost/mouly)
// app.patch()