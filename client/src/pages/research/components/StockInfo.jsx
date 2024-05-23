const StockInfo = ({ info }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-3xl p-4 m-4 border border-gray-300 rounded bg-black text-white shadow-lg">
        <p>{info}</p>
      </div>
    </div>
  );
};

export default StockInfo;
