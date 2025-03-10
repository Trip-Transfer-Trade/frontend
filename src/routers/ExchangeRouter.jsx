import CurrencyExchangePage from "../pages/ExchangePage/CurrencyExchangePage";
import ExchangeCompletePage from "../pages/ExchangePage/ExchangeCompletePage";

import WalletDetailPage from "../pages/ExchangePage/WalletDetailPage";
import GoalDetailPage from "../pages/ExchangePage/GoalDetailPage";
// import RateDetailPage from "../pages/ExchangePage/RateDetailPage";

import Test from "../pages/ExchangePage/Test";

const ExchangeRouter = {
  path: "/exchange",
  children: [
    { path: "currency", element: <CurrencyExchangePage /> },
    { path: "complete", element: <ExchangeCompletePage /> },

    { path: "wallets/:currencyCode", element: <WalletDetailPage /> },
    { path: "goals/:goalId", element: <GoalDetailPage /> },
    // { path: "rates/:currencyCode", element: <RateDetailPage /> },

    { path: "test", element: <Test /> },
  ],
};

export default ExchangeRouter;
