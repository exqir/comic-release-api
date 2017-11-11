import Publisher from './publisher'
import Comic from './comic'

const Series = `
  type Series {
    _id: ID!
    title: String!
    url: String!
    collectionsUrl: String
    issuesUrl: String
    publisher: Publisher
    collections: String
    issues: [Comic]
  }
`
export default () => [Series, Publisher, Comic]

// export default new GraphQLObjectType({
//   name: 'Series',
//   description: 'Representation of a comic series',
//   fields: {
//     _id: {
//       type: new GraphQLNonNull(GraphQLID)
//     },
//     title: { type: GraphQLString },
//     url: { type: GraphQLString },
//     collectionsUrl: { type: GraphQLString },
//     issuesUrl: { type: GraphQLString },
//     publisher: { type: PublisherType },
//     collections: { type: GraphQLString },
//     issues: { type: new GraphQLList(ComicType) }
//   }
// })