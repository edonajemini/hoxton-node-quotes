import express from "express"
import cors from "cors"
import { DataQuotes, authors } from './data'
import Database from 'better-sqlite3'
const db = Database('./db/quotes.db', { verbose: console.log })


let quotes = DataQuotes

const app = express()
app.use(cors())
app.use(express.json())
const port = 4000

app.get('/', (req, res) => {
  res.send(`
  <h2>Famous Quotes!</h2>
    <p>Most Famous Quotes of All Time:</p>
      <a href="/quotes">Quotes</a>
  `)
})

//GET QUOTES
const getQuotes = db.prepare(`
SELECT * FROM quotes;
`)

app.get('/quotes', (req, res) => {
  const quotes = getQuotes.all()
  res.send(quotes)
})
//GET AUTHORS
const getAuthors = db.prepare(`
SELECT * FROM authors;
`)

app.get('/authors', (req, res) => {
    const authors = getAuthors.all()
    res.send(authors)
})
//GET QUOTES BY ID
const getQuoteById = db.prepare(`
SELECT * FROM quotes WHERE id = ?;
`)

app.get ('/quotes/:id', (req, res) => {
  const id = Number(req.params.id)
  const quote = getQuoteById.get(id)
    if (quote) {
        res.send(quote)
    }
    else {
        res.status(404).send({ error: `Quote doesn't exist!` })
    }
}
)
//GET AUTHORS BY ID
const getAuthorsById = db.prepare(`
SELECT * FROM authors WHERE id = ?;
`)

app.get ('/authors/:id', (req, res) => {
  const id = Number(req.params.id)
  const author = getAuthorsById.get(id)
    if (author) {
        res.send(author)
    }
    else {
        res.status(404).send({ error: `Author doesn't exist!` })
    }
}
)

//POST QUOTE
const postQuote = db.prepare(`
INSERT INTO quotes (quote, authorId) VALUES (?, ?);
`)
app.post('/quotes', (req, res) => {
  const quote = req.body.quote
  const authorId = req.body.authorId
    let errors: string[] = []
    
    if (typeof req.body.authorId !== 'number') {
        errors.push('Add a proper ID!')
      }
   
    if(typeof req.body.quote  !=='string') {
        errors.push('Add a proper quote')
    }

    if( errors.length === 0)  {
      const quotee = postQuote.run(quote, authorId)
      const newquotes = getQuoteById.get(quotee.lastInsertRowid)
      res.send(newquotes)
    }
    else {
        res.status(400).send({ errors: errors })
      }
})
//POST AUTHORS
//Doesnt work with images!!
app.post('/authors', (req, res) => {
  const name = req.body.name
  const lastname = req.body.lastname
  const age = req.body.age
  const image = req.body.image
  let errors: string[] = []
   
    if(typeof req.body.name !=='string') {
        errors.push('Add a proper name')
    }
    if(typeof req.body.lastname !=='string') {
        errors.push('Add a proper lastname')
    }
    if(typeof req.body.age !=='string') {
        errors.push('Add a proper age')
    }
    if(typeof req.body.image !=='string') {
        errors.push('Add a proper url')
    }
  
    if( errors.length === 0)  {
      const author = postQuote.run(name, lastname, age, image)
      const newauthor = getAuthorsById.get(author.lastInsertRowid)
      res.send(newauthor)
    }
    else {
        res.status(400).send({ errors: errors })
      }
})

//DELETE QUOTES
const deleteQuotes = db.prepare(`
DELETE FROM quotes WHERE id = ?;
`)

app.delete('/quotes/:id', (req, res) => {
  const id = Number(req.params.id)
  const quote = deleteQuotes.run(id)
    if (quote) {
        res.send({ message: 'Quote deleted successfully.' })
    }
    else {
        res.status(404).send({ error: 'Qoute not found.' })
      }
})
//PATCH QUOTES -Not done
// const updateQuote = db.prepare(`
// UPDATE people SET quote = ?, authorId = ? WHERE id = ?;
// `)
app.patch('/quotes/:id', (req, res) => {
  
    let id = Number(req.params.id)
    let match = quotes.find(quote => quote.id === id)
    if (match) {
      if (req.body.quote) {
        match.quote = req.body.quote
      }
  
      if (req.body.authorId) {
        match.authorId = req.body.authorId
      }
      res.send(match)
    } else {

      res.status(404).send({ error: 'Quote not found.' })
    }
  })
  
app.patch('/authors/:id', (req, res) => {

    let id = Number(req.params.id)
    let match = authors.find(author => author.id === id)

    if (match) {
      if (req.body.name) {
        match.name = req.body.name
      }
      if (req.body.lastname) {
        match.lastname = req.body.lastname
      }
      if (req.body.age) {
        match.age = req.body.age
      }

      if (req.body.image) {
        match.image = req.body.image
      }
  
      res.send(match)
    } else {

      res.status(404).send({ error: 'Author not found.' })
    }
  })
  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

