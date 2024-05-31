from flask import Flask, jsonify
from flask_cors import CORS
import yfinance as yf

app = Flask(__name__)
CORS(app)

@app.route('/api/stock/<ticker>', methods=['GET'])
def get_stock_data(ticker):
    stock = yf.Ticker(ticker)
    hist = stock.history(period="1d")

    if not hist.empty:
        data = {
            "ticker": ticker,
            "open": hist["Open"].iloc[-1].item(),
            "close": hist["Close"].iloc[-1].item(),
            "high": hist["High"].iloc[-1].item(),
            "low": hist["Low"].iloc[-1].item(),
            "volume": hist["Volume"].iloc[-1].item()
        }
        return jsonify(data)
    else:
        return jsonify({"error": "No data found for ticker"}), 404

if __name__ == '__main__':
    app.run(debug=True)
