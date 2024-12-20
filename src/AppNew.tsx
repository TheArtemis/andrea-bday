export default function AppNew() {
    const images = [
        '/src/assets/andrea1.webp',
        '/src/assets/andrea2.webp',
      ];

    const columnCount = 1000;
    const rowCount = 1000;
    const cellWidth = 180;
    const cellHeight = 180;
    
    return (
        <div className="scroll-container">
            {Array.from({ length: rowCount }).map((_, rowIndex) => (
                <div key={rowIndex} className="row">
                    {Array.from({ length: columnCount }).map((_, colIndex) => (
                        <div
                            key={colIndex}
                            className="cell"
                            style={{
                                width: cellWidth,
                                height: cellHeight,
                                backgroundImage: `url(${images[(rowIndex + colIndex) % images.length]})`,
                                backgroundSize: 'cover',
                            }}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}