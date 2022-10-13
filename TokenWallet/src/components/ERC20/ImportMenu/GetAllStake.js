import { Button } from "@mui/material";
import { Table } from "antd";
import "antd/dist/antd.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const { applyDecimals } = require("../../../utils/ethereumAPI");

const GetAllStake = ({ web3Token }) => {
    // const decimals = tokenData.find(x => x.name === "Decimals").value;
    const decimals = 18;
    const [data, setData] = useState([]);
    var [refresh, setRefresh] = useState(0);
    const web3 = useSelector((state) => state.web3Library);

    const callData = async () => {
        const accounts = await web3.eth.getAccounts();
        let dataTable = [];
        let rawBalance;
        try {
            rawBalance = await web3Token.methods
                .getAllStakeUser(accounts[0])
                .call();

            rawBalance.map((item, index) => {
                let obj = {
                    IDStake: item.IDStake,
                    balanceStakeOf: item.balanceStakeOf,
                    timeStartStake: item.timeStartStake,
                    durationUser: item.durationUser,
                    amountRewardClaimed: item.amountRewardClaimed,
                    totalReward: item.totalReward,
                };
                dataTable.push(obj);
            });
            setData(dataTable);
            console.log("rawBalance", dataTable);
        } catch (error) {
            console.log("error", error);
            return;
        }
    };

    useEffect(async () => {
        callData();
    }, [refresh]);

    const handleClaim = async (value) => {
        const accounts = await web3.eth.getAccounts();
        try {
            await web3Token.methods
                .claimReward(value.IDStake)
                .send({ from: accounts[0] });
            alert("successful");
        } catch (error) {
            alert(error);
            return;
        }
    };

    const handleWithdraw = async(value) => {
        const accounts = await web3.eth.getAccounts();
        try {
            await web3Token.methods
                .withdrawFulltime(value.IDStake)
                .send({ from: accounts[0] });
            alert("successful");
        } catch (error) {
            alert(error);
            return;
        }
    };

    const columns = [
        {
            title: "ID",
            dataIndex: "IDStake",
            width: "5%",
        },
        {
            title: "Total token stake",
            dataIndex: "balanceStakeOf",
            width: "10%",
        },
        {
            title: "Time start stake",
            dataIndex: "timeStartStake",
            width: "10%",
        },
        {
            title: "Duration",
            dataIndex: "durationUser",
            width: "10%",
        },
        {
            title: "Total reward claimed",
            dataIndex: "amountRewardClaimed",
            width: "10%",
        },
        {
            title: "Total reward",
            dataIndex: "totalReward",
            width: "10%",
        },
        {
            title: "Claim reward",
            render: (value) => (
                <Button
                    onClick={() => {
                        handleClaim(value);
                    }}
                >
                    Claim
                </Button>
            ),
        },
        {
            title: "Withdraw token",
            render: (value) => (
                <Button
                    onClick={() => {
                        handleWithdraw(value);
                    }}
                >
                    Withdraw
                </Button>
            ),
        },
    ];

    return (
        <div>
            <Table columns={columns} dataSource={data} />
        </div>
    );
};

export default GetAllStake;
