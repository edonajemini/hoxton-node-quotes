import express from "express"
import cors from "cors"
const quotes = [
    {
        id:1,
        name:"Nelson",
        lastname:"Mandela",
        age: "Died 2013 - 95 years old",
        Image:"https://www.biography.com/.image/t_share/MTY2MzU2NjgxMDUwMDM5OTk5/_photo-by-per-anders-petterssongetty-images.jpg",
        quote:"The greatest glory in living lies not in never falling, but in rising every time we fall."
    },
    {
        id:2,
        name:"Walt",
        lastname:"Disney",
        age: "Died 1966 - 65 years old",
        Image:"https://d3i6fh83elv35t.cloudfront.net/static/2018/12/GettyImages-164230988-1024x723.jpg",
        quote:"The way to get started is to quit talking and begin doing."
    },
    {
        id:3,
        name:"Steve",
        lastname:"Jobs",
        age: "Died 2011 - 56 years old",
        Image:"https://upload.wikimedia.org/wikipedia/commons/d/dc/Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg",
        quote:`Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma – which is living with the results of other people's thinking.`
    },
    {
        id:4,
        name:"Eleanor",
        lastname:"Roosevelt",
        age: "Died 1962 - 78 years old",
        Image:"https://www.biography.com/.image/t_share/MTgwMjA0MzI0Mjg1MDY0NTM2/gettyimages-515252110.jpg",
        quote:"If life were predictable it would cease to be life, and be without flavor."
    },
    {
        id:5,
        name:"Oprah",
        lastname:"Winfrey",
        age: "68 years old",
        Image:"https://gossipgist.com/uploads/847/oprah-winfrey.png",
        quote:"If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough."
    },
    {
        id:6,
        name:"James",
        lastname:"Cameron",
        age: "68 years old",
        Image:"https://upload.wikimedia.org/wikipedia/commons/f/fe/James_Cameron_by_Gage_Skidmore.jpg",
        quote:"If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success."
    },
    {
        id:7,
        name:"John",
        lastname:"Lennon",
        age: "Died 1980 - 40 years old",
        Image:"https://i0.wp.com/short-biography.com/wp-content/uploads/john-lennon/John-Lennon.jpg?fit=3328%2C3328&ssl=1",
        quote:"Life is what happens when you're busy making other plans."
    },
    {
        id:8,
        name:"Anjezë Gonxhe",
        lastname:"Bojaxhiu",
        age: "Died 1997 - 87 years old",
        Image:"https://www.biography.com/.image/t_share/MTE1ODA0OTcxODAxNTQ0MjA1/mother-teresa-9504160-1-402.jpg",
        quote:"Spread love everywhere you go. Let no one ever come to you without leaving happier. "
    }
]
const app = express()
app.use(cors())
const port = 4000


app.get('/', (req, res) => {
  res.send(`
  <h2>Famous Quotes!</h2>
    <p>Most Famous Quotes of All Time:</p>
      <a href="/quotes">Quotes</a>
  `)
})

app.get('/quotes', (req, res) => {
    res.send(quotes)
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
    if (typeof req.body.name !== 'string') {
        errors.push('Add a proper name!')
      }
    if (typeof req.body.lastname !== 'string') {
        errors.push('Add a proper lastname!')
    }
    if (typeof req.body.age ! == 'string' ){
        errors.push('Add a proper age!')
    }
    if (typeof req.body.Image ! == 'string' ){
        errors.push('Add a proper image!')
    }
    if(typeof req.body.quote  ! =='string') {
        errors.push('Add a proper quote')
    }
    if( errors.length === 0)  {
        const newquote = {
            id: quotes[quotes.length - 1].id + 1,
            name:req.body.name,
            lastname: req.body.lastname,
            age: req.body.age,
            Image: req.body.Image,
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

