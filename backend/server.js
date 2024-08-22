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
require('dotenv').config();
const cookieParser = require('cookie-parser');


const app = express();
// Middleware
app.use(cookieParser()); // Add this line
app.use(express.json());
app.use(helmet());
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
          bearerFormat: 'JWT', // Bu isteğe bağlı, ancak JSON Web Token kullanıyorsanız eklemek iyi bir fikirdir
        },
      },
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
// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
