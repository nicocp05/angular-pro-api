import mongoose from 'mongoose';

export const dbConnection = async () => {

    const user = process.env.DB_USER;
    const password = process.env.DB_PASSWORD;
    const databaseName = process.env.DB_DATABASE;

    try {
        
        await mongoose.connect(`mongodb+srv://${user}:${password}@cluster0.dzp1j.mongodb.net/${databaseName}`);

        console.log('Database is connected');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error whit DB')
    }


}