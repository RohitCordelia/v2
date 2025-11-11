export const VehicleListLoader =() =>{
    return (
      <div className="w-10 h-10 w-full">
        {/* <svg
      className="animate-pulse h-8 w-8 inline-block rounded-full border-2 border-white"
      viewBox="0 0 64 64"
      fill="primary"
    ></svg> */}
        <div className="animate-pulse my-4 w-full">
          <div
            className="grid grid-cols-3
       gap-4"
          >
            <div className="rounded col-span-2 h-5 bg-white/[0.3] mb-2"></div>
            <div className="rounded col-span-1 h-5 bg-white/[0.3] mb-2"></div>
          </div>
          <div className="rounded w-full h-4 bg-white/[0.3]"></div>
        </div>
      </div>
    );
}