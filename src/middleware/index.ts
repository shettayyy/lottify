import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginCacheControl } from '@apollo/server/plugin/cacheControl';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import { Application, json, urlencoded } from 'express';
import helmet from 'helmet';
import { Server } from 'http';

import { env } from '@/config/env-config';

export default async function initializeMiddlewares(app: Application, httpServer: Server) {
  // Set the application to trust the reverse proxy
  app.set('trust proxy', true);

  // General middlewares
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(
    helmet({
      crossOriginEmbedderPolicy: env.isProduction,
      contentSecurityPolicy: env.isProduction ? undefined : false,
    }),
  );
  app.use(
    cors({
      origin: env.CORS_ORIGIN,
    }),
  );

  ////////////////////////////////////////
  // Apollo Server
  ////////////////////////////////////////
  const server = new ApolloServer({
    typeDefs: `#graphql
    type Query {
      hello: String
    }
  `,
    resolvers: {
      Query: {
        hello: () => 'Hello World!',
      },
    },
    csrfPrevention: true,
    // https://www.apollographql.com/docs/apollo-server/migration#appropriate-400-status-codes
    status400ForVariableCoercionErrors: true,
    plugins: [
      // For shutting down the HTTP server gracefully
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginCacheControl({
        // Cache everything for 1 second by default.
        defaultMaxAge: 1,
      }),
    ],
  });

  try {
    await server.start();
  } catch (error) {
    console.error('Error starting Apollo Server', error);
  }

  app.use('/graphql', expressMiddleware(server));
}