module looseIncludes {
    export default (elements: Array<any>, queries: Array<any>, search: string) => {
        return elements.filter(element => {
            const queriesExist = queries.every(query => {
                return element[query]
            })

            return queriesExist
                ? queries.some(query => element[query].trim().toLowerCase().includes(search.trim().toLowerCase()))
                : false
        })
    }
}