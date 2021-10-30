const TemplatePreview = () => {
  return (
    <div className="flex flex-col items-center">
      <div
        className="shadow-lg cursor-pointer ring-1 ring-gray-100 hover:ring-blue-500 active:ring-blue-500 transition-all transform hover:-translate-y-1"
        style={{ height: 297 * 0.7, width: 210 * 0.7 }}
      >
        <img src="assets/cv1.png" alt="preview-img" className="w-full h-full" />
      </div>
      <div className="text-center flex items-center justify-center font-semibold">
        Template Name
      </div>
    </div>
  );
};

export default TemplatePreview;
