import { useSearchParams } from "react-router-dom";

import ExchangeTabs from "../../components/ExchangeComponent/ExchangeTabs";
import ExchangeTab from "../../components/ExchangeComponent/ExchangeTab";

import WalletTabContent from "./WalletTabContent";
import GoalTabContent from "./GoalTabContent";
import RateTabContent from "./RateTabContent";

const DEFAULT_TAB = "지갑";

export default function ExchangeMainPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTab = searchParams.get("tab") || DEFAULT_TAB;

  const handleTabChange = (label) => setSearchParams({ tab: label });

  return (
    <div className="flex flex-col w-full">
      <ExchangeTabs selectedTab={selectedTab} onTabChange={handleTabChange}>
        <ExchangeTab label="지갑">
          <WalletTabContent />
        </ExchangeTab>

        <ExchangeTab label="목표">
          <GoalTabContent />
        </ExchangeTab>

        <ExchangeTab label="환율">
          <RateTabContent />
        </ExchangeTab>
      </ExchangeTabs>
    </div>
  );
}
