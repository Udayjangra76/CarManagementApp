import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import authRoutes from './routes/authRoutes.js';
import carRoutes from './routes/carRoutes.js';
import cors from 'cors'
import connectDB from './configs/db.js';
import swaggerDocs from './configs/swagger.js';
const CSS_URL =
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

dotenv.config();

const app = express();

app.use(cors({
    origin: 'https://car-management-app-2zx1.vercel.app', // Allow requests from this origin
    methods: 'GET,POST,PUT,DELETE', // Specify allowed HTTP methods
    credentials: true, // Allow cookies if needed
}));
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocs, { customCssUrl: CSS_URL })
);
connectDB();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send("Hello");
})
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});