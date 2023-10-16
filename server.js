const mongoose = require('mongoose');
const app = require('./app')
const {connectToMonoDB} = require('./db/connection');
const { PORT } = process.env;
mongoose.set('strictQuery', true);

const startServer = async () => {
  try {
    await connectToMonoDB();
    app.listen(PORT, () => { console.log(`Server running. Use our API on port: ${PORT}`); })
  }catch(error){
    console.log(`Error server running`);
    process.exit(1);
  }
}

startServer(); 