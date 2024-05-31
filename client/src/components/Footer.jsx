const Footer = () => {
  return (
    <footer className="bg-gray-800 p-8 text-center text-gray-400">
      <div className="flex flex-col items-center">
        <h4 className="text-2xl font-bold mb-4 text-white">Contact Us</h4>
        <div className="flex space-x-6 mb-4">
          <a href="https://github.com/stanleytk/stockpulse" className="text-gray-400 hover:text-white transition duration-300">
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 .5C5.373.5 0 5.845 0 12.5c0 5.287 3.438 9.757 8.205 11.35.6.113.82-.262.82-.582 0-.286-.01-1.04-.015-2.04-3.337.733-4.042-1.64-4.042-1.64-.546-1.397-1.332-1.77-1.332-1.77-1.09-.754.083-.74.083-.74 1.204.086 1.838 1.271 1.838 1.271 1.07 1.852 2.809 1.316 3.493 1.007.108-.796.42-1.317.76-1.62-2.665-.303-5.467-1.36-5.467-6.048 0-1.336.467-2.43 1.235-3.287-.124-.304-.535-1.525.118-3.176 0 0 1.008-.33 3.3 1.25.957-.268 1.982-.403 3.002-.408 1.02.005 2.045.14 3.003.408 2.29-1.58 3.297-1.25 3.297-1.25.654 1.65.243 2.872.12 3.176.77.857 1.233 1.95 1.233 3.287 0 4.698-2.805 5.742-5.475 6.04.432.38.816 1.136.816 2.29 0 1.654-.015 2.985-.015 3.39 0 .323.216.698.826.58C20.565 22.255 24 17.787 24 12.5 24 5.845 18.627.5 12 .5z" />
            </svg>
          </a>

          <a href="mailto:stanleykim2003@gmail.com" className="text-gray-400 hover:text-white transition duration-300">
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 12.713l11.64-7.417c-.117-.172-4.597-4.296-11.64-4.296s-11.524 4.124-11.64 4.296l11.64 7.417zm0 2.005l-12-7.648v10.43c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-10.43l-12 7.648z" />
            </svg>
          </a>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          &copy; {new Date().getFullYear()} StockPulse. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
