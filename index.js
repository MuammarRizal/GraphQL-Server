import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { members, books } from "./_db.js";

const typeDefs = `#graphql
    type Book{
      id: ID,
      title: String,
      author:  String,
      published_at: String
      category: String
      total: Int
    }

    type Member{
      id: ID!,
      name: String!,
      univ: String
    }

    type Query{
      books :[Book]
      members : [Member!]!
      book(id: ID!) : Book
      hello: String
      greeting: String
    }
`;

const resolvers = {
  Query: {
    books: () => books,
    book: (_, args) => books.find((book) => book.id === args.id),
    members: () => members,
    hello: () => "Hello world",
    greeting: () => "Muammar Rizal",
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`Server running at port ${url}`);
