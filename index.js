console.log('Server Init');

require('dotenv').config();
const express = require('express');
const inquirer = require('inquirer');
const bcrypt = require('bcrypt');
const app = express();

const User = require('./models/user');
const Product = require('./models/product');

app.use(express.json());

// Mock data
const notes = [
  {
    id: 1,
    content: 'hola soy el numero 1',
    date: '2022-05-30',
    important: true
  },
  // ...
];

const usuario = new User({ name: 'hola', password: '123', role: 'user_role' });
const producto = new Product({ name: 'producto1', desc: 'lalala' });
// End of mock data

const promptSettings = () => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'port',
        message: 'Choose the port number:',
        choices: [8080, 2020, 3015, 7578, process.env.PORT || 3000],
        default: process.env.PORT || 3000
      },
      {
        type: 'list',
        name: 'time',
        message: 'Choose a number:',
        choices: [1, 2, 3, 4, 5],
        default: 2
      },
      {
        type: 'input',
        name: 'name',
        message: 'Enter a name:',
        default: ''
      }
    ])
    .then((answers) => {
      startServer(answers.port);
      console.log(answers.time);
      console.log(answers.name);
    });
};

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

app.get('/api/users', (req, res) => {
  res.json(usuario);
});

app.get('/api/products', (req, res) => {
  res.json(producto);
});

app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((note) => note.id === id);
  note ? res.json(note) : res.status(404).end();
});

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  const updatedNotes = notes.filter((note) => note.id !== id);
  if (updatedNotes.length === notes.length) {
    res.status(404).json({ error: 'Note not found' });
  } else {
    notes = updatedNotes;
    res.status(204).end();
  }
});

app.post('/api/notes', (req, res) => {
  const note = req.body;

  if (!note || !note.content) {
    return res.status(400).json({
      error: 'Note content is missing'
    });
  }

  const maxId = Math.max(...notes.map((note) => note.id));
  const newNote = {
    id: maxId + 1,
    content: note.content,
    important: typeof note.important !== 'undefined' ? note.important : false,
    date: new Date().toISOString()
  };

  notes = [...notes, newNote];

  res.json(newNote);
});

app.post('/api/users', async (req, res) => {
  const { name, password} = req.body;

  if (!name || !password) {
    return res.status(400).json({
      error: 'Name or password is missing'
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    let newUser = new User({ name, password: hashedPassword});

    // Save the user to the database or perform any necessary actions
    // ...
    console.log(newUser)
    

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

const startServer = (port) => {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
};

// Start the app by prompting for settings
promptSettings();