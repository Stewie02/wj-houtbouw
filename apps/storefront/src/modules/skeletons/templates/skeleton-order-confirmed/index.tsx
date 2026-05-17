const SkeletonOrderConfirmed = () => {
  return (
    <div className="bg-wj-bg min-h-screen animate-pulse">
      <div className="bg-wj-dark py-10 sm:py-14">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="h-3 w-28 bg-white/10 mb-4" />
          <div className="h-9 w-80 bg-white/10 mb-3" />
          <div className="h-4 w-56 bg-white/10" />
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 lg:gap-14">
          <div className="flex flex-col gap-6">
            <div className="bg-wj-white border border-wj-border p-6 sm:p-8 h-72" />
            <div className="bg-wj-white border border-wj-border p-6 sm:p-8 h-44" />
            <div className="bg-wj-white border border-wj-border p-6 sm:p-8 h-36" />
            <div className="bg-wj-white border border-wj-border p-6 sm:p-8 h-28" />
          </div>
          <div className="bg-wj-white border border-wj-border p-6 sm:p-8 h-72" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonOrderConfirmed;
