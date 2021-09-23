const express= require('express')
    , app = express()
    , router = require('./routes/index')
    , port = 5000

app.use(express.json())

app.use('/api/v1', router)

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})