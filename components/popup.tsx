'use client';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dispatch, SetStateAction, useState } from 'react';
import { RiSettingsLine } from 'react-icons/ri';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';

type Props = {
    setMatchRules: Dispatch<
        SetStateAction<{
            scoreCap: number;
            targetScore: number;
        }>
    >;
    dark: boolean;
    setDark: Dispatch<SetStateAction<boolean>>;
};

const Popup = ({ setMatchRules, dark, setDark }: Props) => {
    const [score, setScore] = useState('');
    const [target, setTarget] = useState('');

    const setMatchRulesHandler = () => {
        const parsedScore = Number(score);
        const parsedTarget = Number(target);

        if (!score && !target) return;

        if (!isNaN(parsedScore) && !isNaN(parsedTarget)) {
            setMatchRules({
                scoreCap: Number(score) || 20,
                targetScore: Number(target) || 50,
            });
        }
    };

    return (
        <div className="">
            <Dialog>
                <DialogTrigger asChild>
                    <button
                        className={`flex px-4 py-2 ${
                            dark ? 'text-white' : 'text-black'
                        }`}
                    >
                        <RiSettingsLine className="space-x-2 text-2xl" />
                        <span>Settings</span>
                    </button>
                </DialogTrigger>
                <DialogContent className="w-[350px] lg:w-[500px]">
                    <DialogHeader>
                        <DialogTitle className="text-xl my-4">
                            Game Rules
                        </DialogTitle>
                        <DialogDescription className="space-y-4">
                            <Input
                                placeholder="Score Cap"
                                value={score}
                                className="rounded-none"
                                onChange={(e) => setScore(e.target.value)}
                            />
                            <Input
                                placeholder="Target"
                                value={target}
                                className="rounded-none"
                                onChange={(e) => setTarget(e.target.value)}
                            />
                        </DialogDescription>
                    </DialogHeader>
                    {/* <div className="grid gap-4 py-4"></div> */}
                    <Button
                        className="mb-4 rounded-none text-lg flex items-center space-x-2 bg-slate-600"
                        onClick={() => setDark((pv) => !pv)}
                    >
                        {dark ? (
                            <>
                                <BsFillSunFill />
                                <span>Light</span>
                            </>
                        ) : (
                            <>
                                <BsFillMoonFill />
                                <span>Dark</span>
                            </>
                        )}
                    </Button>
                    <DialogFooter className="">
                        <Button
                            className="rounded-none text-lg bg-indigo-400"
                            onClick={setMatchRulesHandler}
                        >
                            Save Changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Popup;
