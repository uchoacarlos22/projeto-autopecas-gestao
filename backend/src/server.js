const app = require('./app');

const PORT = process.env.PORT || 3333;
app.set('port', PORT);

app.listen(PORT, function () {
    console.log(`Servidor rodando na URL: http://localhost:${PORT}`);
});