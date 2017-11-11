import Series from './series'

const Creator = `
  type Creator {
    _id: ID!
    firstname: String
    lastname: String!
    series: [Series]
  }
`
export default () => [Creator, Series]

// export default new GraphQLObjectType({
//   name: 'Creator',
//   description: 'Representation of a comic creator',
//   fields: {
//     _id: {
//       type: new GraphQLNonNull(GraphQLID)
//     },
//     firstname: { type: GraphQLString },
//     lastname: { type: GraphQLDate },
//     //series: { type: new GraphQLList(SeriesType) }
//   }
// })