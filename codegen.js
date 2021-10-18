module.exports = {
  schema: [
    {
      [process.env.API_URL]: {
        headers: {
          'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET,
        },
      },
    },
  ],
  documents: ['./src/services/api/requests/*.graphql'],
  overwrite: true,
  generates: {
    './src/services/api/requests.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
        apolloReactHooksImportFrom: '@apollo/client',
      },
      './graphql.schema.json': {
        plugins: ['introspection'],
      },
    },
  },
};
