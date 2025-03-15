import { Bell } from "lucide-react";

export function NotificationItem({ title, description, time, isRead, onClick }) {
    return(
        <div className={`${isRead ? "bg-gray-50" : "bg-red-50"} rounded-xl p-4 `} onClick={onClick}> 
            <div className="flex items-center gap-3">
                <Bell className={`h-5 w-5 ${isRead ? "text-blue-600 fill-blue-600" : "text-red-600 fill-red-600"}`} />
                <div className="flex items-center w-full justify-between">
                    <h3 className={`font-medium text-base flex-grow ${!isRead && "text-red-700"}`}>
                        {title}
                    </h3>
                    <div className="text-gray-500 text-xs flex-shrink-0">
                        {/* {time} */}
                    </div>
                </div>
            </div>
            <p className="text-gray-600 text-sm mt-1 ml-2">{description}</p>
        </div>
    )
}