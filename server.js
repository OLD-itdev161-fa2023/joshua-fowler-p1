const { MongoClient } = require('mongodb');

async function main() {
  // Connects to server
  const uri = "mongodb+srv://fowlerj9:z1x2c3v4b5@base1.v9ntbao.mongodb.net/?retryWrites=true&w=majority";
  // Sets server connection as client
  const client = new MongoClient(uri);
  try{
    await client.connect();
    // After making connection it fill fill the data base with Student Grades
      await createStudentRecords(client, [
      {
      english: "A",
      math: "B",
      science: "D",
      history: "B",
      gym: "A",
      first_Name: "Joshua",
      last_Name: "Fowler"},
      {
      english: "A",
      math: "A",
      science: "A",
      history: "A",
      gym: "C",
      first_Name: "Johnson",
      last_Name: "Ateo"},
      {
      english: "A",
      math: "B",
      science: "C",
      history: "C",
      gym: "A",
      first_Name: "Joashas",
      last_Name: "Julited"},
      {
      english: "D",
      math: "D",
      science: "D",
      history: "D",
      gym: "A",
      first_Name: "Mark",
      last_Name: "Bulstk"},
      {
      english: "B",
      math: "B",
      science: "B",
      history: "B",
      gym: "B",
      first_Name: "Kilborn",
      last_Name: "Avenuy"},
      {
      english: "F",
      math: "F",
      science: "D",
      history: "B",
      gym: "F",
      first_Name: "Uni",
      last_Name: "Kail"},
      {
      english: "C",
      math: "C",
      science: "C",
      history: "C",
      gym: "C",
      first_Name: "Looke",
      last_Name: "Aulti"}
      ]); 

  }catch (e){
      console.error(e);
  }finally{
    //Finishes task and closes connection
    await client.close();
  } 
  // Gets refreshed information 
  await client.connect();

  try{
    await client.connect();
    //Searches collection for students with the first name joshua and displays information
    await findOneStudentsRecord(client,"Joshua"); 
  }catch (e){
      console.error(e);
  }finally{
    await client.close();
  }

  await client.connect();

  try{
    await client.connect();
    // Calls function to update student that macthes first and last name and updates subject grades
    await updateStudentsRecord(client,"Johnson","Ateo", {gym: "D", science: "B", english: "F"});
  }catch (e){
      console.error(e);
  }finally{
    await client.close();
  }

  await client.connect();

  try{
    await client.connect();
    //Deletes the records of the first and last name of student
    await deleteStudentRecord(client,"Joshua","Fowler"); 
  }catch (e){
      console.error(e);
  }finally{
    await client.close();
  }
   
  await client.connect();

  /*
  try{
    await client.connect();
    //Deletes the records of everyone
    await deleteBook(client);
  }catch (e){
      console.error(e);
  }finally{
    await client.close();
  }  

  await client.connect();  */
  
  try{
    await client.connect();
    //lists all student records available
    await listDatabases(client);
  }catch (e){
      console.error(e);
  }finally{
    await client.close();
  }

}




main().catch(console.error);
//Updates record based on first and last name along with update information
async function updateStudentsRecord(client, first_Name, last_Name, updatedInfo){
const result = await client.db("Gradebook").collection("gradebook").updateOne({ first_Name: first_Name,last_Name:last_Name}, {$set: updatedInfo});

console.log(`${result.matchedCount} Record matched the query criteria`);
console.log(`${result.modifiedCount} Record was updated`);

}
//deletes only the record of the matching first and last name
async function deleteStudentRecord(client, first_Name, last_Name){
const result = await client.db("Gradebook").collection("gradebook").deleteOne({ first_Name: first_Name,last_Name:last_Name});

console.log(`${result.deletedCount} Records that matched query criteria have been deleted`);

}

async function deleteBook(client){
result = await client.db("Gradebook").collection("gradebook").deleteMany({ first_Name: "Looke",last_Name:"Aulti"});
result = await client.db("Gradebook").collection("gradebook").deleteMany({ first_Name: "Uni",last_Name:"Kail"});
result = await client.db("Gradebook").collection("gradebook").deleteMany({ first_Name: "Mark",last_Name:"Bulstk"});
result = await client.db("Gradebook").collection("gradebook").deleteMany({ first_Name: "Joashas",last_Name:"Julited"});
result = await client.db("Gradebook").collection("gradebook").deleteMany({ first_Name: "Johnson",last_Name:"Ateo"});
result = await client.db("Gradebook").collection("gradebook").deleteMany({ first_Name: "Joshua",last_Name:"Fowler"});
result = await client.db("Gradebook").collection("gradebook").deleteMany({ first_Name: "Kilborn",last_Name:"Avenuy"});
console.log(`All Records have been wiped`);

}
//searches records to see if a student matching the first name exists
async function findOneStudentsRecord(client, nameOfStudent) {
  const result = await client.db("Gradebook").collection("gradebook").findOne({first_Name: nameOfStudent});

if(result){
  console.log(`found Record with following name '${nameOfStudent}'`);
  console.log(result);

}else{
  console.log(`no Record found with the name '${nameOfStudent}'`);
}

}

//creates all records for students to start database
async function createStudentRecords(client, newRecords) {
  const result = await client.db("Gradebook").collection("gradebook").insertMany(newRecords);

  console.log(`${result.insertedCount} New Records created with the following id: (s):`);
  console.log(result.insertedIds);
}
//function to add a singular record for a new student
async function createRecord(client, newRecord) {

const result = await client.db("Gradebook").collection("gradebook").insertOne(newRecord);
console.log(`New Record created with the following id: ${result.insertedID}`);

}



// Lists all databases available to search
async function listDatabases(client) {
  const databasesList = await client.db().admin().listDatabases();
 const uri = "mongodb+srv://fowlerj9:z1x2c3v4b5@base1.v9ntbao.mongodb.net/?retryWrites=true&w=majority";
  /*console.log("Databases:");
  databasesList.databases.forEach(db => {
    console.log(`- ${db.name}`);
  });*/
  
MongoClient.connect(uri, function(err, db) {
  if (err) throw err;
  var dbo = db.db("Gradebook");
  dbo.collection("gradebook").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});
}
