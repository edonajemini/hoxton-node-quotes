import Database from "better-sqlite3";
const db = Database("./db/quotes.db", {verbose: console.log})

function createquotes () {
const quotes = [
    {
        id:1,
        authorId: 1,
        quote:"The greatest glory in living lies not in never falling, but in rising every time we fall."
    },
    {
        id:2,
        authorId:2,
        quote:"The way to get started is to quit talking and begin doing."
    },
    {
        id:3,
        authorId:3,
        quote:`Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma – which is living with the results of other people's thinking.`
    },
    {
        id:4,
        authorId:4,
        quote:"If life were predictable it would cease to be life, and be without flavor."
    },
    {
        id:5,
        authorId:5,
        quote:"If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough."
    },
    {
        id:6,
        authorId:6,
        quote:"If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success."
    },
    {
        id:7,
        authorId:7,
        quote:"Life is what happens when you're busy making other plans."
    },
    {
        id:8,
        authorId:8,
        quote:"Spread love everywhere you go. Let no one ever come to you without leaving happier. "
    }
]
const createquotestable = db.prepare(`
CREATE TABLE IF NOT EXISTS quotes (
    id INTEGER NOT NULL,
    quote TEXT NOT NULL,
    authorId INTEGER NOT NULL,
    PRIMARY KEY (id)
  );
`)
createquotestable.run()

const deleteQuotes = db.prepare(`
DELETE from quotes;
`)
deleteQuotes.run()

const creaateQuotes = db.prepare(`
INSERT INTO quotes (quote, authorId) VALUES (?,?);
`)
for (let quote of quotes) {
    creaateQuotes.run(quote.quote, quote.authorId)
}

}
function createauthors(){
const authors = [
        {
            id: 1,
            name:"Nelson",
            lastname:"Mandela",
            age: "Died 2013 - 95 years old",
            image:"https://www.biography.com/.image/t_share/MTY2MzU2NjgxMDUwMDM5OTk5/_photo-by-per-anders-petterssongetty-images.jpg",
          },
          {
            id: 2,
            name:"Walt",
              lastname:"Disney",
              age: "Died 1966 - 65 years old",
              image:"https://d3i6fh83elv35t.cloudfront.net/static/2018/12/GettyImages-164230988-1024x723.jpg",
              
          },
          {
            id: 3,
            name:"Steve",
              lastname:"Jobs",
              age: "Died 2011 - 56 years old",
              image:"https://upload.wikimedia.org/wikipedia/commons/d/dc/Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg",
              
          },
          {
              id: 4,
              name:"Eleanor",
              lastname:"Roosevelt",
              age: "Died 1962 - 78 years old",
              image:"https://www.biography.com/.image/t_share/MTgwMjA0MzI0Mjg1MDY0NTM2/gettyimages-515252110.jpg",
            },
            {
              id: 5,
              name:"Oprah",
              lastname:"Winfrey",
              age: "68 years old",
              image:"https://gossipgist.com/uploads/847/oprah-winfrey.png",
              
            },
            {
              id: 6,
              name:"James",
              lastname:"Cameron",
              age: "68 years old",
              image:"https://upload.wikimedia.org/wikipedia/commons/f/fe/James_Cameron_by_Gage_Skidmore.jpg",
              
            },
            {
              id: 7,
              name:"John",
              lastname:"Lennon",
              age: "Died 1980 - 40 years old",
              image:"https://i0.wp.com/short-biography.com/wp-content/uploads/john-lennon/John-Lennon.jpg?fit=3328%2C3328&ssl=1",
              
            },
            {
              id: 8,
              name:"Anjezë Gonxhe",
              lastname:"Bojaxhiu",
              age: "Died 1997 - 87 years old",
              image:"https://www.biography.com/.image/t_share/MTE1ODA0OTcxODAxNTQ0MjA1/mother-teresa-9504160-1-402.jpg",
              
            }
    ]
const createauthorstable = db.prepare(`
CREATE TABLE IF NOT EXISTS authors (
    id INTEGER NOT NULL,
    name TEXT NOT NULL,
    lastname TEXT NOT NULL,
    age INTEGER NOT NULL,
    image TEXT NOT NULL,
    PRIMARY KEY (id)
  );
`)
createauthorstable.run()


const deleteAuthors = db.prepare(`
DELETE from authors;
`)
deleteAuthors.run()

const creaateAuthors = db.prepare(`
INSERT INTO authors (name, lastname, age, image) VALUES (?,?,?,?);
`)
for (let author of authors) {
    creaateAuthors.run(author.name, author.lastname, author.age, author.image)
}
}

createquotes()
createauthors()