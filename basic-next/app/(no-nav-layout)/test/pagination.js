// app/pagination/pagination.js
import Link from "next/link"
import "./test.css"

export default function Pagination({ currentPage, totalPages }) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <nav className="pagination" aria-label="Product pages">
      {currentPage > 1 && (
        <Link href={`?page=${currentPage - 1}`} className="page-link">
          Prev
        </Link>
      )}

      {pages.map((page) => (
        <Link
          key={page}
          href={`?page=${page}`}
          aria-current={page === currentPage ? "page" : undefined}
          className={`page-link ${page === currentPage ? "active-page" : ""}`}
        >
          {page}
        </Link>
      ))}

      {currentPage < totalPages && (
        <Link href={`?page=${currentPage + 1}`} className="page-link">
          Next
        </Link>
      )}
    </nav>
  )
}
