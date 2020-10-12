import 'dotenv/config'
import express from 'express';
import bodyParser from 'body-parser';
import {
   ApolloServer,
   gql,
 } from 'apollo-server-express';

import models from './models';
import schema from './schema/index';
import resolvers from './resolvers/index';


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const port = process.env.PORT || 3800;

const server = new ApolloServer({
   typeDefs: schema,
   resolvers,
 });
 
 server.applyMiddleware({ app });

app.get('*', (req, res) => res.status(200).send({
   message: 'Welcome to this Store API.'
}));

// app.get('/customers', async (req, res) => {
// try{
//    const data = await models.Customer.findAll();
//    return res.status(200).send({data})
// }catch (error){
//    return res.status(500).send(error.message)
// }
// });

app.listen(port, () => {
   console.log(`Server is running on PORT ${port}`);
});
export default app;