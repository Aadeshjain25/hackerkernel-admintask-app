const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')
const knex = require('./db')

const userRoutes = require('./routes/userRoutes')
const taskRoutes = require('./routes/taskRoutes')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.engine('hbs', exphbs.engine({ extname: 'hbs' }))
app.set('view engine', 'hbs')

app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

app.get('/', (req, res) => res.redirect('/users'))

app.listen(3000, () => {
    console.log("Server running on port 3000")
})