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

type Props = {
    scoreCap: number;
    targetScore: number;
    setMatchRules: Dispatch<
        SetStateAction<{
            scoreCap: number;
            targetScore: number;
        }>
    >;
};

const Popup = ({ scoreCap, targetScore, setMatchRules }: Props) => {
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
        <div className="absolute top-4 right-4">
            <Dialog>
                <DialogTrigger asChild>
                    <button className="px-4 py-2 bg-slate-100">Settings</button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="my-4">Game Rules</DialogTitle>
                        <DialogDescription className="space-y-4">
                            <Input
                                placeholder="Score Cap"
                                value={score}
                                onChange={(e) => setScore(e.target.value)}
                            />
                            <Input
                                placeholder="Target"
                                value={target}
                                onChange={(e) => setTarget(e.target.value)}
                            />
                            <br />
                            <br />
                            <span className="flex flex-col items-center text-2xl text-white">
                                <span>Score cap - {scoreCap}</span>
                                <span>Target - {targetScore}</span>
                            </span>
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4"></div>
                    <DialogFooter>
                        <Button onClick={setMatchRulesHandler}>
                            Save Changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Popup;
