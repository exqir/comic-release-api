import Series from './series'

const PullList = `
  type PullList {
    _id: ID!
    owner: String!
    list: [Series]
  }
`
export default () => [PullList, Series] 

// export default new GraphQLObjectType({
//   name: 'Pull List',
//   description: 'Representation of a users pull list',
//   fields: {
//     _id: {
//       type: new GraphQLNonNull(GraphQLID)
//     },
//     owner: { type: GraphQLString },
//     list: { type: new GraphQLList(SeriesType) }
//   }
// })