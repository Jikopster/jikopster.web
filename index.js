var express = require('express')
var app = express()

app.set('port', (process.env.PORT || 5000))
app.set('views', 'view')
app.set('view engine', 'jade')

app.use(express.static('./public'))
app.use(require('body-parser').urlencoded({extended: false}))
app.use(require('cookie-parser')())
app.use(require('./i18n/init.js'))

app.get('/', require('./controller/index.js'))

app.listen(app.get('port'), function () {
    console.log('Jikopster vk a sync website is running on port', app.get('port'));
})
