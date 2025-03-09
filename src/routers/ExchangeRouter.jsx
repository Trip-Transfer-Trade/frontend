import CurrencyExchangePage from "../pages/ExchangePage/CurrencyExchangePage";
import ExchangeCompletePage from "../pages/ExchangePage/ExchangeCompletePage";

// import MyWalletPage from "../pages/ExchangePage/MyWalletPage";
// import ExchangeRatesPage from "../pages/ExchangePage/ExchangeRatesPage";
// import ExchangeRateDetailsPage from "../pages/ExchangePage/ExchangeRateDetailsPage";

const ExchangeRouter = {
  path: "/exchange",
  children: [
    { path: "currency", element: <CurrencyExchangePage /> },
    { path: "complete", element: <ExchangeCompletePage /> },

    // { path: "wallet", element: <MyWalletPage /> },
    // { path: "rates", element: <ExchangeRatesPage /> },
    // { path: "rates/:id", element: <ExchangeRateDetailsPage /> },
  ],
};

export default ExchangeRouter;
