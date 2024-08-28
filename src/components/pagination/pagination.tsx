type PaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (newPage: number) => void
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => (
  <div className="flex items-baseline mt-10 text-white gap-x-20">
    <button
      aria-label="select prev page"
      className={`cursor-pointer hover:text-green-400 ${
        currentPage === 1 ? 'cursor-not-allowed hover:text-gray-200' : ''
      }`}
      onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
      disabled={currentPage === 1}
    >
      Prev
    </button>

    <span className="text-xs">
      Page {currentPage} of {totalPages}
    </span>

    <button
      aria-label="select next page"
      className={`cursor-pointer hover:text-green-400 ${
        currentPage === totalPages ? 'cursor-not-allowed hover:text-gray-200' : ''
      }
      `}
      onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
      disabled={currentPage === totalPages}
    >
      Next
    </button>
  </div>
)
