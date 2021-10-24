const express = require('express');
const app = express(),
mongoose = require('mongoose');
const Character = require("./../models/Character");
const router = express.Router();

const connectionString =  'mongodb+srv://marcin:marcin@cluster0.khili.mongodb.net/jeden?retryWrites=true&w=majority'
    
console.log('Server-side code running');

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
    }).then(() => {
        console.log('Database connected sucessfully ')
    },
    error => {
        console.log('Could not connected to database : ' + error)
    }
)

if (Character.length){ //jezeli kolekcja o nazwie characterschema nie jest pusta, to ją usuń! zeby za kazdym uruchoemieniem nie było tak, ze się powiększa o kilka dokumentów
    Character.collection.drop()
}
Character.create([
    { name: 'Jan Kowalski', age: 59, rank: 'Major' },
    { name: 'WIlhelm Winkler', age: 29, rank: 'Komandor' },
    { name: 'Jacek Nowak', age: 28, rank: 'Komandor Porucznik' },
    { name: 'Antoni Misiewicz', age: 29, rank: 'Komandor' },
    { name: 'Roman Dworek', age: 24, rank: 'Komandor' }
]);

//odczyt po załadowaniu strony
router.get('/', async function (req, res) {

    const findID =  await Character.find();
    // const findID =  await Character.find({ rank: 'Komandor' });
	await res.render('index',{
        title: "Tytuł strony",
        find: findID
    });
});

//odczyt po kliknięciu przycisku
router.get('/posts', async function (req, res) {

    const findID =  await Character.find();
    // const findID =  await Character.find({ rank: 'Komandor' });
	await res.json(findID)
});

//dodanie do bazy po kliknieciu przycisku
router.post("/",  async function (req, res) {
    const insertDoc = new Character({name: req.body.name,rank:req.body.rank, age:req.body.age})
    await insertDoc.save(function (err, someVal) {
        if (err) return console.error(err);
        console.log(someVal.name + " saved to collection.");
    });
    // res.status(204).send() //zostanie na tej samej stronie!!!
    res.redirect('/')  //zostanie na tej samej stronie!!!
})


//update bazy po kliknieciu przycisku
router.post("/update",  async function (req, res) {
    const findID = await Character.find();
    await Character.findByIdAndUpdate({_id: findID[2]._id}, {rank: "generał", age: 34});
    res.redirect('/') 
})


//usunięcie z bazy pierwszego elementu po kliknieciu przycisku
router.post("/delete",  async function (req, res) {
    const findID = await Character.find();
    await Character.deleteOne({_id: findID[0]._id});
    res.redirect('/') 
})


//usunięcie wwybranego elementu po kliknieciu przycisku
router.post("/deleteChoosen",  async function (req, res) {
    console.log(req.body.ktoryUsunac)
    const findID = await Character.find();
    await Character.deleteOne({_id: findID[req.body.ktoryUsunac]._id});
    res.redirect('/') 
})

module.exports = router;