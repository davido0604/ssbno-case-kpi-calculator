"use client";

import { useState, useEffect } from 'react';
import data from './csvjson.json'; 

interface ResultType {
  percentageChange: number ;
  newAmount: number ;
}
interface DataItem {
  [key: string]: string | number;
}

function Home() {
  const [amount, setAmount] = useState('');
  const [fromYear, setFromYear] = useState('');
  const [fromMonth, setFromMonth] = useState('');
  const [toYear, setToYear] = useState('');
  const [toMonth, setToMonth] = useState('');
  const [result, setResult] = useState<ResultType | null>(null);

  const handleCalculation = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!amount || !fromYear || !fromMonth || !toYear || !toMonth) {
      alert("Fyll inn alle feltene!");
      return;
    }

    let fromPeriodValue = findValueInData(fromYear, fromMonth);
    let toPeriodValue = findValueInData(toYear, toMonth);

    if(fromPeriodValue && toPeriodValue) {
      let difference = toPeriodValue - fromPeriodValue;
      let percentageChange = (difference * 100) / fromPeriodValue;
      let newAmount = parseFloat(amount) * (toPeriodValue / fromPeriodValue);

      setResult({ percentageChange, newAmount });
    } else {
      alert("Kunne ikke finne verdiene i datagrunnlaget.");
    }
  }

    const monthMapping: { [key: string]: string } = {
      'Jan': 'Jan',
      'Feb': 'Feb',
      'Mar': 'Mar',
      'Apr': 'Apr',
      'May': 'Mai',
      'Jun': 'Jun',
      'Jul': 'Jul',
      'Aug': 'Aug',
      'Sep': 'Sep',
      'Oct': 'Okt',
      'Nov': 'Nov',
      'Dec': 'Des'
    };

    const findValueInData = (year: string | number, month: string) => {
      const monthInData = monthMapping[month];
    
      if (!monthInData) {
        alert("Ugyldig måned!");
        return null;
      }
    
      let row = data.find((item: DataItem) => item[""] == year) as DataItem;
      return row ? parseFloat((row[monthInData] as string).replace(',', '.')) : null;
    }


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between">
      <h1>Beregn prisendring</h1>
      <p>Regn ut hvor mye prisene har endret seg. Kalkulatoren er basert på <a href="https://www.ssb.no/kpi">konsumprisindeksen</a>.</p>
      <form onSubmit={handleCalculation}>
        <p>
          <label htmlFor="amount">Skriv inn beløp</label>
          <input type="text" id="amount" name="amount" required onChange={e => setAmount(e.target.value)} />
        </p>
        <p>
          <label htmlFor="fromYear">Fra år (åååå)</label>
          <input type="text" id="fromYear" name="fromYear" required onChange={e => setFromYear(e.target.value)} />
          <label htmlFor="fromMonth">Velg måned</label>
          <input type="text" id="fromMonth" name="fromMonth" required onChange={e => setFromMonth(e.target.value)} />
        </p>
        <p>
          <label htmlFor="toYear">Til år (åååå)</label>
          <input type="text" id="toYear" name="toYear" required onChange={e => setToYear(e.target.value)} />
          <label htmlFor="toMonth">Velg måned</label>
          <input type="text" id="toMonth" name="toMonth" required onChange={e => setToMonth(e.target.value)} />
        </p>
        <p>
          <button type="submit">Se prisendring</button>
        </p>
      </form>
      {result && 
        <div>
          <p>Endring i prosent: {result.percentageChange.toFixed(2)}%</p>
          <p>Ny beløp etter endringen: {result.newAmount.toFixed(2)}</p>
        </div>
      }
      <a href="https://www.ssb.no/kalkulatorer/priskalkulator/om-priskalkulatoren">Les om kalkulatoren</a>
      </div>
    </main>
  )
}

export default Home;