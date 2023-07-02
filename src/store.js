import {create} from "zustand"

const quoteUrl = "https://raw.githubusercontent.com/rasolofonirina/quotes-gasy/main/quotes.json"
const useStore = create((set, get) => {

    return {
        quotes: null,
        getQuotes: async () => {
            const res = await fetch(quoteUrl)
            const data = await res.json()
            let quotes = []
            data.forEach(author => {
                quotes.push(...author.quotes.map(quote => {
                    return {
                        quote: quote,
                        author: author.name
                    }
                }))
            });
            set({quotes: quotes})
        }
    }
})

export default useStore