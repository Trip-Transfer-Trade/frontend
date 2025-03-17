import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { useEffect, useState } from "react";
import TripCard from "./TripCard";
import { useSelector, useDispatch } from "react-redux";
import { TripAll } from "../../redux/tripSlice";
import { nomalAccount } from "../../redux/nomalAccountSlice";
import AccountCard from "./AccountCard";
import { DndProvider } from "react-dnd";
import { MultiBackend, createTransition } from "react-dnd-multi-backend";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import withScrolling from "react-dnd-scrolling";
import CreateAccountModal from "../../components/portfolio/CreateAccountModal";
import SharedModal from "../../components/Modal"
import { useMediaQuery } from "react-responsive";

const TouchTransition = createTransition("touchstart", (event) => {
  return event.touches != null;
});

const ScrollingComponent = withScrolling('div');

const pipeline = {
  backends: [
    {
      id: "html5",
      backend: HTML5Backend,
    },
    {
      id: "touch",
      backend: TouchBackend,
      preview: true,
      transition: TouchTransition,
      options: {
        enableMouseEvents: true,
        delayTouchStart: 300,
      },
    },
  ],
};

export default function TripMainPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tripGoals, status } = useSelector((state) => state.trip);
  const account = useSelector((state) => state.nomalAccount.account);
  const [showModal, setShowModal] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const Container = isMobile ? ScrollingComponent : "div";

  useEffect(() => {
    dispatch(TripAll());
  }, [dispatch]);

  useEffect(() => {
    dispatch(nomalAccount());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(tripGoals) && tripGoals.length === 0) {
      dispatch(TripAll());
    }
  }, [tripGoals, dispatch]);

  useEffect(() => {
    if (account !== undefined && account !== null) {
      if (!account.amountNumber) {
        setShowModal(true);
      } else {
        setShowModal(false);
      }
    }
  }, [account]);

  const today = new Date();
  const sortedTrips = [...tripGoals].sort((a, b) => {
    const dateA = new Date(a.endDate);
    const dateB = new Date(b.endDate);

    const isPastA = dateA < today;
    const isPastB = dateB < today;

    if (isPastA && !isPastB) return 1;
    if (!isPastA && isPastB) return -1;
    return dateA - dateB;
  });

  return (
    <DndProvider backend={MultiBackend} options={pipeline}>
      <Container style={{ height: "100vh", overflowY: "auto" }}>
        <div className="flex flex-col min-h-screen">
          <main className="flex-1 p-4 space-y-4">
            {account && account.amountNumber ? (
              <AccountCard account={account} />
            ) : (
              <p></p>
            )}

            {status === "loading" && <p>로딩 중...</p>}
            {Array.isArray(sortedTrips) && sortedTrips.length > 0 ? (
              sortedTrips.map((trip) => <TripCard key={trip.tripId} trip={trip} accountId={account.accountId} />)
            ) : (
              <p> </p>
            )}

            <button
              className="w-full py-4 mt-4 bg-gray-100 rounded-xl flex items-center justify-center"
              onClick={() => navigate("/trip/tripgoal")}
            >
              <Plus className="w-5 h-5 text-gray-500 mr-1" />
              <span className="text-gray-500">새로운 목표 등록</span>
            </button>
          </main>
        </div>
      </Container>
      {showModal && (
        <SharedModal onClose={() => setShowModal(false)}>
          <CreateAccountModal onClose={() => setShowModal(false)} />
        </SharedModal>
      )}
    </DndProvider>
  );
}
