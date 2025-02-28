import ExchangeMainPage from "../pages/ExchangePage/ExchangeMainPage";
import MyWalletPage from "../pages/ExchangePage/MyWalletPage";
import ExchangeRatesPage from "../pages/ExchangePage/ExchangeRatesPage";
import ExchangeRateDetailsPage from "../pages/ExchangePage/ExchangeRateDetailsPage";
import CurrencyExchangePage from "../pages/ExchangePage/CurrencyExchangePage";
import ExchangeCompletePage from "../pages/ExchangePage/ExchangeCompletePage";
import Test from "../pages/ExchangePage/Test";

const ExchangeRouter = {
  path: "/exchange",
  children: [
    { index: true, element: <ExchangeMainPage /> },
    { path: "wallet", element: <MyWalletPage /> },
    { path: "rates", element: <ExchangeRatesPage /> },
    { path: "rates/:id", element: <ExchangeRateDetailsPage /> },
    { path: "currency", element: <CurrencyExchangePage /> },
    { path: "complete", element: <ExchangeCompletePage /> },
    { path: "test", element: <Test /> },
  ],
};

export default ExchangeRouter;
