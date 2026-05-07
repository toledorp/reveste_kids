import mongoose from 'mongoose';

// Usuário CORRETO: rogeriopupotoledo_db_user
const uri = 'mongodb+srv://rogepupotoledo_db_user:StarWars2026@cluster0.yxn8mln.mongodb.net/starwars?retryWrites=true&w=majority';

console.log('🚀 TESTANDO COM USUÁRIO CORRETO');
console.log('👤 Usuário: rogepupotoledo_db_user');
console.log('=' .repeat(50));

try {
    await mongoose.connect(uri);
    console.log('✅ CONECTADO COM SUCESSO! 🎉');
    console.log(`📊 Banco: ${mongoose.connection.name}`);
    console.log(`🌍 Host: ${mongoose.connection.host}`);
    await mongoose.disconnect();
    console.log('✨ CONEXÃO ESTABELECIDA! ✨');
} catch (error) {
    console.error('❌ Erro:', error.message);
}