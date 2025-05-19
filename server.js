import express from 'express'

const app = express()
const port = 3000

app.use(express.json())

// "Banco de dados" em memória
const users = [
    { id: 1, name: 'Eduarda' },
    { id: 2, name: 'Jorge' },
    { id: 3, name: 'Carlos' }
]

// GET - Listar todos os usuários
app.get('/users', (req, res) => {
    res.json(users)
})

// GET - Obter um usuário específico por ID
app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id)
    const user = users.find(user => user.id === userId)

    if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' })
    }

    res.json(user)
})


// POST - Criar um novo usuário
app.post('/users', (req, res) => {
    const { name } = req.body
    if (!name) {
        return res.status(400).json({ message: 'Nome é obrigatório' })
    }

    const newId = users.length ? users[users.length - 1].id + 1 : 1
    const newUser = { id: newId, name }
    users.push(newUser)

    res.status(201).json({
        message: 'Usuário criado com sucesso!',
        user: newUser
    })
})

// PUT - Atualizar um usuário existente
app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id)
    const userIndex = users.findIndex(user => user.id === userId)

    if (userIndex === -1) {
        return res.status(404).json({ message: 'Usuário não encontrado' })
    }

    const updatedData = req.body
    
    users[userIndex] = { 
        ...users[userIndex], 
        ...updatedData }

    res.json({
        message: 'Usuário atualizado com sucesso!',
        user: users[userIndex]
    })
})

// DELETE - Remover um usuário
app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id)
    const userIndex = users.findIndex(user => user.id === userId)

    if (userIndex === -1) {
        return res.status(404).json({ message: 'Usuário não encontrado' })
    }

    const deletedUser = users.splice(userIndex, 1)[0]
    
    res.json({ 
        message: 'Usuário removido com sucesso', 
        user: deletedUser })
})

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}/users`)
})
