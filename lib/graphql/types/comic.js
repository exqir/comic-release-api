// import CreatorType from './creator'
import Creator from './creator' 
import Publisher from './publisher'
import Series from './series'

const Comic = `
  type Comic {
    _id: ID!
    title: String!
    issue: String
    releaseDate: String
    creators: [Creator]
    series: Series
    publisher: Publisher
    imageUrl: String
    imageColor: String
    url: String!
  }
`
export default () => [Comic, Creator, Publisher, Series]

 // export default new GraphQLObjectType({
//   name: 'Comic',
//   description: 'Representation of a comic book',
//   fields: {
//     _id: {
//       type: new GraphQLNonNull(GraphQLID)
//     },
//     title: { type: GraphQLString },
//     issue: { type: GraphQLString },
//     releaseDate: { type: GraphQLDate },
//     //creators: { type: new GraphQLList(CreatorType) },
//     //series: { type: SeriesType },
//     //publisher: { type: PublisherType },
//     imageUrl: { type: GraphQLString },
//     imageColor: { type: GraphQLString },
//     url: { type: GraphQLString }
//   }
// })