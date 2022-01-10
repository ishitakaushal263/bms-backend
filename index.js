// const db = require("./database/movies");
// require('dotenv').config();
// console.log(db)

//Express thing------------------------------------------------------------------------------
const express = require("express")

const app = express();
var cors = require('cors')
app.use(cors());

app.use(express.json()) //Use to Post request from Postman

//Import the mongoose module-----------------------------------------------------------
var mongoose = require('mongoose');
const MoviesModel = require("./database/movies");
const userModel = require("./database/userModel");
//Set up default mongoose connection
// var mongoDB = 'mongodb+srv://CheeseMaster_69:seabirdkant1A@cluster0.5crnt.mongodb.net/BookMyShow?retryWrites=true&w=majority';
var mongoDB = "mongodb://CheeseMaster_69:seabirdkant1A@cluster0-shard-00-00.5crnt.mongodb.net:27017,cluster0-shard-00-01.5crnt.mongodb.net:27017,cluster0-shard-00-02.5crnt.mongodb.net:27017/BookMyShow?ssl=true&replicaSet=atlas-ghswrc-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("CONNECTION ESTABLISHED"));




app.get("/", (req, res) => {
    return res.json({ "Welcome": ` to my BMS Backend ` });

});

app.get("/movies", async (req, res) => {

    const getAllMovies = await MoviesModel.find();

    return res.json(getAllMovies);
});

app.get("/movies/:id", async (req, res) => {
    const { id } = req.params;
    const getSpecificMovie = await MoviesModel.findOne({ _id: id })
    return res.json(getSpecificMovie)
})

app.post("/user-register", async (req, res) => {

    const addNewUser = await userModel.create(req.body);
    return res.json({ userAdded: addNewUser, message: `User is Added!!!!` });
})

app.listen(process.env.PORT||4000, () => {

    console.log("My Express App is Running......");
})
