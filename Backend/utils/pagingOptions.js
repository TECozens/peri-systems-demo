const pagingOptions = (page, pageSize) => {
    return {
        skip: (page - 1) * pageSize,
        limit: pageSize * 1
    }
}

const getMaxPages = async (mongooseObject, query, pageSize) => {
    let maxPages = 0

    await mongooseObject.countDocuments(query, ((err, count) => {
            console.log("Will it execute?", "Count:" , count, "pageS:", pageSize )
            maxPages = Math.ceil(count / pageSize)
            return true
        }
    ))

    return maxPages
}


module.exports = {
    pagingOptions,
    getMaxPages
}