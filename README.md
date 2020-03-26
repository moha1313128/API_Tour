# API_Tour

API With NodeJS EpressJS MongoDB

# Repo

https://github.com/jonasschmedtmann/complete-node-bootcamp

# MongoDB 
show db 
use "db name"
show collections
db.'collection name'.insertOne({})
db.'collection name'.insertMany([{}, {}, {}])

db.'collection name'.findAll({price: {$lt: 200}, {$gte: 500}, {$gt: 400}})
db.'collection name'.find({})
db.'collection name'.findOne({})

db.'collection name'.updateOne({})
db.'collection name'.updateMany({})

db.'collection name'.replaceOne({})

db.'collection name'.deleteMany({})
db.'collection name'.deleteOne({})



