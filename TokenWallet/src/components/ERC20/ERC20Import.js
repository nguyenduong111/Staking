import { useState, useEffect } from "react";
import { Grid, Typography, Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import "./style.css";
import { ethers } from "ethers";

import BalanceOf from "./ImportMenu/BalanceOf";
import Transfer from "./ImportMenu/Transfer";
import ApproveList from "./ImportMenu/ApproveList";
import Allowance from "./ImportMenu/Allowance";
import Mint from "./ImportMenu/Mint";
import Approve from "./ImportMenu/Approve";
import Burn from "./ImportMenu/Burn";
import Web3 from "web3/dist/web3.min.js"; // webpack < 5
import AddMinter from "./ImportMenu/AddMinter";
import RemoveMinter from "./ImportMenu/RemoveMinter";
import MinterConsensus from "./ImportMenu/MinterConsensus";
import MinterReject from "./ImportMenu/MinterReject";
import MintConsensus from "./ImportMenu/MintConsensus";
import TransferFrom from "./ImportMenu/TransferFrom";
import { useSelector } from "react-redux";
import PayIn from "./ImportMenu/PayIn";
import Payout from "./ImportMenu/Payout";
import CheckTimeLock from "./ImportMenu/Checktimelock";
import ImportTokenAddress from "./ImportMenu/ImportTokenAddress";
import SetBeneficiaryAmounts from "./ImportMenu/SetBeneficiaryAmounts";
import SetTimesAndRate from "./ImportMenu/SetTimesAndRate";
import StartRelease from "./ImportMenu/StartRelease";
import CheckTime from "./ImportMenu/CheckTime";
import Release from "./ImportMenu/Release";

import Stake from "./ImportMenu/Stake";
import GetAllStake from "./ImportMenu/GetAllStake";
import ViewAmountBounsCurrent from "./ImportMenu/ViewAmountBounsCurrent";

import ViewTimeUntilWithDrawFullTime from "./ImportMenu/viewTimeUntilWithDrawFullTime";
import WithdrawFulltime from "./ImportMenu/WithdrawFulltime";
import ForceWithdraw from "./ImportMenu/ForceWithdraw";

import Verify from "./ImportMenu/Verify";

import RadioInput from "./ImportMenu/RadioInput";

const ERC20Import = () => {
    // let stakingAddress = "0x964E9fcf3DAA4669f6CF6af56ae0C4bD1e9cB4eb";
    // let tokenAddress = "0xFF22C0ef75d11292319Df33dCD2DF8b4aA870AfB";
    // let verifyAddress = "0x2D9fFA8D8BBD137A37531E8072Fc27DA437eC31e";
    // let timeLockAddress = "0xc2bf3a6e055a5B47A0c9Df125acf3ED5602C985a";
    var [acc, setAcc] = useState("");

    // console.log("tokenAddress", tokenAddress);
    const ERC20Token = require("./ERC20Token");
    // const TimeLockABI = require("./TimeLock");
    // const StakingABI = require("./Staking");
    // const VerifyABI = require("./Verify");

    // const { applyDecimals } = require("../../utils/ethereumAPI");

    const tokenA = require("./TokenA");
    const tokenB = require("./TokenB");
    const stake = require("./Staking");

    const addressTA = "0x583A0631c70584999f92fD64c31355B81b9dFE8d";
    const addressTB = "0xEF42d9038D3e1447f81Be76f483cD54835854C6A";
    const addressSK = "0xDB62AE7e3Dc0d52d5D5d1cc800ac2b58c9b88767";

    const web3 = useSelector((state) => state.web3Library);

    let web3TokenA = new web3.eth.Contract(tokenA, addressTA);
    let web3TokenB = new web3.eth.Contract(tokenB, addressTB);
    let web3Stake = new web3.eth.Contract(stake, addressSK);

    useEffect(async () => {
        let accCurrent = await web3.eth.getAccounts();
        setAcc(accCurrent);
    }, []);
    return (
        <div>
            <div>Address user: {acc}</div>
            <h2>
                #################################### Token A
                ####################################
            </h2>
            <div>Address token A: {addressTA}</div>
            <Box
                border={1}
                sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}
            >
                <Mint web3Token={web3TokenA} />
            </Box>
            <Box
                border={1}
                sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}
            >
                <BalanceOf web3Token={web3TokenA} />
            </Box>
            <Box
                border={1}
                sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}
            >
                <Approve web3Token={web3TokenA} />
            </Box>
            <h2>
                #################################### Token B
                ####################################
            </h2>
            <div>Address token B: {addressTB}</div>
            <Box
                border={1}
                sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}
            >
                <Mint web3Token={web3TokenB} />
            </Box>
            <Box
                border={1}
                sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}
            >
                <BalanceOf web3Token={web3TokenB} />
            </Box>
            <Box
                border={1}
                sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}
            >
                <Approve web3Token={web3TokenB} />
            </Box>
            <h2>
                #################################### Staking
                ####################################
            </h2>
            <div>Address stake: {addressSK}</div>
            <Box
                border={1}
                sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}
            >
                <Stake web3Token={web3Stake} />
            </Box>
            <GetAllStake web3Token={web3Stake} />
            <Box
                border={1}
                sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}
            >
                <ViewAmountBounsCurrent web3Token={web3Stake} />
            </Box>
            {/* <Box
                border={1}
                sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}
            > */}

            {/* </Box> */}
            {/* <div>Stake address: {stakingAddress}</div>
            <Box
                border={1}
                sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}
            >
                <Mint
                    web3Token={web3Token}
                    tokenData={tokenData}
                    refreshDataGrid={refreshDataGrid}
                />
            </Box>
            <Box
                border={1}
                sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}
            >
                <BalanceOf web3Token={web3Token} tokenData={tokenData} />
            </Box>
            <Box
                border={1}
                sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}
            >
                <Approve
                    web3Token={web3Token}
                    refreshDataGrid={refreshDataGrid}
                    tokenData={tokenData}
                />
            </Box>
            <Box
                border={1}
                sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}
            >
                <Allowance
                    web3Token={web3Token}
                    tokenData={tokenData}
                    refreshDataGrid={refreshDataGrid}
                />
            </Box>
            <div>------------------------------------------------------------------------------</div>
            <Box
                border={1}
                sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}
            >
                <Stake
                    web3Staking={web3Staking}
                    refreshDataGrid={refreshDataGrid}
                    tokenData={tokenData}
                />
            </Box>
            <Box
                border={1}
                sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}
            >
                <ViewTimeUntilWithDrawFullTime
                    web3Staking={web3Staking}
                    refreshDataGrid={refreshDataGrid}
                    tokenData={tokenData}
                />
            </Box>
            <Box
                border={1}
                sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}
            >
                <WithdrawFulltime
                    web3Staking={web3Staking}
                    refreshDataGrid={refreshDataGrid}
                    tokenData={tokenData}
                />
            </Box>
            <Box
                border={1}
                sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}
            >
                <ForceWithdraw
                    web3Staking={web3Staking}
                    refreshDataGrid={refreshDataGrid}
                    tokenData={tokenData}
                />
            </Box> */}
            {/* <Box
                border={1}
                sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}
            >
                <TransferFrom
                    web3Token={web3Token}
                    tokenData={tokenData}
                    refreshDataGrid={refreshDataGrid}
                />
            </Box> */}
            {/* <Box
                border={1}
                sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}
            >
                <SetBeneficiaryAmounts
                    web3Time={web3Time}
                    tokenAddress={tokenAddress}
                    refreshDataGrid={refreshDataGrid}
                />
            </Box>
            <Box
                border={1}
                sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}
            >
                <SetTimesAndRate
                    web3Time={web3Time}
                    tokenAddress={tokenAddress}
                    refreshDataGrid={refreshDataGrid}
                />
            </Box>
            <Box
                border={1}
                sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}
            >
                <StartRelease
                    web3Time={web3Time}
                    tokenAddress={tokenAddress}
                    refreshDataGrid={refreshDataGrid}
                />
            </Box>
            <Box
                border={1}
                sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}
            >
                <CheckTime
                    web3Time={web3Time}
                    tokenAddress={tokenAddress}
                    refreshDataGrid={refreshDataGrid}
                />
            </Box>
            <Box
                border={1}
                sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}
            >
                <Release
                    web3Time={web3Time}
                    tokenAddress={tokenAddress}
                    refreshDataGrid={refreshDataGrid}
                />
            </Box> */}
            {/* <Box
                border={1}
                sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}
            >
                <Burn
                    web3Token={web3Token}
                    tokenData={tokenData}
                    refreshDataGrid={refreshDataGrid}
                />
            </Box>
            <Box
                border={1}
                sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}
            >
                <BalanceOf web3Token={web3Token} tokenData={tokenData} />
            </Box>
            <Box
                border={1}
                sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}
            >
                <Transfer
                    web3Token={web3Token}
                    tokenData={tokenData}
                    refreshDataGrid={refreshDataGrid}
                />
            </Box>
            <Box
                border={1}
                sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}
            >
                <ApproveList
                    web3Token={web3Token}
                    tokenData={tokenData}
                    refreshDataGrid={refreshDataGrid}
                />
            </Box>
            <Box
                border={1}
                sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}
            >
                <Allowance
                    web3Token={web3Token}
                    tokenData={tokenData}
                    refreshDataGrid={refreshDataGrid}
                />
            </Box>
            <Box
                border={1}
                sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}
            >
                <Mint
                    web3Token={web3Token}
                    tokenData={tokenData}
                    refreshDataGrid={refreshDataGrid}
                />
            </Box>
            <Box
                border={1}
                sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}
            >
                <AddMinter
                    web3Token={web3Token}
                    tokenData={tokenData}
                    accMinterList={accMinterList}
                    refreshDataGrid={refreshDataGrid}
                />
            </Box>
            <Box
                border={1}
                sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}
            >
                <RemoveMinter
                    web3Token={web3Token}
                    tokenData={tokenData}
                    refreshDataGrid={refreshDataGrid}
                />
            </Box>
            <Box
                border={1}
                sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}
            >
                <MinterConsensus
                    web3Token={web3Token}
                    tokenData={tokenData}
                    listConsensus={listConsensus}
                    refreshDataGrid={refreshDataGrid}
                />
            </Box>
            <Box
                border={1}
                sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}
            >
                <MinterReject
                    web3Token={web3Token}
                    tokenData={tokenData}
                    listReject={listReject}
                    refreshDataGrid={refreshDataGrid}
                />
            </Box>
            <Box
                border={1}
                sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}
            >
                <MintConsensus
                    web3Token={web3Token}
                    tokenData={tokenData}
                    refreshDataGrid={refreshDataGrid}
                />
            </Box>
            <Box
                border={1}
                sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}
            >
                <Approve
                    web3Token={web3Token}
                    refreshDataGrid={refreshDataGrid}
                    tokenData={tokenData}
                />
            </Box>
            <Box
                border={1}
                sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}
            >
                <TransferFrom
                    web3Token={web3Token}
                    tokenData={tokenData}
                    refreshDataGrid={refreshDataGrid}
                />
            </Box>
            <Box
                border={1}
                sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}
            >
                <PayIn
                    web3Token={web3Token}
                    tokenData={tokenData}
                    refreshDataGrid={refreshDataGrid}
                />
            </Box>
            <Box
                border={1}
                sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}
            >
                <Payout
                    web3Token={web3Token}
                    tokenData={tokenData}
                    refreshDataGrid={refreshDataGrid}
                />
            </Box>
            <Box
                border={1}
                sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}
            >
                <CheckTimeLock
                    web3Token={web3Token}
                    tokenData={tokenData}
                    refreshDataGrid={refreshDataGrid}
                />
            </Box> */}
        </div>
    );
};

export default ERC20Import;
