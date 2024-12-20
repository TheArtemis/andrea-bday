import React, { useRef, useCallback, useMemo, useEffect } from 'react';
import { VariableSizeGrid as Grid } from 'react-window';
import './App.css'
function App() {

  // Duplicate videos to create seamless loop
  const images = useMemo(() => [
    '/src/assets/andrea2.webp',
    '/src/assets/andrea2.webp',
  ], []);

  const gridRef = useRef(null);
  
  const columnCount = 2000;
  const rowCount = 2000;
  const cellWidth = 180;
  const cellHeight = 180;

  const getColumnWidth = useCallback(() => cellWidth, []);
  const getRowHeight = useCallback(() => cellHeight, []);

  useEffect(() => {
    const music = new Audio('/src/assets/ilredellelamentele.mp3');
    const playMusic = () => {
      music.play().catch(error => {
        console.error('Failed to play audio:', error);
      });
    };
    document.addEventListener('click', playMusic);
    return () => {
      document.removeEventListener('click', playMusic);
    };
  }, []);

  const Cell = useCallback(({ columnIndex, rowIndex, style }: { columnIndex: number; rowIndex: number; style: React.CSSProperties }) => {
    const imageIndex = (columnIndex + rowIndex) % images.length;
    
    return (
      <div 
        style={{
          ...style,
          padding: '4px'
        }}
        className="cell-animation"
      >
        <div className="w-full h-full overflow-hidden">
          <img
            src={images[imageIndex]}
            alt={`Grid item ${rowIndex},${columnIndex}`}
            style={{
              width: imageIndex % 2 == 0 ? '100%' : '100%',
              objectPosition: "center"
            }}
            loading="lazy"
          />
        </div>
      </div>
    );
  }, [images]);

  return (
    <div>
      <div className="title-andre"
        
        onMouseOver={(e) => e.currentTarget.style.transform = "translate(-50%, -50%) scale(1.1)"}
        onMouseOut={(e) => e.currentTarget.style.transform = "translate(-50%, -50%) scale(1)"}
      >
        Auguri Andreamioo!
      </div>
      <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
      <div className="animate-diagonal-slide">
        <Grid
          ref={gridRef}
          columnCount={columnCount}
          columnWidth={getColumnWidth}
          height={window.innerHeight * 10} // Make grid larger than viewport
          rowCount={rowCount}
          rowHeight={getRowHeight}
          width={window.innerWidth * 10}   // Make grid larger than viewport
          overscanCount={5}
          style={{
            transform: 'scale(1.2)', // Slightly larger to avoid empty edges
          }}
        >
          {Cell}
        </Grid>
      </div>
    </div>    
    </div>
    
  );
};

export default App
