export default function Home() {
  // This is a placeholder. You may alter as much as you'd like.
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between">
      <h1>Beregn prisendring</h1>
      <p>Regn ut hvor mye prisene har endret seg. Kalkulatoren er basert på <a href="https://www.ssb.no/kpi">konsumprisindeksen</a>.</p>
      <form>
        <p>
          <label htmlFor="amount">Skriv inn beløp</label>
          <input type="text" id="amount" name="amount" required />
        </p>
        <p>
          <label htmlFor="fromYear">Fra år (åååå)</label>
          <input type="text" id="fromYear" name="fromYear" required />
          <label htmlFor="fromMonth">Velg måned</label>
          <input type="text" id="fromMonth" name="fromMonth" required />
        </p>
        <p>
          <label htmlFor="toYear">Til år (åååå)</label>
          <input type="text" id="toYear" name="toYear" required />
          <label htmlFor="toMonth">Velg måned</label>
          <input type="text" id="toMonth" name="toMonth" required />
        </p>
        <p>
          <button type="submit">Se prisendring</button>
        </p>
      </form>
      <a href="https://www.ssb.no/kalkulatorer/priskalkulator/om-priskalkulatoren">Les om kalkulatoren</a>
      </div>
    </main>
  )
}