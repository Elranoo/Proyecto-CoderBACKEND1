const config = {
    PORT: process.env.PORT || 8080,
    DB_URL: process.env.DB_URL || 'mongodb://localhost:27017/ecommerce',
    JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret',
    // Add other configurations as needed
};

export default config;