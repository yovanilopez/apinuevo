const express = require('express');
const app = express();
var cors = require('cors')

app.use(express.json());
app.set('port', process.env.PORT || 3000);

app.use(cors());





app.use(require('./routes/persona'));
app.use(require('./routes/curso'));
app.use(require('./routes/estudiante'));
app.use(require('./routes/docente'));
app.use(require('./routes/curso_docente'));
app.use(require('./routes/estudiante_curso'));
app.use(require('./routes/login'));


app.listen(app.get('port'), () => {
    console.log(`Server en puerto ${app.get('port')}`);
});
