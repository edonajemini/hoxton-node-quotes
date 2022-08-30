import express from "express"
const app = express()
const port = 4000
 
const quotes = [
    {
        id:1,
        author:"Nelson Mandela",
        quote:"The greatest glory in living lies not in never falling, but in rising every time we fall."
    },
    {
        id:2,
        author:"Walt Disney",
        quote:"The way to get started is to quit talking and begin doing."
    },
    {
        id:3,
        author:"Steve Jobs",
        quote:`Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma – which is living with the results of other people's thinking.`
    },
    {
        id:4,
        author:"Eleanor Roosevelt",
        quote:"If life were predictable it would cease to be life, and be without flavor."
    },
    {
        id:5,
        author:"Oprah Winfrey",
        quote:"If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough."
    },
    {
        id:6,
        author:"James Cameron",
        quote:"If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success."
    },
    {
        id:7,
        author:"John Lennon",
        quote:"Life is what happens when you're busy making other plans."
    },
    {
        id:8,
        author:"Mother Teresa",
        quote:"Spread love everywhere you go. Let no one ever come to you without leaving happier. "
    }
]

app.get('/', (req, res) => {
  res.send("Famous quotes")
})
app.get('/quotes', (req, res) => {
    res.send(quotes)
  })
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})