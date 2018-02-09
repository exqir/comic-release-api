import dateformat from 'dateformat'

const search = {
  series: {
    listItem: '.news-list li h2',
    data: {
      title: 'a',
      url: { 
        selector: 'a',
        attr: 'href'
      }
    }
  }
}

const series = {
  title: '.header__title',
  collectionsUrl: {
    selector: '.section__moreLink',
    attr: 'href',
    eq: 0
  },
  issuesUrl: {
    selector: '.section__moreLink',
    attr: 'href',
    eq: 1
  }
}

const issues = {
  issues: {
    listItem: '.book',
    data: {
      title: '.book__headline a',
      url: {
        selector: '.book__headline a',
        attr: 'href'
      },
      releaseDate: {
        selector: '.book__text',
        convert: (dateString) => dateformat(dateString.split(':')[1].trim(), 'isoDate')
      }
    }
  }
}

const issue = {
  creators: {
    listItem: '.header__title + p',
    data: {
      author: {
        selector: 'a',
        eq: 0
      },
      artist: {
        selector: 'a',
        eq: 1
      }
    }
  },
  imageUrl: {
    selector: '.book-cover img.book',
    attr: 'src'
  }
}

export const image = {
  search,
  series,
  issues,
  issue
}