export const environment ={
    server: { port: process.env.SERVER_PORT || 3000},
    db: {url: process.env.DB_URL || "mongodb://localhost/userAPI"},
    mongoPagination: { limit: process.env.MONGO_PAGINATION  || 100}
}
