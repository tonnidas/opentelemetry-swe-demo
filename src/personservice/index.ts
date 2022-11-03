import "express-async-errors"; // Solve the problem of async error handling
import express from "express";
import { DataTypes, Sequelize } from "sequelize";

const dbConfig = {
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
};

const sequelize = new Sequelize(
  `postgres://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:5432/${dbConfig.database}`
);

const Person = sequelize.define("Person", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const persons = await Person.findAll();
  res.json(persons);
});

app.post("/", async (req, res) => {
  const result = await Person.create({ ...req.body });

  res.status(201).json(result);
});

app.put("/:id", async (req, res) => {
  await Person.update({ ...req.body }, { where: { id: req.params.id } });
  res.status(200).end();
});

app.delete("/:id", async (req, res) => {
  await Person.destroy({ where: { id: req.params.id } });
  res.status(204).end();
});

(async () => {
  await sequelize.sync({ force: true });
  const port = +process.env.PERSON_SERVICE_PORT! || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
})();
