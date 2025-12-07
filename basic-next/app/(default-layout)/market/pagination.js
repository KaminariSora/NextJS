import Link from "next/link"

export default function Pagination({ currentPage, totalPages }) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <nav className="pagination" aria-label="Product pages">
      {currentPage > 1 && (
        <Link href={`?page=${currentPage - 1}`} className="page-btn">
          &lt;
        </Link>
      )}

      {pages.map((page) => (
        <Link
          key={page}
          href={`?page=${page}`}
          aria-current={page === currentPage ? "page" : undefined}
          className={`page-btn ${page === currentPage ? "active" : ""}`}
        >
          {page}
        </Link>
      ))}

      {currentPage < totalPages && (
        <Link href={`?page=${currentPage + 1}`} className="page-btn">
          &gt;
        </Link>
      )}
    </nav>
  )
}
