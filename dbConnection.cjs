//to connect db 
const {MongoClient} = require('mongodb') // we only need mongoclient
let dbConnection
function connectToDb(callBack){ 
  // get the copy connection string from mongodb(3dot) + add the db name (expenseTracker)
  // dbConnection = MongoClient.connect('mongodb://localhost:27017/ExpenseTracker')  this leads to promise error because .connect is promise we need to handle it
  // MongoClient.connect('mongodb://localhost:27017/ExpenseTracker') for local



  
  //for cluster(cloud) mongodb+srv://moulyvinayaka:<password>@cluster0.ebocsyb.mongodb.net/?retryWrites=true&w=majority


  MongoClient.connect('mongodb+srv://moulyvinayaka:1234@cluster0.ebocsyb.mongodb.net/ExpensesTracker?retryWrites=true&w=majority').then(function(client){
    dbConnection = client.db()  // client is default parameter passed (we don't need to do anything with the client) client is connection we need the database of connection. so client.db()
    callBack() //if no error
    // console.log(dbConnection)
  }).catch(function(error) { //if error
    callBack(error)
})

}
function getDb(){
    return dbConnection
}

module.exports = {connectToDb, getDb} // to use the functions in another file(server.cjs) export it