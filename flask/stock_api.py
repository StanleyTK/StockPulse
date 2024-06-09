from flask import Flask, jsonify, request
from flask_cors import CORS
import yfinance as yf

app = Flask(__name__)
CORS(app)

@app.route('/api/stock/latest/<ticker>', methods=['GET'])
def get_latest_stock_data(ticker):
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

@app.route('/api/stock/history/<ticker>', methods=['GET'])
def get_historical_stock_data(ticker):
    period = request.args.get('period', '5y')
    interval = request.args.get('interval', '1mo')

    stock = yf.Ticker(ticker)
    hist = stock.history(period=period, interval=interval)

    if not hist.empty:
        data = []
        for index, row in hist.iterrows():
            data.append({
                "date": index.strftime('%Y-%m-%d'),
                "month": index.strftime('%B'),
                "year": index.strftime('%Y'),
                "open": row["Open"],
                "close": row["Close"],
                "high": row["High"],
                "low": row["Low"],
                "volume": row["Volume"]
            })
        return jsonify(data)
    else:
        return jsonify({"error": "No data found for ticker"}), 404


if __name__ == '__main__':
    app.run(debug=True)
