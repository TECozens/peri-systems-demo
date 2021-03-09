const pagingOptions = (page, pageSize) => {
    return {
        skip: (page - 1) * pageSize,
        limit: pageSize * 1
    }
}

const getMaxPages = async (mongooseObject, query, pageSize) => {
    let maxPages = 0

    await mongooseObject.countDocuments(query, ((err, count) => {
            maxPages = Math.ceil(count / pageSize)
        }
    ))

    return maxPages
}


module.exports = {
    pagingOptions,
    getMaxPages
}