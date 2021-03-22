class ApiFeatures {
  constructor(query, queryStr) {
    (this.query = query), (this.queryStr = queryStr);
  }

  search() {
    const title = this.queryStr.title
      ? {
          title: {
            $regex: this.queryStr.title,
            $options: "i",
          },
        }
      : {};

    const category =
      this.queryStr.category !== ""
        ? {
            category: this.queryStr.category,
          }
        : null;

    this.query = this.query.find(
      { ...title, ...category },
      "title object author category createdAt like likeNb"
    );
    return this;
  }

  pagination(resPerPage) {
    const currentPage = parseInt(this.queryStr.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
  }
}

module.exports = ApiFeatures;
