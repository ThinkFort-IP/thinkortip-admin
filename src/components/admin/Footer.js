"use client"
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <>  
            <footer className="bottom-0 left-0 w-full flex flex-col items-center justify-around w-full py-16 text-sm bg-slate-50 text-gray-800/70">
                <Image src='/logo.png' width={100} height={30} alt="ThinkFortIP Logo"/>
                <p className="mt-4 text-center">Copyright © 2026 <a href="https://admin.thinkfortip.com">ThinkFortIP</a>. All rights reservered.</p>
                <div className="flex items-center gap-4 mt-6">
                    <Link href="https://thinkfortip.com" className="font-medium text-gray-800 hover:text-black transition-all">
                        ThinkFortIP Portal
                    </Link>
                </div>
            </footer>
        </>
    );
};