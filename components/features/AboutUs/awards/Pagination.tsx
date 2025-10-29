import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <ul className="flex items-center justify-center gap-2">
      <li>
        <button onClick={() => onPageChange(1)} disabled={currentPage === 1} className="pagination-btn">
          <ChevronsLeft size={16} />
        </button>
      </li>
      <li>
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="pagination-btn">
          <ChevronLeft size={16} />
        </button>
      </li>
      <li>
        <button className="pagination-btn active">
          {currentPage}
        </button>
      </li>
      <li>
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="pagination-btn">
          <ChevronRight size={16} />
        </button>
      </li>
      <li>
        <button onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages} className="pagination-btn">
          <ChevronsRight size={16} />
        </button>
      </li>
    </ul>
  );
};