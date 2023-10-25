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
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Alert from '@/components/alert';

type Dice = 1 | 2 | 3 | 4 | 5 | 6;

const Home = () => {
    const [isPlayerOneTurn, setIsPlayerOneTurn] = useState(true);
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
        scoreCap: 20,
        targetScore: 50,
    });
    const [gameOver, setGameOver] = useState({
        state: false,
        msg: '',
    });

    const diceStyle = 'text-6xl text-white';
    const Settings = dynamic(() => import('@/components/popup'));

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
        <div className="relative w-screen h-screen flex flex-col items-center justify-center bg-slate-900">
            {gameOver.state && (
                <Alert
                    msg={gameOver.msg}
                    setP1={setP1}
                    setP2={setP2}
                    setGameOver={setGameOver}
                />
            )}

            <div className="absolute top-2 left-2 flex items-center">
                <Image src="/pig_logo.png" alt="logo" width={80} height={80} />
                <span className="absolute left-16 text-white">GAME</span>
            </div>
            <Settings
                scoreCap={matchRules.scoreCap}
                targetScore={matchRules.targetScore}
                setMatchRules={setMatchRules}
            />
            <section
                className={`w-2/3 lg:w-[500px] h-[300px] p-4 text-2xl font-semibold rounded-lg flex flex-col items-center justify-center space-y-4 capitalize text-white bg-slate-800 ${
                    isPlayerOneTurn && 'shadow-2xl ring ring-teal-200'
                }`}
            >
                <h4 className="text-4xl tracking-wide">{p1.name}</h4>
                <p>
                    score -{' '}
                    <span
                        className={`${
                            isPlayerOneTurn && 'text-3xl text-teal-200'
                        }`}
                    >
                        {p1.score}
                    </span>
                </p>
                <p className="">total - {p1.total}</p>
            </section>
            <br />

            <section className="flex items-center space-x-4">
                <button
                    className="p-4 ring-2 text-lg font-semibold uppercase shadow focus:outline-none bg-white active:bg-slate-200"
                    onClick={rollDice}
                >
                    roll
                </button>
                <div className="">{diceMap[dice]}</div>
                <button
                    className="p-4 ring-2 text-lg font-semibold uppercase shadow focus:outline-none bg-white active:bg-slate-200"
                    onClick={holdScore}
                >
                    hold
                </button>
            </section>

            <br />
            <section
                className={`w-2/3 lg:w-[500px] h-[300px] p-4 text-2xl font-semibold rounded-lg flex flex-col items-center justify-center space-y-4 capitalize text-white bg-slate-800 ${
                    !isPlayerOneTurn && 'shadow-2xl ring ring-teal-200'
                }`}
            >
                <h4 className="text-4xl">{p2.name}</h4>
                <p>
                    score -{' '}
                    <span
                        className={`${
                            !isPlayerOneTurn && 'text-3xl text-teal-200'
                        }`}
                    >
                        {p2.score}
                    </span>
                </p>
                <p>total - {p2.total}</p>
            </section>
        </div>
    );
};

export default Home;
