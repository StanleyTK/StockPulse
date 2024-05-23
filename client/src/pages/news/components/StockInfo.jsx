const StockInfo = ({ info }) => {
    return (
      <div className="flex items-center justify-center">
        <div className="w-full max-w-3xl p-4 m-4 border border-gray-300 rounded bg-white shadow-lg">
          <h2 className="text-xl font-bold">{info.name} ({info.symbol})</h2>
          <p>{info.description}</p>
        </div>
      </div>
    );
  };
  
  export default StockInfo;
  