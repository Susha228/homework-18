const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs/promises');


const PORT = 3000;
const app = express();

app.use(
    cors({
        origin: '*',
        methods: 'GET, PATCH, POST, DELETE'
    })
)

app.use(express.json())

app.get('/getUsers', async (req, res) => {
    const USERS = JSON.parse(await fs.readFile('users.json', 'utf-8'))
    res.json(USERS) 
})

app.post('/addUser', async (req, res) => {
    try {
        const user = req.body
        console.log(user)
		const users = JSON.parse(await fs.readFile(path.join(__dirname, 'users.json'), 'utf-8'))
		users.push(user)
		 await fs.writeFile(path.join(__dirname, 'users.json'), JSON.stringify(users))
		res.send(`Пользователь ${user} успешно добавлен`)
	} catch (error) {
		console.log('Ошибка при добавлении пользователя', error)
		res.send('Ошибка при добавлении пользователя', error)
	}
})

app.get('/search', async (req, res) => {
    const userName = req.query.users
    const USERS = JSON.parse(await fs.readFile(path.join(__dirname, 'users.json'), 'utf-8'))
    console.log(USERS)
    const result = await USERS.filter((el) => {
        if (el.name == userName) {
            return el
        }
    })
    res.json(result)
})

app.delete('/deleteUser/:id', async (req, res) => {
    try {
        const USERS = JSON.parse(await fs.readFile(path.join(__dirname, 'users.json'), 'utf-8'))
        const id = req.params.id
        console.log(id)
        const NewUsers = USERS.filter(el => el.id != id)
        console.log(NewUsers)
        await fs.writeFile('users.json', `${JSON.stringify(NewUsers)}`)
        res.send('Успешно')
    }
    catch (error) {
        console.log('Ошибка при удалении пользователя')
        console.log(error)
    }
})

app.get('/SearchByCity/:city', async (req, res) => {
    const city = req.params.city
    const USERS = JSON.parse(await fs.readFile(path.join(__dirname, 'users.json'), 'utf-8'))
    const result = await USERS.filter((el) => {
        if (el.city == city) {
            return el
        }
    })
    console.log(result)
    res.json(result)
})

app.listen(PORT, 'localhost', err => {
    err ? console.log(err) : console.log(`server listening port ${PORT}`)
})