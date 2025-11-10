const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // <--- 1. IMPORTAR O BCRYPT

// Define o schema do usuário
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true } // A senha hasheada será salva aqui
}, {
    timestamps: true
});

// Cria o modelo (ou reutiliza se já existir)
const User = mongoose.models.User || mongoose.model('User', UserSchema);

// Variável para armazenar a conexão
let cachedConnection = null;

// Função para conectar ao MongoDB (removendo opções depreciadas)
async function connectToDatabase() {
    if (cachedConnection) {
        return cachedConnection;
    }
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    cachedConnection = connection;
    return connection;
}

// Handler da função serverless
module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método não permitido. Use POST.' });
    }
    
    try {
        await connectToDatabase();
        
        const { name, email, password } = req.body;
        
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios!' });
        }
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Este email já está cadastrado!' });
        }
        
        // --- 2. CRIPTOGRAFAR A SENHA ---
        const hashedPassword = await bcrypt.hash(password, 10); // 10 é o "custo" do hash
        
        // Cria o novo usuário com a senha hasheada
        const newUser = new User({
            name,
            email,
            password: hashedPassword // <--- 3. SALVAR A SENHA HASHED
        });
        
        await newUser.save();
        
        return res.status(201).json({ 
            message: 'Usuário criado com sucesso!',
            user: { id: newUser._id, name: newUser.name, email: newUser.email }
        });
        
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        return res.status(500).json({ error: 'Erro interno do servidor!' });
    }
};