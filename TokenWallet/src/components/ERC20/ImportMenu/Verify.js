import { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
// import Web3 from "web3/dist/web3.min.js";
// const web3 = new Web3(window.ethereum);
import { useSelector } from "react-redux";

const Verify = ({ web3Verify, amounts, nonce, sig, refreshDataGrid }) => {
  const { applyDecimals } = require("../../../utils/ethereumAPI");
  const web3 = useSelector((state) => state.web3Library);
  // const symbol = tokenData.find(x => x.name === "Symbol").value;
  // const decimals = tokenData.find(x => x.name === "Decimals").value;
  const decimals = 18;

  const [data, setData] = useState({
    arg1: "",
    arg2: "",
    errorMessage: "",
    successMessage: "",
    loading: false,
  });

  const onClickMint = async () => {
    setData({ ...data, loading: true });
    let errorMessage = "";
    let successMessage = "";

    try {
      const accounts = await web3.eth.getAccounts();
      const amountToSend = applyDecimals(amounts, decimals, "positive");
      console.log(accounts[0].toString(), "accounts[0].toString()");
      console.log(amountToSend, "amountToSend");
      console.log(nonce.toString(), "nonce.toString()");
      console.log(sig.v, "sig.v");
      console.log(sig.r, "sig.r");
      console.log(sig.s, "sig.s");
      // console.log(data.arg2, "data.arg2");
      await web3Verify.methods
        .rewardToken(
          accounts[0].toString(),
          amountToSend.toString(),
          nonce.toString(),
          sig.v,
          sig.r,
          sig.s
        )
        .send({ from: accounts[0] });
      successMessage = `Successful!`;
      refreshDataGrid();
    } catch (error) {
      errorMessage = error.message;
    }

    setData({ ...data, loading: false, errorMessage, successMessage });
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Button
          variant="contained"
          sx={{ m: 1 }}
          onClick={(e) => onClickMint()}
          disabled={data.loading}
        >
          {data.loading ? (
            <CircularProgress size={25} />
          ) : (
            `verifyAndRewardToken(
                address _player, 
                string memory _amount, 
                string memory _nonce, 
                uint8 v, 
                bytes32 r,
                bytes32 s)`
          )}
        </Button>
      </Grid>
      {/* <Grid item xs={12}>
                <TextField 
                    label="To"
                    sx={{ m: 1, width: '50ch' }}
                    size="small"
                    placeholder="0x"
                    onChange={(e) => setData({ ...data, arg1: e.target.value, errorMessage: '', successMessage: ''})}
                    InputLabelProps={{ shrink: true }}
                    disabled={data.loading}
                />
                <TextField 
                    label="Value"
                    sx={{ m: 1, width: '30ch' }}
                    size="small"
                    placeholder="1"
                    type="number"
                    onChange={(e) => setData({ ...data, arg2: e.target.value, errorMessage: '', successMessage: ''})}
                    InputLabelProps={{ shrink: true }}
                    disabed={data.loading}
                />
            </Grid> */}
      <Grid item xs={12}>
        {data.errorMessage && (
          <Alert
            severity="error"
            onClose={() => setData({ ...data, errorMessage: "" })}
          >
            {data.errorMessage}
          </Alert>
        )}
        {data.successMessage && (
          <Alert
            severity="success"
            onClose={() => setData({ ...data, successMessage: "" })}
          >
            {data.successMessage}
          </Alert>
        )}
      </Grid>
    </Grid>
  );
};

export default Verify;
