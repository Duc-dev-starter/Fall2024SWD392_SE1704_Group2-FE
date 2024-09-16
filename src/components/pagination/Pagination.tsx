import React from 'react'

const Pagination = ({ onPageChange, currentPage, blogs, pageSize }) => {
    const totalPages = Math.ceil(blogs.length / pageSize)
    console.log(totalPages)
    return (
        <div>Pagination</div>
    )
}

export default Pagination