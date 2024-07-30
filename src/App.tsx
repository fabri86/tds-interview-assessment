import './index.css'
import { APP_CONFIGS } from './app-config'
import { CurrenciesProvider } from './components/currencies-provider'
import { CurrencyExchange } from './components/currency-exchange'

function App() {
  const currencyApiKey = APP_CONFIGS.API_KEY

  return (
    <div className="flex flex-col justify-center h-screen p-10 bg-gray-700">
      <h1 className="my-4 text-2xl text-blue-200">Currency exchange</h1>

      <CurrenciesProvider apiKey={currencyApiKey}>
        <CurrencyExchange />
      </CurrenciesProvider>
    </div>
  )
}

export default App
