import PullList from '../models/PullList'
import Publisher from '../models/Publisher'
import Series from '../models/Series'

export default {
  RootQuery: {
    pulllists: async (root, data) => await PullList.find().exec(),
    pulllist: async (root, owner) => await PullList.findOne({owner: owner}).exec(),
    publishers: async (root, data) => await Publisher.find().exec(),
  },
  Publisher: {
    series: async (publisher) => await Series.find({publisher: publisher}).exec(),
  },
}