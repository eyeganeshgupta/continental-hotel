const Spinner = ({ fullHeight = false }: { fullHeight?: boolean }) => {
  return (
    <div
      className="flex items-center justify-center"
      style={{ height: fullHeight ? "80vh" : "auto" }}
    >
      <div className="border-solid h-10 w-10 border-t-gray-200 animate-spin right-full"></div>
    </div>
  );
};

export default Spinner;
