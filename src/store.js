import { create } from "zustand"
import levenshteinDistance from "./utils/levenshtein"

const quoteUrl = "https://raw.githubusercontent.com/rasolofonirina/quotes-gasy/main/quotes.json"
const computeSimilarity = (toCompare, authors) => {
    let similarity = authors.map(author => {
        return {
            author: author,
            score: levenshteinDistance(toCompare, author)
        }
    })
    return similarity.sort((a, b) => a.score - b.score)
}
const startWith = (toCompare, authors) => {
    return authors.filter(author => author.startsWith(toCompare))
}
const useStore = create((set, get) => {
    const history = localStorage.getItem("history")
    return {
        quotes: null,
        getQuotesFromGithub: async () => {
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
            set({ quotes: quotes })
        },
        query: "",
        setQuery: (query) => {
            set({ query: query })
        },
        filteredQuotes: () => {
            if (!get().quotes) {
                return []
            }
            if(get().query === "") {
                return get().quotes
            }
            const quotes = get().quotes.filter(quote => quote.author.toLowerCase().includes(get().query.toLowerCase()))
            return quotes
        },
        history: history ? JSON.parse(history) : [],
        addToHistory: (author) => {
            //if the author is already in the history, remove it and add it again so it will be the most recent
            const trimedAuthor = author.trim()
            if (get().history.includes(trimedAuthor)) {
                set({
                    history: [...get().history.filter(item => item !== trimedAuthor), trimedAuthor]
                })
            }
            else {
                set({
                    history: [...get().history, trimedAuthor]
                })
            }
            localStorage.setItem("history", JSON.stringify(get().history))
        },
        matchedHistory: (author) => {
            const authorsStartWith = startWith(author, get().history)
            const foo = computeSimilarity(author, get().history.filter(item => {
                if (authorsStartWith.includes(item)) {
                    return false
                }
                return true
            })).filter(item=>item.score < 6)
            const matched = {
                authorsStartWith: authorsStartWith ? authorsStartWith : [],
                similars: foo? foo.map(item => item.author) : []
            }
            return matched;
            // return [...authorsStartWith, ...foo.map(item => item.author)]
        }
    }
})

export default useStore