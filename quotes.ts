import express from "express"
import cors from "cors"
import { quotes, authors } from './data'

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
   
    if(typeof req.body.quote  ! =='string') {
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


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

