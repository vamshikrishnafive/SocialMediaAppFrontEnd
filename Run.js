const Express = require('express');
const Compression =  require('compression');
const path = require('path0')

const app = Express();
app.use(Compression())
app.use(Express.static(path.join(__dirname, "build")));

app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"))
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log(`App is runnig on port http://localhost:${PORT}`))