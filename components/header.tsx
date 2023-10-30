import Image from 'next/image';
import Settings from '@/components/popup';
import { Dispatch, SetStateAction } from 'react';

type Props = {
    setMatchRules: Dispatch<
        SetStateAction<{ scoreCap: number; targetScore: number }>
    >;
    dark: boolean;
    setDark: Dispatch<SetStateAction<boolean>>;
};

const Header = ({ setMatchRules, dark, setDark }: Props) => {
    return (
        <header
            className={`w-full h-[60px] ${
                dark ? 'bg-slate-900 text-white' : 'bg-white text-black'
            }`}
        >
            <div className="max-w-[1200px] mx-auto h-full flex items-center justify-between">
                <div className="">
                    <Image
                        src="/pig_logo.png"
                        alt="logo"
                        width={80}
                        height={80}
                        className="inline-flex"
                    />
                    <span className="">GAME</span>
                </div>
                <Settings
                    setMatchRules={setMatchRules}
                    dark={dark}
                    setDark={setDark}
                />
            </div>
        </header>
    );
};

export default Header;
