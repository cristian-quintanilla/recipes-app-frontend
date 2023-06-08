export const Steps = ({ steps }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="w-full md:w-3/12 text-black font-bold">
        Steps:
      </div>

      <div className="w-full md:w-8/12 flex flex-col gap-4">
        {
          steps.map((step) => (
            <div
              key={ step.step }
              className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4"
            >
              <div className="w-full sm:w-8">
                <div className="flex flex-col items-center justify-center w-7 h-7 rounded-full border border-gray-700">
                  <span className="text-sm">{ step.step }</span>
                </div>
              </div>

              <div className="w-full sm:w-auto font-medium text-sm">{ step.description }</div>
            </div>
          ))
        }
      </div>
    </div>
  );
}
