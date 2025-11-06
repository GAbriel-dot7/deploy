const mongoose = require('mongoose');

// Define o schema do usuário
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// Cria o modelo (ou reutiliza se já existir)
const User = mongoose.models.User || mongoose.model('User', UserSchema);

// Variável para armazenar a conexão
let cachedConnection = null;

// Função para conectar ao MongoDB
async function connectToDatabase() {
    if (cachedConnection) {
        return cachedConnection;
    }
    
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    
    cachedConnection = connection;
    return connection;
}

// Handler da função serverless
module.exports = async (req, res) => {
    // Habilita CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Responde a requisições OPTIONS (preflight)
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    // Verifica se o método é POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método não permitido. Use POST.' });
    }
    
    try {
        // Conecta ao banco de dados
        await connectToDatabase();
        
        // Pega os dados do body
        const { name, email, password } = req.body;
        
        // Validação básica
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios!' });
        }
        
        // Verifica se o email já existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Este email já está cadastrado!' });
        }
        
        // Cria o novo usuário
        const newUser = new User({
            name,
            email,
            password
        });
        
        // Salva no banco de dados
        await newUser.save();
        
        // Responde com sucesso
        return res.status(201).json({ 
            message: 'Usuário criado com sucesso!',
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });
        
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        return res.status(500).json({ 
            error: 'Erro interno do servidor ao criar usuário!' 
        });
    }
};
