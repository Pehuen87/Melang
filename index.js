var notes = [
    {
        "id": 1,
        "content": "hola soy el numero 1",
        "date": "2022-05-30",
        "important": true
    },
    {
        "id": 2,
        "content": "hola soy el numero 2",
        "date": "2022-01-20",
        "important": false
    },
    {
        "id": 3,
        "content": "hola soy el numero 3",
        "date": "2022-02-30",
        "important": true
    },
    {
        "id": 4,
        "content": "hola soy el numero 4",
        "date": "2022-03-10",
        "important": false
    }

]



const { response } = require('express')
const express = require('express')
const Product = require('./models/product')
const User = require('./models/user')
const app = express()


const usuario = new User({ name: "hola", password: "123", role: "user_role" })
const producto = new Product({ name: "producto1", desc: 'lalala' })


app.use(express.json())

app.get('/', (req, resp) => {
    resp.send('<h1>HEllo world<h1>')
})

app.get('/api/notes', (req, resp) => {
    resp.json(notes)
})

app.get('/api/users', (req, resp) => {
    resp.json(usuario)
})

app.get('/api/products', (req, resp) => {
    resp.json(producto)
})

app.get('/api/notes/:id', (req, resp) => {
    const id = Number(req.params.id)
    const note = notes.find(note => note.id === id)
    note ? resp.json(note) : resp.status(404).end()
})


app.get('/api/users/:id', (req, resp) => {
    const id = Number(req.params.id)
    const note = notes.find(note => note.id === id)
    note ? resp.json(note) : resp.status(404).end()
})


app.delete('/api/notes/:id', (req, resp) => {
    const id = Number(req.params.id)
    notes = notes.filter(note => note.id !== id)
    resp.status(204).end()
})

app.post('/api/notes', (req, resp) => {
    const note = req.body

    if (!note || !note.content) return response.status(400).json({
        error: 'note contente is missing'
    })

    console.log(note)

    const maxId = Math.max(...notes.map(note => note.id))
    const newNote = {
        id: maxId + 1,
        content: note.content,
        important: typeof note.important !== 'undefined' ? note.important : false,
        date: new Date().toISOString()
    }


    notes = [...notes, newNote]

    resp.json(newNote)
})



const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})
