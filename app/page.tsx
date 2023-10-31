'use client';
import { useEffect, useState } from 'react';
import {
    PiDiceOneBold,
    PiDiceTwoBold,
    PiDiceThreeBold,
    PiDiceFourBold,
    PiDiceFiveBold,
    PiDiceSixBold,
} from 'react-icons/pi';
import Alert from '@/components/alert';
import Header from '@/components/header';

type Dice = 1 | 2 | 3 | 4 | 5 | 6;

const Home = () => {
    const [isPlayerOneTurn, setIsPlayerOneTurn] = useState(true);
    const [dark, setDark] = useState(true);
    const [dice, setDice] = useState<Dice>(6);
    const [p1, setP1] = useState({
        name: 'player 1',
        score: 0,
        total: 0,
    });
    const [p2, setP2] = useState({
        name: 'player 2',
        score: 0,
        total: 0,
    });
    const [matchRules, setMatchRules] = useState({
        scoreCap: 12,
        targetScore: 50,
    });
    const [gameOver, setGameOver] = useState({
        state: false,
        msg: '',
    });

    const diceStyle = `text-6xl ${dark ? 'text-white' : 'text-black'}`;

    const diceMap = {
        1: <PiDiceOneBold className={diceStyle} />,
        2: <PiDiceTwoBold className={diceStyle} />,
        3: <PiDiceThreeBold className={diceStyle} />,
        4: <PiDiceFourBold className={diceStyle} />,
        5: <PiDiceFiveBold className={diceStyle} />,
        6: <PiDiceSixBold className={diceStyle} />,
    };

    const rollDice = () => {
        const diceVal = Math.floor(Math.random() * 6) + 1;
        setDice(diceVal as Dice);

        if (isPlayerOneTurn) {
            setP1((pv) => ({ ...pv, score: pv.score + diceVal }));
        } else {
            setP2((pv) => ({ ...pv, score: pv.score + diceVal }));
        }
    };

    const holdScore = () => {
        if (isPlayerOneTurn) {
            setP1((pv) => ({ ...pv, total: pv.total + pv.score, score: 0 }));
        } else {
            setP2((pv) => ({ ...pv, total: pv.total + pv.score, score: 0 }));
        }
        setIsPlayerOneTurn((pv) => !pv);
    };

    useEffect(() => {
        if (isPlayerOneTurn) {
            if (p1.score > matchRules.scoreCap) {
                setP1((pv) => ({ ...pv, score: 0 }));
                setIsPlayerOneTurn((pv) => !pv);
                return;
            }
        } else {
            if (p2.score > matchRules.scoreCap) {
                setP2((pv) => ({ ...pv, score: 0 }));
                setIsPlayerOneTurn((pv) => !pv);
                return;
            }
        }
    }, [p1.score, p2.score]);

    useEffect(() => {
        if (p1.total >= matchRules.targetScore) {
            setGameOver({ state: true, msg: 'Player 1 won' });
            setIsPlayerOneTurn(true);
            setP1({ name: 'player 1', score: 0, total: 0 });
            setP2({ name: 'player 2', score: 0, total: 0 });
        }
        if (p2.total >= matchRules.targetScore) {
            setGameOver({ state: true, msg: 'Player 2 won' });
            setIsPlayerOneTurn(true);
            setP1({ name: 'player 1', score: 0, total: 0 });
            setP2({ name: 'player 2', score: 0, total: 0 });
        }
    }, [p1.total, p2.total]);

    return (
        <div
            className={`relative w-screen h-screen flex flex-col items-center ${
                dark ? 'bg-slate-900 text-white' : 'bg-white text-black'
            }`}
        >
            {gameOver.state && (
                <Alert
                    msg={gameOver.msg}
                    setP1={setP1}
                    setP2={setP2}
                    setGameOver={setGameOver}
                    dark={dark}
                />
            )}

            {/* HEADER */}
            <Header
                setMatchRules={setMatchRules}
                dark={dark}
                setDark={setDark}
            />

            {/* GAME */}
            <div
                className={`max-w-[1200px] h-[calc(100vh-150px-60px)] mx-auto flex flex-col justify-center space-y-6`}
            >
                {/* PLAYER 1 */}
                <section
                    className={`w-[300px] lg:w-[500px] h-[250px] lg:h-[300px] text-xl lg:text-2xl font-semibold ring ${
                        isPlayerOneTurn
                            ? 'ring-green-400'
                            : `${dark ? 'ring-white' : 'ring-black'}`
                    }`}
                >
                    <div className="w-full h-[180px] lg:h-[200px] flex items-center justify-center space-x-2">
                        <p>current score</p>
                        <div
                            className={`p-8 text-2xl ${
                                dark ? 'bg-slate-700' : 'bg-slate-100'
                            }`}
                        >
                            <span
                                className={`${
                                    isPlayerOneTurn
                                        ? 'text-3xl text-green-400'
                                        : `${
                                              dark ? 'text-white' : 'text-black'
                                          }`
                                }`}
                            >
                                {p1.score}
                            </span>
                        </div>
                    </div>
                    <div className="flex justify-center space-x-4">
                        <p>player 1</p>
                        <p>total : {p1.total}</p>
                    </div>
                </section>

                {/* MIDDLE */}
                <section className="flex items-center space-x-4 mx-auto">
                    <button
                        className={`p-4 ring-2 text-lg font-semibold uppercase shadow focus:outline-none ${
                            dark
                                ? 'bg-white text-black active:bg-slate-200'
                                : 'bg-black text-white active:bg-slate-800'
                        }`}
                        onClick={rollDice}
                    >
                        roll
                    </button>
                    <div className="">{diceMap[dice]}</div>
                    <button
                        className={`p-4 ring-2 text-lg font-semibold uppercase shadow focus:outline-none ${
                            dark
                                ? 'bg-white text-black active:bg-slate-200'
                                : 'bg-black text-white active:bg-slate-800'
                        }`}
                        onClick={holdScore}
                    >
                        hold
                    </button>
                </section>

                {/* PLAYER 2 */}
                <section
                    className={`w-[300px] lg:w-[500px] h-[250px] lg:h-[300px] text-xl lg:text-2xl font-semibold ring ${
                        !isPlayerOneTurn
                            ? 'ring-green-400'
                            : `${dark ? 'ring-white' : 'ring-black'}`
                    }`}
                >
                    <div className="w-full h-[180px] lg:h-[200px] flex items-center justify-center space-x-2">
                        <p>current score</p>
                        <div
                            className={`p-8 text-2xl ${
                                dark ? 'bg-slate-700' : 'bg-slate-100'
                            }`}
                        >
                            <span
                                className={`${
                                    !isPlayerOneTurn
                                        ? 'text-3xl text-green-400'
                                        : `${
                                              dark ? 'text-white' : 'text-black'
                                          }`
                                }`}
                            >
                                {p2.score}
                            </span>
                        </div>
                    </div>
                    <div className="flex justify-center space-x-4">
                        <p>player 2</p>
                        <p>total : {p2.total}</p>
                    </div>
                </section>
            </div>

            {/* INFO */}
            <div className="w-full h-[150px]">
                <div
                    className={`max-w-[1200px] h-full mx-auto flex flex-col justify-center items-center text-3xl ${
                        dark ? 'text-white' : 'text-black'
                    }`}
                >
                    <p>score : {matchRules.scoreCap}</p>
                    <p>target : {matchRules.targetScore}</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
