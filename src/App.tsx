import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import './index.css'
import { APP_CONFIGS } from './app-config'
import { CurrenciesProvider } from './components/currencies-provider'
// import { CurrencyExchange } from './components/currency-exchange'
import { PaginatedList } from './components/pagination/paginated-list'

function App() {
  return (
    <div className="h-screen p-6 bg-gray-700">
      <>
        <CurrenciesProvider apiKey={APP_CONFIGS.API_KEY}>
          {/* <h1 className="mb-4 text-2xl text-blue-200">Currency exchange</h1> */}
          <div>
            {/* <CurrencyExchange /> */}
            <PaginatedList />

            <ToastContainer position="bottom-left" autoClose={3000} theme="dark" />
          </div>
        </CurrenciesProvider>
      </>
    </div>
  )
}

export default App
