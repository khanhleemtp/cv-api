const TemplatePreview = () => {
  return (
    <div
      className="shadow-lg cursor-pointer ring-1 ring-gray-100 hover:ring-blue-500 active:ring-blue-500 transition-all transform hover:-translate-y-1"
      style={{ height: 297 * 0.7, width: 210 * 0.7 }}
    >
      <img src="assets/cv1.png" alt="preview-img" className="w-full h-full" />
    </div>
  );
};

export default TemplatePreview;
