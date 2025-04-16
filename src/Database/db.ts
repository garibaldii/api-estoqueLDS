import mongoose from 'mongoose';

const conectaBancoDados = () => {
    console.log('Conectando com o banco de dados... ⌛');

    const uri = process.env.MONGODB_URI;
    
    if (!uri) {
        console.error('A variável de ambiente MONGODB_URI não está definida.');
        return;
    }

    mongoose.connect(uri)
        .then(() => console.log('MongoDB Atlas Conectado com sucesso! ✅'))
        .catch((error) => console.log('Erro ao conectar ao MongoDB:', error));
};

export default conectaBancoDados;