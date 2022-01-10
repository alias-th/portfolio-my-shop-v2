class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // Build query
    const { page, sort, limit, fields, search, ...queryObj } = this.queryString;

    // 1) Advance filtering
    let queryStr = JSON.stringify(queryObj);

    // return $gte ...
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // parse string to object
    // { duration: { '$gte': '5' }, difficulty: 'easy' }
    this.query = this.query.find(JSON.parse(queryStr));

    // return entire obj
    return this;
  }

  search() {
    if (this.queryString.search) {
      const textSearch = this.queryString.search;
      if (textSearch !== "") {
        this.query = this.query.find({
          $text: { $search: `${textSearch}` },
        });
      }
    }

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      // ['price','ratingAverage']
      const sortBy = this.queryString.sort.split(",").join(" ");

      // sort('price ratingsAverage')
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fieldLimit = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fieldLimit);
    } else {
      // exclude -__v
      this.query = this.query.select("-__v");
    }

    return this;
  }

  paginate() {
    const numPage = this.queryString.page * 1 || 1;
    const numLimit = this.queryString.limit * 1 || 5;
    const skip = (numPage - 1) * numLimit;
    // page=1&limit=10, 1-10 page 1
    this.query = this.query.skip(skip).limit(numLimit);

    return this;
  }
}

module.exports = APIFeatures;
