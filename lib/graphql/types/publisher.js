import Series from './series'

const Publisher = `
  type Publisher {
    _id: ID!
    name: String!
    displayName: String
    iconUrl: String
    url: String
    baseUrl: String
    searchPath: String
    searchSeriesPath: String
    seriesPath: String
    series: [Series]
  }
`
export default () => [Publisher, Series]

// export default new GraphQLObjectType({
//   name: 'Publisher',
//   description: 'Representation of a publisher',
//   fields: {
//     _id: {
//       type: new GraphQLNonNull(GraphQLID)
//     },
//     name: { type: GraphQLString },
//     displayName: { type: GraphQLString },
//     iconUrl: { type: GraphQLString },
//     url: { type: GraphQLString },
//     baseUrl: { type: GraphQLString },
//     searchPath: { type: GraphQLString },
//     searchSeriesPath: { type: GraphQLString },
//     seriesPath: { type: GraphQLString },
//     //series: { type: new GraphQLList(SeriesType) }
//   }
// })