const Stats = ({ stats }) => {
    return (
      <div className="text-white">
        {Object.entries(stats).map(([key, value]) => (
          <p key={key}>{`${key}: ${value}`}</p>
        ))}
      </div>
    );
  };
  
  export default Stats;
  