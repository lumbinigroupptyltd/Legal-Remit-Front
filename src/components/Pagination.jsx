import React, { useState } from 'react'

function Pagination({ postsPerPage, totalPosts, paginate, paginateBack }) {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    const [page, setPage] = useState(1)


    const maxPageNumbers = 4;
    const halfMaxPageNumbers = Math.floor(maxPageNumbers / 2);

    let startPage = Math.max(page - halfMaxPageNumbers, 1);
    let endPage = Math.min(startPage + maxPageNumbers - 1, pageNumbers.length);

    if (endPage - startPage < maxPageNumbers - 1) {
        startPage = Math.max(endPage - maxPageNumbers + 1, 1);
    }

    const goNext = () => {


        if (page >= pageNumbers.length) {
            setPage(pageNumbers.length)
            paginate(pageNumbers.length);

        } else {

            paginate(page + 1)
            setPage(page + 1)
        }


    }

    const goBack = () => {

        if (page <= 1) {
            setPage(1)
            paginate(1);

        } else {

            paginate(page - 1)
            setPage(page - 1)
        }
    }

    return (
        // <nav>
        //     <ul className='pagination'>
        //         {pageNumbers.map(number => (
        //             <li key={number} className='page-item'>
        //                 <a onClick={() => paginate(number)} className='page-link'>
        //                     {number}
        //                 </a>
        //             </li>
        //         ))}
        //     </ul>
        // </nav>

        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class={`page-item ${page <= 1 ? 'disabled' : ''}`}>
                    <a class="page-link" aria-label="Previous" onClick={goBack}>
                        <span aria-hidden="true">&laquo;</span>
                        <span class="sr-only">Previous</span>
                    </a>
                </li>

                {pageNumbers.slice(startPage - 1, endPage).map(number => (
                    <li key={number} className='page-item'>
                        <a onClick={() => {
                            paginate(number)
                            setPage(number)
                        }} className='page-link'>
                            {number}
                        </a>
                    </li>
                ))}

                <li class={`page-item ${page >= pageNumbers.length ? 'disabled' : ''}`}>
                    <a class="page-link" onClick={goNext} aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                        <span class="sr-only">Next</span>
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination
