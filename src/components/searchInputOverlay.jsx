import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React from "react";

const SearchInputOverlay = React.memo(
  ({ searchQuery, onSearchChange, onSearchFocus, placeholder }) => (
    <div className="relative group w-full">
      {/* Full Search Input - Only visible on xl screens and larger */}
      <div className="relative hidden 2xl:block">
        <input
          type="text"
          value={searchQuery}
          onChange={onSearchChange}
          onFocus={onSearchFocus}
          placeholder={placeholder}
          className="w-full ps-12 pe-16 py-3 rounded-full bg-background/50 backdrop-blur-sm border border-border outline-none focus:border-[var(--primary-color)] focus:shadow-lg focus:shadow-[var(--primary-color)]/10 text-sm transition-all duration-300 hover:border-[var(--primary-color)]/50 cursor-pointer"
          readOnly
        />
        <button
          onClick={onSearchFocus}
          className="absolute start-4 top-1/2 transform -translate-y-1/2 text-foreground group-focus-within:text-[var(--primary-color)] transition-all duration-300 hover:text-[var(--primary-color)] p-1 rounded-full hover:bg-[var(--primary-color)]/10 cursor-pointer"
        >
          <MagnifyingGlassIcon className="w-5 h-5" />
        </button>
        <div className="absolute end-4 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <kbd className="px-2 py-1 rounded text-xs bg-[var(--card)]/50">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Search Icon Only - Visible on screens smaller than xl */}
      <button
        onClick={onSearchFocus}
        className="2xl:hidden p-2 rounded-xl hover:bg-[var(--card)]/5 transition-colors cursor-pointer"
        aria-label="Search"
      >
        <MagnifyingGlassIcon className="w-5 h-5 text-foreground hover:text-[var(--primary-color)] transition-colors duration-300" />
      </button>
    </div>
  )
);

export default SearchInputOverlay;
