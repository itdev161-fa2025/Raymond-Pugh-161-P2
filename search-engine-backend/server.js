const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://pughr2:K4rissah@itdev161.lrfrb.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const ItemSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const Item = mongoose.model('Item', ItemSchema);

app.post('/api/items', async (req, res) => {
  const { title, description } = req.body;
  const newItem = new Item({ title, description });
  await newItem.save();
  res.json(newItem);
});

app.get('/api/items', async (req, res) => {
  const { search } = req.query;
  const query = search ? { title: new RegExp(search, 'i') } : {};
  const items = await Item.find(query);
  res.json(items);
});

app.delete('/api/items/:id', async (req, res) => {
  const { id } = req.params;
  await Item.findByIdAndDelete(id);
  res.json({ message: 'Item deleted' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
