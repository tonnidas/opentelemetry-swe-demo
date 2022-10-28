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

const Team = sequelize.define("Team", {
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
  const teams = await Team.findAll();
  res.json(teams);
});

app.post("/", async (req, res) => {
  const result = await Team.create({ ...req.body });

  res.status(201).json(result);
});

app.put("/:id", async (req, res) => {
  await Team.update({ ...req.body }, { where: { id: req.params.id } });
  res.status(200).end();
});

app.delete("/:id", async (req, res) => {
  await Team.destroy({ where: { id: req.params.id } });
  res.status(204).end();
});

(async () => {
  await sequelize.sync({ force: true });
  const port = +process.env.TEAM_SERVICE_PORT! || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
})();
