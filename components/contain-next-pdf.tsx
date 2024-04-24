import React, { useState, useEffect } from 'react';

interface UploadPdfProps extends React.HTMLProps<HTMLDivElement> {
  onUpload: (file: File) => void;
}

const UploadPdf: React.FC<UploadPdfProps> = ({ onUpload, ...divProps }) => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
      onUpload(file);
    } else {
      alert('Please select a PDF file.');
      setPdfFile(null);
    }
  };

  useEffect(() => {
    return () => {
      if (pdfFile) {
        URL.revokeObjectURL(URL.createObjectURL(pdfFile));
      }
    };
  }, [pdfFile]);

  return (
    <div {...divProps}>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        style={{ display: 'block', margin: '20px 0' }}
      />
      {pdfFile && (
        <iframe
          src={URL.createObjectURL(pdfFile)}
          style={{ width: '100%', height: '500px' }}
          frameBorder="0"
          title="PDF Preview"
        ></iframe>
      )}
    </div>
  );
};

export default UploadPdf;
