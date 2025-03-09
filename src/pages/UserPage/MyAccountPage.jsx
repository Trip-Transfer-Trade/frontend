import React, { useEffect, useState } from "react";
import AccountTabs from "../../components/UserComponent/AccountTabs";
import AccountTab from "../../components/UserComponent/AccountTab";
import AccountItem from "../../components/UserComponent/AccountItem";
import { Outlet } from "react-router-dom";
import Footer from "../../layout/Footer";
import apiClient from "../../apis/apiClient";

export default function MyAccountPagePage() {
    const [type, setType] = useState("원화");
    const [accounts, setAccounts] = useState([]);

    const convertType = (type) => ({
        "원화": "KRW",
        "달러": "USD"
    }[type] || "KRW");

    useEffect(()=>{
        const currencyCode = convertType(type)
        apiClient.get("/exchanges/account/all", {
            params: { currencyCode }
        })
        .then((response) => {
            console.log(response.data)
            setAccounts(response.data.data || []);
        })
        .catch((err) =>{
            console.log(err);
        })
    }, [type])

    return (
        <div>
            <div className="py-20">
                <section>
                    <AccountTabs>
                        <AccountTab label="원화" onClick={() => { setType("원화"), console.log("원화 선택")}}>
                            <div className="px-7 py-6 space-y-4 h-[550px] overflow-y-auto" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                            {accounts.length > 0 ? (
                                accounts.map((account, index) => (
                                    <AccountItem 
                                        key={index} 
                                        id = {account.accountId}
                                        title={account.name} 
                                        amount={`${account.amount.toLocaleString()}원`} 
                                        onTransfer={() => alert(`${account.name} 이체 기능 실행`)}       
                                    />
                                ))
                            ) : (
                                <p className="text-gray-500 text-center">계좌 데이터가 없습니다.</p>
                            )}
                            </div>
                        </AccountTab>
                        <AccountTab label="달러" onClick={() => { setType("달러"), console.log("달러 선택")}}>
                            <div className="px-7 py-6 space-y-4 h-[550px] overflow-y-auto" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                                {accounts.length > 0 ? (
                                    accounts.map((account, index) => (
                                        <AccountItem 
                                            key={index} 
                                            title={account.name} 
                                            amount={`$${account.amount.toFixed(2)}`} 
                                            onTransfer={() => alert(`${account.name} 이체 기능 실행`)}
                                        />
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-center">계좌 데이터가 없습니다.</p>
                                )}
                            </div>
                        </AccountTab>
                    </AccountTabs>
                </section>
            </div>
            <Outlet />
            <Footer />
        </div>
    )
}