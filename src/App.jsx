import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [money, setMoney] = useState(0);
  const [getCoin, setGetCoin] = useState("");

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setGetCoin(json[0].quotes.USD.price); // 첫번쨰 인자의 value가져오기
        setLoading(false);
      });
  }, []);

  const changeMoney = (e) => setMoney(e.target.value);
  const onChangeCoin = (e) => setGetCoin(e.target.value);

  return (
    <>
      <div>
        <h1>💰코인리스트 {loading ? "" : `(${coins.length})`}💰</h1>
        {loading ? (
          <strong>loading...</strong>
        ) : (
          <select onChange={onChangeCoin}>
            {coins.map((item) => (
              <option key={item.id} value={item.quotes.USD.price}>
                {item.name} ({item.symbol}) ${item.quotes.USD.price}
              </option>
            ))}
          </select>
        )}
        {loading ? (
          ""
        ) : (
          <input
            onChange={changeMoney}
            value={money}
            type="text"
            placeholder="text your money"
          />
        )}
        {loading ? (
          ""
        ) : (
          <div>
            내 {money}로 살 수 있는 개수는 {money / getCoin} 입니다.
          </div>
        )}
      </div>
    </>
  );
}

export default App;
