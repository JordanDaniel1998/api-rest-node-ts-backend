import colors from "colors";
import server from "./server";

const PORT = process.env.PORT || 4000;

server.listen(4000, () => {
  console.log(colors.cyan.bold(`REST API en el puerto ${PORT}`));
});
