import express, { Express } from "express";
import { graphqlHTTP } from "express-graphql";
import api from "./api";

const app: Express = express();

const port = process.env.PORT || 3005;

app.use("/", api);

// app.use(
//   "/graphql",
//   graphqlHTTP({
//     graphiql: true,
//   })
// );

app.listen(port, () => {
  console.log(`We have a server running over here!!! ${port}`);
});
