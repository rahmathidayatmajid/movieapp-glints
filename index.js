const express = require('express'),
    app = express(),
    router = require('./routes/index'),
    port = process.env.PORT || 5000
cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', router)

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})