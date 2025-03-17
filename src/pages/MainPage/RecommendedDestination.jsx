import BackNavigation from "../../components/BackNavigation";

export default function RecommendedDestination() {
  const destinations = [
    { id: 1, name: "미국", image: "/assets/images/travel/travel-us.jpeg" },
    { id: 2, name: "일본", image: "/assets/images/travel/travel-jp.jpeg" },
    { id: 3, name: "영국", image: "/assets/images/travel/travel-gb.jpeg" },
    {
      id: 4,
      name: "인도네시아",
      image: "/assets/images/travel/travel-id.jpeg",
    },
    {
      id: 5,
      name: "중국",
      image: "/assets/images/travel/travel-cn.jpeg",
    },
    {
      id: 6,
      name: "태국",
      image: "/assets/images/travel/travel-th.jpeg",
    },
    {
      id: 7,
      name: "말레이시아",
      image: "/assets/images/travel/travel-my.jpeg",
    },
    {
      id: 8,
      name: "호주",
      image: "/assets/images/travel/travel-au.jpeg",
    },
    {
      id: 9,
      name: "싱가포르",
      image: "/assets/images/travel/travel-sg.jpeg",
    },
    {
      id: 10,
      name: "노르웨이",
      image: "/assets/images/travel/travel-no.jpeg",
    },
  ];

  return (
    <div className="flex flex-col pb-6">
      <BackNavigation text="여행지 Best10" />

      <div className="grid grid-cols-2 gap-4 px-6">
        {destinations.map((destination) => (
          <div
            key={destination.id}
            className="relative overflow-hidden rounded-2xl aspect-square pointer-events-none"
          >
            <img
              src={destination.image}
              alt={destination.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-3 text-white flex items-center justify-center rounded-md font-bold">
              Top {destination.id}
            </div>
            <div className="absolute bottom-3 left-3 text-white font-medium">
              {destination.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
