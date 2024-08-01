import { app } from "./app";
import { HOST, PORT } from "./env";

app.listen(PORT, () => {
  console.log(
    `[server]: listening at http://localhost:${PORT} in ${HOST} mode`
  );
});
