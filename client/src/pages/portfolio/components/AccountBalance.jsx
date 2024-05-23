const AccountBalance = ({ balance }) => {
    return (
      <div className="bg-black p-4 rounded-lg text-center my-4">
        <h3 className="text-lg font-semibold">Account Balance</h3>
        <p className="text-2xl font-bold text-white">${balance.toLocaleString()}</p>
      </div>
    );
};

export default AccountBalance;
