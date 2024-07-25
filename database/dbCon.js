import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

mongoose.connect('mongodb://localhost:27017/jobsearch')
        .then(()=>console.log('Database connected successfully...'))
        .catch((err)=>console.log(err))

