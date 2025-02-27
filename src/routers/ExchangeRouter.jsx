import ExchangeMainPage from "../pages/ExchangePage/ExchangeMainPage";
import MyWalletPage from "../pages/ExchangePage/MyWalletPage";
// import LiveExchangeRatesPage from "../pages/ExchangePage/LiveExchangeRatesPage";
// import LiveExchangeRateDetailsPage from "../pages/ExchangePage/LiveExchangeRateDetailsPage";
import CurrencyExchangePage from "../pages/ExchangePage/CurrencyExchangePage";
import ExchangeCompletePage from "../pages/ExchangePage/ExchangeCompletePage";

const ExchangeRouter = {
  path: "/exchange",
  children: [
    { index: true, element: <ExchangeMainPage /> },
    { path: "wallet", element: <MyWalletPage /> },
    // { path: "rates", element: <LiveExchangeRatesPage /> },
    // { path: "rates/:id", element: <LiveExchangeRateDetailsPage /> },
    { path: "currency-exchange", element: <CurrencyExchangePage /> },
    { path: "complete", element: <ExchangeCompletePage /> },
  ],
};

export default ExchangeRouter;
