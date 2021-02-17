import React, { useState, useEffect } from "react";
import { get } from "lodash";
import { Game, User } from "../../../service/index";

import clear_img from "../../assets/img/native/icon-94.svg";

const Bet = ({betPopupHandler, sportEvent, wager, betHandler}) => {

    const [gameBalance, setGameBalance] = useState(null);
    const [amount, setAmount] = useState();
    const [winningAmount, setWinningAmount] = useState(0);
    const [count, setCount] = useState(6);

    useEffect(() => {
        Game.getSingleBalance({
            ...User.read(),
            gameid: "1201"
        })
        .promise
        .then(res => {
            console.log(res);
            setGameBalance(parseFloat(res.info).toFixed(2));
        })
        .catch(err => {
            setGameBalance(null);
        })
    }, [])

    useEffect(() => {
        const timer = setInterval(() => setCount(prev => prev > 0 ? prev - 1 : 5), 1000);
        return () => clearInterval(timer);
    }, [])

    const amountStyleHandler = (value) => {
        const balance = gameBalance ? gameBalance : 0;
        if (parseInt(balance) > parseInt(value))
            return false;
        else 
            return true;
    }

    const closeHandler = () => {
        setCount(6);
        setAmount("");
        setWinningAmount(0);
        betPopupHandler();
    }

    const amountOnchangeHandler = e => {
        const winning = (e.target.value * get(wager, "Odds", 0)) - e.target.value;
        setAmount(e.target.value);
        setWinningAmount(winning)
    }

    const quickTransferIn = () => {
        Game.quickTransferIn({
            ...User.read(),
            gameid: "1201"
        })
        .promise
        .then(res => {
            console.log(res);
        })
        .catch(err => {

        })
    }

    return (
        <div className="bet">
            <div>
                <div className="bet-data">
                    <div className="bet-competition">
                        <img />
                        <p>{get(sportEvent, "Competition.CompetitionName", "").replace("VS - ", "")}</p>
                    </div>
                    <div className="bet-teams">
                        <p>{get(sportEvent, "HomeTeam", "").replace("VS - ", "")}</p>
                        <p>VS</p>
                        <p>{get(sportEvent, "AwayTeam", "").replace("VS - ", "")}</p>
                    </div>
                    <div className="bet-odds">
                        <div>
                            <p>TEST</p>
                            <p>@ {get(wager, "Odds", "")}</p>
                            <p>{count}</p>
                        </div>
                        <div>
                            <p>TEST</p>
                        </div>
                    </div>
                    <div className="bet-numbers">
                        <div>
                            <p>限额 <span>10-16800</span></p>
                            <p>剩余金额 <span>{gameBalance ? gameBalance : "0.00"}</span></p>
                            <p>投注金额 （元）</p>
                        </div>
                        <div onClick={quickTransferIn}>
                            <p>一键转入</p>
                        </div>
                    </div>
                    <div className="bet-input">
                        <input 
                            type="number" 
                            placeholder="请输入金额"
                            value={amount}
                            onChange={amountOnchangeHandler}
                        />
                        <img src={clear_img} alt="Clear" />
                    </div>
                    <div className="bet-amounts">
                        <button 
                            disabled={amountStyleHandler(100)}
                            onClick={() => setAmount(100)}
                        >100</button>
                        <button 
                            disabled={amountStyleHandler(500)}
                            onClick={() => setAmount(500)}
                        >500</button>
                        <button 
                            disabled={amountStyleHandler(1000)}
                            onClick={() => setAmount(1000)}
                        >1000</button>
                        <button 
                            disabled={amountStyleHandler(2000)}
                            onClick={() => setAmount(2000)}
                        >2000</button>
                        <button  
                            disabled={amountStyleHandler(5000)}
                            onClick={() => setAmount(5000)}
                        >5000</button>
                        <button onClick={() => setAmount(gameBalance)}>可赢金额</button>
                    </div>
                    <div className="bet-balance">
                        <p>可赢金额: <span>{winningAmount.toFixed(2)}</span></p>
                        <p>自动接受任何赔率</p>
                    </div>
                </div>
                <div className="bet-btn" onClick={() => betHandler(amount)}>
                    <p>BET</p>
                </div>
            </div>
            <div className="bet-background" onClick={closeHandler}></div>
        </div>
    )
}

export default Bet;
