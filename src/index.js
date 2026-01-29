const app = require('./app')


app.listen(app.get('port'), ()=> {
    console.log("servidor en puerto", app.get("port"))
})