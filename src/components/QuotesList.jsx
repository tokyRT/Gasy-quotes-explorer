import QuoteItem from "./QuoteItem"
import useStore from "../store"
import { useEffect, useState } from "react"
import {shallow} from "zustand/shallow"

const selector = (state) => ({
    quotes: state.quotes,
    getQuotesFromGithub: state.getQuotesFromGithub,
    query: state.query,
})
export default function QuotesList() {
    const {quotes, getQuotesFromGithub, query} = useStore(selector, shallow)
    const [filteredQuotes, setFilteredQuotes] = useState([])    
    useEffect(()=>{
        getQuotesFromGithub()
    }, [])
    useEffect(() => {
        setFilteredQuotes(quotes)
    }, [quotes])
    useEffect(() => {
        // setQuotes(filteredQuotes(query))
        setFilteredQuotes(()=>{
            if(!quotes) return []
            const foo =quotes.filter(quote => quote.author.toLowerCase().includes(query.toLowerCase()))
            return foo
        })
    }, [query])
    useEffect(() => {
    }, [query])
    return (
        <div>
            {
                query.length > 0 && <h2 style={{textAlign: 'center'}}>Results for "{query}"</h2>
            }
            <div className="quotes-list">
            {filteredQuotes.map((quote, i) => (
                <QuoteItem key={i} quote={quote} />
            ))}
        </div>
        </div>
    )
}