// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const recipeRoutes = require('./routes/recipe-routes');
const authRoutes = require('./routes/auth-routes');
const mailRoutes = require('./routes/mail-routes');
const reviewRoutes = require('./routes/review-routes');
const storageRoutes = require('./routes/storage-routes');
const recommendRoutes = require('./routes/recommend-routes');
const followerRoutes = require('./routes/follower-routes');
const postRoutes = require('./routes/post-routes');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');

const app = express();

// Middleware
app.use(cookieParser()); // Add this line
app.use(express.json());
app.use(helmet());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 100, // Bu zaman aralığında maksimum 100 istek
  message: "Çok fazla istek yolladınız. Lütfen daha sonra tekrar deneyin.",
  headers: true, // Rate limit bilgilerini header'larda göstermek için
});
app.use(limiter);

const corsOptions = {
  origin: 'http://localhost:3000', // Frontend uygulamanızın URL'si
  credentials: true, // Cookie ve diğer kimlik bilgilerini desteklemek için
};

app.use(cors(corsOptions));
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API Information',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        ErrorResponse: {
          type: 'object',
          properties: {
            msg: {
              type: 'string',
              example: 'Error message'
            },
            error: {
              type: 'string',
              example: 'Detailed error message'
            }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'], // Yolları kontrol edin
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// Routes
app.use('/api/users', authRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/mails', mailRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/storage', storageRoutes);
app.use('/api/recommend', recommendRoutes);
app.use('/api/follower', followerRoutes);
app.use('/api/post', postRoutes);
// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
