import StockTradingPage from "../pages/StockPage/StockTradingPage";

const StockTradingRouter = () => {
    <Router>
      <Routes>
        <Route path="/stock" element={<Navigate replace to="/stock/buy" />} />
        
        <Route path="/stock/buy" element={<StockTradingPage type="buy" />} />
        <Route path="/stock/sell" element={<StockTradingPage type="sell" />} />
      </Routes>
    </Router>

}

export default StockTradingRouter;