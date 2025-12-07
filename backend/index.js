import express from "express";
import path from "path";
import cors from "cors"; 
import { Config } from "./src/config/index.js";
import { GeneroAPI } from "./src/genero/index.js";
import { DirectorAPI } from "./src/director/index.js";
import { ProductoraAPI } from "./src/productora/index.js";
import { TipoAPI } from "./src/tipo/index.js";
import { MediaAPI } from "./src/mediaps/index.js";
import debugLib from "debug";

const debug = debugLib("app:server");
const app = express();

app.use(cors());     
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

GeneroAPI(app);
DirectorAPI(app);
ProductoraAPI(app);
TipoAPI(app);
MediaAPI(app);

app.get("/", (req, res) => {
  res.json({ message: "API Películas funcionando" });
});

app.listen(Config.port, () => {
  debug(`Servidor escuchando en el puerto ${Config.port}`);
});
