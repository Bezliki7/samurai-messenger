import styles from "./paginator.module.css"
import { useState } from "react"

type PaginatorProps = {
    itemsCount: number  
    pageSize: number
    page: number
    partSize?: number
    setPage: (page:number) => void
}

export const Paginator = ({ itemsCount, pageSize, page, setPage, partSize = 20 }:PaginatorProps) => {
    let totalPage = Math.ceil(itemsCount / pageSize)
    let pages = []
    for (let i = 1; i < totalPage + 1; i++) {
        pages.push(i)
    }

    let [part, setPart] = useState(Math.ceil(page / partSize))
    let totalPart = totalPage / partSize
    let partStartWith = (part - 1) * partSize
    let partEndWith = (part - 1) * partSize + partSize + 1

    return <div className={styles.pages}>
        {(part > 1) ? <button onClick={() => { setPart(part - 1) }} >prev</button> : ''}
        {pages
            .filter(p => { return (p < partEndWith) && (p > partStartWith) })
            .map(p => {
                return (
                    <span className={(p === page) ? styles.activePage : null}
                        onClick={() => setPage(p)}> {p} </span>)
            })}
        {(part < totalPart) ? <button onClick={() => { setPart(part + 1) }} >next</button> : ''}
    </div>
}