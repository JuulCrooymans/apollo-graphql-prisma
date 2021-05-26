# Apollo-graphql-prisma

## How to run?

Run postgresql

```
docker-compose up
```

Start server on http://localhost:4000/:

```
yarn start
```

## Generate graphql types

```
yarn generate
```

For development:

```
yarn generate:watch
```

## TODO

- [x] Add watch to graphql codegen.
- [ ] add sessions middleware and table.
- [ ] Implement merge for graphql schemas.
- [ ] Setup Nginx reverse proxy in docker-compose.yml (with local https).
- [ ] Add seed data.
- [ ] Setup jest.
