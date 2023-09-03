import { useEffect, useState } from "react";
import Seo from "../components/Seo";

export default function Home() {
  const [foodArray, setFoodArray] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await fetch("/api/foods/uddi:1e5a6f2e-3f79-49bd-819b-d17541e6df78"); // Promise 객체
      const { data } = await response.json();
      setFoodArray(data);
    })();
  }, []);

  return (
    <div className="container">
      <Seo title="Home"></Seo>
      {!foodArray && <h4>Loading...</h4>}
      {foodArray?.map((food) => (
        <div key={food["음식이미지(ID)"]} className="food">
          <img src={food["음식이미지(URL)"]} />
          <h4>{food["식당명"]}</h4>
        </div>
      ))}
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .food img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .food:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .food h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
