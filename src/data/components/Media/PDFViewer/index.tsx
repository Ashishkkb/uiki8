import React from 'react';
import { ComponentItem } from "@/types/component";
import PDFViewer from './PDFViewerComponent';

const PDFViewerComponentItem: ComponentItem = {
  id: 153,
  name: "PDF Viewer",
  description: "Interactive PDF viewer with page navigation, zoom controls, search functionality, and thumbnails",
  category: "Media",
  framework: "React",
  language: "TypeScript",
  tags: ["PDF", "Document", "Viewer", "Media", "Interactive"],
  isNew: true,
  component: () => (
    <div className="max-w-4xl mx-auto">
      <PDFViewer 
        pdfUrl="https://example.com/sample.pdf" 
        initialPage={1}
        showControls={true}
        showThumbnails={true}
        showDownloadButton={true}
      />
    </div>
  ),
  code: `import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, DownloadCloud, Search, ZoomIn, ZoomOut, Maximize, Minimize, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

// Since we can't include an actual PDF rendering library like react-pdf in this demo,
// we'll simulate PDF pages with placeholders

interface PDFViewerProps {
  pdfUrl?: string;
  initialPage?: number;
  showControls?: boolean;
  showThumbnails?: boolean;
  showDownloadButton?: boolean;
  className?: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({
  pdfUrl = '',
  initialPage = 1,
  showControls = true,
  showThumbnails = true,
  showDownloadButton = true,
  className,
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages] = useState(10); // Simulated total pages
  const [zoom, setZoom] = useState(100);
  const [searchText, setSearchText] = useState('');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);

  // Sample PDF page thumbnails
  const pageThumbnails = Array.from({ length: totalPages }, (_, i) => ({
    id: i + 1,
    thumbnail: \`https://via.placeholder.com/80x100?text=Page+\${i + 1}\`,
  }));

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleZoomChange = (values: number[]) => {
    setZoom(values[0]);
  };

  const handleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would search through the PDF content
    console.log(\`Searching for: \${searchText}\`);
  };

  const handleDownload = () => {
    // In a real implementation, this would download the PDF
    console.log('Downloading PDF:', pdfUrl);
    
    // For demo purposes only, since we can't actually download a PDF
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = pdfUrl.substring(pdfUrl.lastIndexOf('/') + 1);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={cn('border rounded-lg overflow-hidden', isFullScreen && 'fixed inset-0 z-50 bg-background', className)}>
      {showControls && (
        <div className="flex items-center justify-between border-b p-2 bg-muted/30">
          {/* Navigation controls */}
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center">
              <Input
                type="number"
                min={1}
                max={totalPages}
                value={currentPage}
                onChange={(e) => handlePageChange(parseInt(e.target.value) || 1)}
                className="w-14 h-8 text-center"
              />
              <span className="mx-1 text-sm text-muted-foreground">of {totalPages}</span>
            </div>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Other controls */}
          <div className="flex items-center space-x-2">
            {/* Search functionality */}
            {!showSearchBar ? (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setShowSearchBar(true)}
              >
                <Search className="h-4 w-4" />
              </Button>
            ) : (
              <form className="flex items-center space-x-1" onSubmit={handleSearch}>
                <Input
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Search text..."
                  className="h-8 w-40"
                />
                <Button variant="ghost" size="icon" type="submit">
                  <Search className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  type="button" 
                  onClick={() => setShowSearchBar(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </form>
            )}
            
            {/* Zoom controls */}
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="icon" onClick={() => setZoom(Math.max(50, zoom - 10))}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <div className="w-24">
                <Slider
                  value={[zoom]}
                  min={50}
                  max={200}
                  step={10}
                  onValueChange={handleZoomChange}
                />
              </div>
              <Button variant="ghost" size="icon" onClick={() => setZoom(Math.min(200, zoom + 10))}>
                <ZoomIn className="h-4 w-4" />
              </Button>
              <span className="text-xs text-muted-foreground w-10">{zoom}%</span>
            </div>
            
            {/* Fullscreen and download */}
            <Button variant="ghost" size="icon" onClick={handleFullScreen}>
              {isFullScreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
            </Button>
            
            {showDownloadButton && (
              <Button variant="ghost" size="icon" onClick={handleDownload}>
                <DownloadCloud className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      )}
      
      <div className="flex h-[500px]">
        {/* Thumbnails sidebar */}
        {showThumbnails && (
          <div className="w-24 overflow-y-auto border-r p-2 bg-muted/20 hidden sm:block">
            {pageThumbnails.map((page) => (
              <div 
                key={page.id}
                className={cn(
                  "mb-2 p-1 cursor-pointer rounded border transition-colors",
                  currentPage === page.id ? "border-primary" : "border-transparent hover:border-muted-foreground/30"
                )}
                onClick={() => handlePageChange(page.id)}
              >
                <img 
                  src={page.thumbnail} 
                  alt={\`Page \${page.id}\`}
                  className="w-full h-auto"
                />
                <div className="text-xs text-center mt-1">Page {page.id}</div>
              </div>
            ))}
          </div>
        )}
        
        {/* PDF viewing area */}
        <div className="flex-1 overflow-auto p-4 flex justify-center">
          <div 
            style={{ 
              maxWidth: \`\${zoom}%\`,
              minWidth: '300px',
              transform: \`scale(\${zoom / 100})\`,
              transformOrigin: 'top center'
            }}
          >
            {/* This is a placeholder. In a real implementation, this would render the actual PDF page */}
            <div 
              className="aspect-[210/297] bg-white shadow-lg relative" // A4 aspect ratio
              style={{ width: '100%' }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                <div className="text-lg font-semibold mb-4">Page {currentPage} of {totalPages}</div>
                <div className="w-full h-12 bg-muted/30 rounded-md mb-4"></div>
                <div className="w-full h-72 bg-muted/20 rounded-md mb-4"></div>
                <div className="w-full h-24 bg-muted/30 rounded-md mb-4"></div>
                <div className="w-2/3 h-12 bg-muted/20 rounded-md"></div>
                <div className="absolute top-2 right-2 text-xs text-muted-foreground">
                  {pdfUrl ? pdfUrl.split('/').pop() : 'sample-document.pdf'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;`
};

export default PDFViewerComponentItem;
