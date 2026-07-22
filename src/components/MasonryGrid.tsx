"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

export interface MasonryItem {
  id: string | number;
  imageUrl: string;
  title: string;
}

interface GridItemProps {
  item: MasonryItem;
}

interface MasonryGridProps {
  items: MasonryItem[];
}

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-[#FDF4F5] group-hover:text-pink-500 transition-colors">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

const ExpandIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-[#FDF4F5] group-hover:text-cyan-400 transition-colors">
    <polyline points="15 3 21 3 21 9" />
    <polyline points="9 21 3 21 3 15" />
    <line x1="21" y1="3" x2="14" y2="10" />
    <line x1="3" y1="21" x2="10" y2="14" />
  </svg>
);


const GridItem: React.FC<GridItemProps & { onExpand: (item: MasonryItem) => void }> = ({ item, onExpand }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="mb-6 break-inside-avoid relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
      onClick={() => onExpand(item)}
    >
      <img
        src={item.imageUrl}
        alt={item.title}
        className="w-full h-auto rounded-xl shadow-lg border border-[#BA90C6]"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = `https://placehold.co/400x300/fecaca/333333?text=Image+Not+Found`;
        }}
      />
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#BA90C6]/30 rounded-xl flex items-center justify-center animate-fade-in"
          >
            <motion.div whileHover={{ scale: 1.1 }} className="p-3 bg-[#BA90C6]/50 rounded-full backdrop-blur-md">
              <ExpandIcon />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function MasonryGrid({ items }: MasonryGridProps) {
  const [expandedItem, setExpandedItem] = useState<MasonryItem | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <div
        className="columns-1 gap-6 sm:columns-2 lg:columns-3"
        style={{ columnWidth: '320px' }}
      >
        {items.map((item) => (
          <GridItem key={item.id} item={item} onExpand={setExpandedItem} />
        ))}
      </div>

      {isMounted && createPortal(
        <AnimatePresence>
          {expandedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setExpandedItem(null)}
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative max-w-5xl max-h-[90vh] w-full flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setExpandedItem(null)}
                  className="absolute -top-12 right-0 text-[#FDF4F5] hover:text-[#E8A0BF] transition-colors flex items-center gap-2 font-semibold cursor-pointer"
                >
                  <span>Close</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
                
                <img
                  src={expandedItem.imageUrl}
                  alt={expandedItem.title}
                  className="w-auto h-auto max-w-full max-h-[85vh] rounded-lg shadow-2xl object-contain border border-white/10"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
