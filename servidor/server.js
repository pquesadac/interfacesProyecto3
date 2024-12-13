import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const datos = {
  lista: [
    {
      name: "Grupo 1",
      lastDate: "",
      values: [
        { name: "Riego patatas", state: false },
        { name: "Riego lechugas", state: true }
      ]
    },
    {
      name: "Grupo 2",
      lastDate: "",
      values: [
        { name: "Riego jardín", state: false }
      ]
    }
  ]
};

app.get('/', (req, res) => {
  res.json({ message: "Servidor de control de riego" });
});

app.get('/items', (req, res) => {
  res.json(datos.lista);
});

app.post('/items', (req, res) => {
  const newItem = req.body;
  datos.lista = newItem;
  res.status(201).json(newItem);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://192.168.1.167:${PORT}/items`);
});