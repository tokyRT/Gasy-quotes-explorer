import QuoteItem from "./QuoteItem"
import useStore from "../store"
import { useEffect } from "react"

const selector = (state) => ({
    quotes: state.quotes,
    getQuotes: state.getQuotes
})
export default function QuotesList() {
    const {quotes, getQuotes} = useStore(selector)
    useEffect(() => {
        getQuotes()
    }, [])
    return (
        <div className="quotes-list">
            {quotes && quotes.map((quote, i) => (
                <QuoteItem key={i} quote={quote} />
            ))}
        </div>
    )
}