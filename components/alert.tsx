import { Dispatch, SetStateAction } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from './ui/button';

type Props = {
    msg: string;
    setP1: Dispatch<
        SetStateAction<{
            name: string;
            score: number;
            total: number;
        }>
    >;
    setP2: Dispatch<
        SetStateAction<{
            name: string;
            score: number;
            total: number;
        }>
    >;
    setGameOver: Dispatch<
        SetStateAction<{
            state: boolean;
            msg: string;
        }>
    >;
    dark: boolean;
};

const alert = ({ msg, setP1, setP2, setGameOver, dark }: Props) => {
    const restart = () => {
        setP1({ name: 'player 1', score: 0, total: 0 });
        setP2({ name: 'player 2', score: 0, total: 0 });
        setGameOver({ msg: '', state: false });
    };
    return (
        <div className="w-full lg:w-[500px] h-[400px] lg:h-[410px] absolute top-[61%] lg:top-[59%] -translate-y-[50%]">
            <Alert
                className={`${
                    dark
                        ? 'border-none text-white bg-slate-700'
                        : 'bg-slate-100'
                }`}
            >
                <AlertTitle className="text-center text-2xl uppercase font-bold">
                    {msg}
                </AlertTitle>
                <AlertDescription className="text-center">
                    <Button
                        className="bg-violet-400 hover:bg-violet-500"
                        onClick={restart}
                    >
                        Play Again
                    </Button>
                </AlertDescription>
            </Alert>
        </div>
    );
};

export default alert;
