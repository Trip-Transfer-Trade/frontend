self.addEventListener("install", function (e) {
    console.log("fcm sw install..");
    self.skipWaiting();
  });
  
  self.addEventListener("activate", function (e) {
    console.log("fcm sw activate..");
  });
  
  self.addEventListener("push", function (e) {
    console.log("push: ", e.data.json());
    if (!e.data.json()) return;
  
    const resultData = e.data.json().notification;
    const addedData = e.data.json().data;
    console.log(addedData);
    const notificationTitle = resultData.title;
    const notificationOptions = {
      body: resultData.body,
      icon: resultData.image,
      tag: resultData.tag,
      ...resultData,
      data: {
        type: addedData.type || null, 
        tripId: addedData.tripId || null, 
      },
    };
    console.log("push: ", { resultData, notificationTitle, notificationOptions });
    
    self.registration.showNotification(notificationTitle, notificationOptions);
  });
  
  self.addEventListener("notificationclick", function (e) {
    console.log("notification click");
    e.notification.close();
    // e.notification.data 전체를 전달합니다.
    const clickUrl = getClickUrl(e.notification.data);
    console.log("clickUrl:", clickUrl);
    e.waitUntil(self.clients.openWindow(clickUrl));
  });
  

  function getClickUrl(data){
    if(data&&data.type){
      console.log(data,"type",data.type);
      switch (data.type) {
        case "GOAL_ACHIEVED":
          return `/trip/${data.tripId}/success`;
        case "GOAL_FAILED":
          return `/trip/${data.tripId}/failed`;
        case "GOAL_HALF_FAILED":
          return `/trip/${data.tripId}/portfolio`;
        // case "EXCHANGE_AFTER_GOAL":
        //   return "/exchange-goal";
        // case "EXCHANGE_AFTER_WEEK":
        //   return "/exchange-week";
        case "LOWEST_EXCHANGE_RATE":
          return "exchange/rates/USD";
        default:
          return "/";
      }
    }
    return "/";
  }