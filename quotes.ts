import express from "express"
import cors from "cors"
import { DataQuotes, authors } from './data'

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

app.get('/quotes', (req, res) => {
    let displayedquotes = quotes.map(quote =>{
        let author = authors.find(author => author.id === quote.authorId)
        return{...quote, author}
    })
    res.send(displayedquotes )
})
app.get('/authors', (req, res) => {
    let displayedauthors = authors.map(author =>{
        let quote = quotes.find(quote => quote.authorId === author.id)
        return{...author, quote}
    })
    res.send(displayedauthors )
})

app.get ('/quotes/:id', (req, res) => {
    const id = Number(req.params.id)
    const sameid = quotes.find(quote => quote.id ===id)
    if (sameid) {
        res.send(sameid)
    }
    else {
        res.status(404).send({ error: `Quote doesn't exist!` })
    }
}
)
app.post('/quotes', (req, res) => {
    let errors: string[] = []
    
    if (typeof req.body.authorId !== 'number') {
        errors.push('Add a proper ID!')
      }
   
    if(typeof req.body.quote  !=='string') {
        errors.push('Add a proper quote')
    }
    let author = authors.find(author => author.id=== req.body.authorId)
    if(!author) {
        errors.push(`Author with this ID ${req.body.ownerId} doesn't exist.`)
    }

    if( errors.length === 0)  {
        const newquote = {
            id: quotes[quotes.length - 1].id + 1,
            authorId:req.body.authorId,
            quote: req.body.quote
        }
    
        quotes.push(newquote)
        res.send(newquote)
    }
    else {
        res.status(400).send({ errors: errors })
      }
})
app.post('/authors', (req, res) => {
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
        const newauthor = {
            id: quotes[quotes.length - 1].id + 1,
            name:req.body.name,
            lastname: req.body.lastname,
            age: req.body.age,
            image: req.body.image
        }
    
        authors.push(newauthor)
        res.send(newauthor)
    }
    else {
        res.status(400).send({ errors: errors })
      }
})

app.delete('/quotes/:id', (req, res) => {
    const id = Number(req.params.id)
    const indextodelete = quotes.findIndex(quote => quote.id === id)
    if (indextodelete > -1 ) {
      quotes = quotes.filter( quote => quote.id !== id)
        res.send({ message: 'Quote deleted successfully.' })
    }
    else {
        res.status(404).send({ error: 'Qoute not found.' })
      }
})

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

