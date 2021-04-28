const configMap = {
    local: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        mongoConnectionString: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.axpt7.mongodb.net/${process.env.DB_NAME}`,
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        mongoConnectionString: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.axpt7.mongodb.net/${process.env.DB_NAME}`,
    },
};

export const mongodbConfig = () => {
    return configMap[process.env.NODE_ENV];
};
