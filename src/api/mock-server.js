import express from "express";
import cors from "cors";

const BULLETINS = [
  {
    id: 1,
    raisonSociale: "Mamadou&Co",
  },
  { id: 2, raisonSociale: "Renaud Companie" },
  { id: 3, raisonSociale: "Kinder is not bueno" },
];

const app = express();
const port = 4000;
const router = express.Router();

app.use(cors());
app.use(router);

router.get("/api/pcs2020/bulletins", (_, response) => {
  response.status(200).json(BULLETINS);
});

app.listen(port, () => {
  console.log(`Test app listening at http://localhost:${port}`);
});
