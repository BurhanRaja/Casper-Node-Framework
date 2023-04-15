const Casper = require("./server.js");

const app = new Casper();
app.serve();
const port = 8080;

let products = [
  {
    id: 1,
    name: "iPhone 5S",
    price: "$199.99",
  },
  {
    id: 2,
    name: "iPhone 6 Plus",
    price: "$399.99",
  },
];

app.listen(port, () => {
  console.log(`Listening to port ${port} at http://localhost:${port}`);
});

app.get("/test", () => {
  console.log("Hello");
  return;
});

app.get("/products", (req, res) => {
  return res.send(
    {
      message: "Hello World!",
      products,
    },
    200
  );
});

app.post("/add/product", (req, res) => {
  const { id, name, price } = req.body;

  products.push({
    id,
    name,
    price,
  });

  return res.send(
    {
      success: true,
      products,
    },
    200
  );
});

app.put("/update/product", (req, res) => {
  const { id } = req.query;
  const { name, price } = req.body;
  let filteredProducts = products.filter((el) => el.id !== Number(id));

  filteredProducts.push({
    id: Number(id),
    name,
    price,
  });

  products = filteredProducts;
  
  return res.send(
    {
      success: true,
      products,
    },
    200
  );
});
