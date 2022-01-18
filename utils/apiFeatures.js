// TODO Refactoring
class APIFeatures {
  constructor(query, queryString, parse = false) {
    this.query = query;
    this.queryString = queryString;
    this.parse = parse;
  }
  filter() {
    // 1. Filtering
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];

    excludedFields.forEach((el) => delete queryObj[el]);

    // 2. Advanced filtering
    // { duration: { gte: '5' }, difficulty: 'easy' }
    // gte, gt, lte, lt
    // using regular expression

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    console.log('parse', JSON.parse(queryStr));
    console.log('queryObj', queryObj);
    console.log('parse', this.parse);
    // update query

    this.query = this.query.find(this.parse ? queryObj : JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      // mặc định tăng dần
      // set + - tăng/giảm dần
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
      console.log(sortBy);
      // sort('price ratingsAverange ')
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    // 3. Fields limiting
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = limit * (page - 1);
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

// exports.aliasTopTours = async (req, res, next) => {
//   req.query.limit = '5';
//   req.query.sort = '-ratingAverage,price';
//   req.query.fields = 'name,price,ratingAverage,summary,dificulty';
//   next();
// };

module.exports = APIFeatures;
