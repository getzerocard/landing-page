'use client';
import React from 'react';
import Link from 'next/link';
import CenteredLogo from '../components/CenteredLogo';
import Footer from '../components/layout/Footer';
import { Button } from '../components/buttons/Button';


export default function NotFound() {
    return (
        <>
            <div className="bg-white min-h-screen flex flex-col px-4 sm:px-6 relative overflow-hidden">
               <CenteredLogo className="mt-12 sm:mt-16" />
                <div className="flex-grow relative z-10 flex flex-col">
                 <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-[#40FF00] rounded-full filter blur-[100px] opacity-15 animate-blob"></div>
                </div>

                    {/* 404 Content */}
                    <div className="w-full max-w-[600px] px-4 sm:px-0 mx-auto pt-12 sm:pt-24 md:pt-32 flex flex-col items-center gap-6 sm:gap-8">
                        {/* 404 Number - Large and prominent */}
                        <div className="relative">
                            <h1 className=" font-bold text-[120px] sm:text-[160px] leading-none text-[#40FF00] opacity-20 select-none">
                                404
                            </h1>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <p className=" font-semibold text-[32px] sm:text-[68px] leading-[110%] text-[#515151] mb-2">
                                        Page Not Found
                                    </p>
                                    <p className=" font-medium text-[16px] sm:text-[18px] leading-[140%] text-[#606060] max-w-[400px] mb-2">
                                        Oops! It seems like this page doesn't exist or has been moved.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="text-center space-y-2 mt-8">
                            <p className=" font-medium text-[14px] sm:text-[16px] leading-[140%] text-[#666666]">
                                Don't worry, let's get you back on track. Here are some helpful links:
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto mt-6">
                            <Link href="/" className="w-full sm:w-auto">
                                <Button variant="primary" className="w-full sm:w-auto">
                                    Go Home
                                </Button>
                            </Link>
                            <button
                                onClick={() => window.history.back()}
                                className="w-full sm:w-auto px-5 py-3 rounded-full font-medium text-[14px] sm:text-sm leading-tight text-center transition-all whitespace-nowrap bg-white shadow-[0_8px_12px_rgba(0,0,0,0.1)] sm:shadow-[0_11px_12px_rgba(0,0,0,0.1)] text-secondary hover:shadow-[0_15px_15px_rgba(0,0,0,0.15)] hover:-translate-y-0.5"
                            >
                                Go Back
                            </button>
                        </div>

                        {/* Helpful Links */}
                        <div className="w-full mt-12 pt-8 border-t border-[#E0E0E0]">
                            <p className="font-medium text-[12px] sm:text-[14px] leading-[140%] text-[#919191] uppercase tracking-wide mb-6 text-center">
                                Explore More
                            </p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                                <Link
                                    href="/#features"
                                    className="flex items-center justify-center px-4 py-3 rounded-lg bg-[#F5F5F5] hover:bg-[#EBEBEB] transition-colors group"
                                >
                                    <span className="font-medium text-[16px] text-[#1F1F1F] group-hover:text-[#40FF00] transition-colors">
                                        Features
                                    </span>
                                </Link>
                                <Link
                                    href="/blog"
                                    className="flex items-center justify-center px-4 py-3 rounded-lg bg-[#F5F5F5] hover:bg-[#EBEBEB] transition-colors group"
                                >
                                    <span className="font-medium text-[16px] text-[#1F1F1F] group-hover:text-[#40FF00] transition-colors">
                                        Blog
                                    </span>
                                </Link>
                                <Link
                                    href="/privacy-policy"
                                    className="flex items-center justify-center px-4 py-3 rounded-lg bg-[#F5F5F5] hover:bg-[#EBEBEB] transition-colors group"
                                >
                                    <span className="font-medium text-[16px] text-[#1F1F1F] group-hover:text-[#40FF00] transition-colors">
                                        Privacy
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <Footer className="mt-16 sm:mt-20" />
            </div>
        </>
    );
}
