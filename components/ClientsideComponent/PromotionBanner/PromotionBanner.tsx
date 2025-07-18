"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { getCouponData } from "@/api/getBannerApi";
import { useSelector } from "react-redux";
import { selectToken } from "@/store/slices/authSlice";
import { Coupon } from "@/api/ApiCore";

const PromotionBanner = () => {
    const [isVisible, setIsVisible] = useState(true);  // Initially visible
    const [coupons, setCoupons] = useState<Coupon | undefined>(undefined);
    const [countdown, setCountdown] = useState<string>("");
    const token = useSelector(selectToken);

    const bannerImage: string = "/promobanner.jpg";

    useEffect(() => {
        const fetchCouponData = async () => {
            const res = await getCouponData(String(token));
            const homepageCoupons = res.data.find((c) => c.show_on_homepage);
            setCoupons(homepageCoupons);
        };

        if (token) {
            fetchCouponData();
        }
    }, [token]);

    useEffect(() => {
        // Calculate countdown based on coupon expiration date
        if (coupons?.expiresAt) {
            const interval = setInterval(() => {
                const targetDate = new Date(coupons.expiresAt);
                const currentDate = new Date();
                const difference = targetDate.getTime() - currentDate.getTime();

                if (difference <= 0) {
                    clearInterval(interval);
                    setCountdown("Expired");
                    return;
                }

                const days = Math.floor(difference / (1000 * 3600 * 24));
                const hours = Math.floor((difference % (1000 * 3600 * 24)) / (1000 * 3600));
                const minutes = Math.floor((difference % (1000 * 3600)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                setCountdown(`${days} | ${hours} | ${minutes} | ${seconds}`);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [coupons]);

    // Handle the copy to clipboard functionality
    const handleCopy = () => {
        if (coupons?.code) {
            navigator.clipboard.writeText(coupons.code).then(() => {
                alert("Coupon code copied to clipboard!");
            }).catch((err) => {
                alert("Failed to copy coupon code: " + err);
            });
        }
    };

    const handleClose = () => {
        setIsVisible(false); // Close the banner
    };

    if (!coupons || !isVisible) return null;  // Don't show if no coupon or hidden

    return (
        <div
            className={`fixed bottom-4 right-4 w-80 md:w-96 lg:w-112 transition-transform duration-700 ease-out transform z-50`}
        >
            <button
                onClick={handleClose}
                className="absolute -top-2 -left-2 bg-black bg-opacity-70 rounded-full p-1 text-white hover:bg-opacity-90 transition-colors z-50 shadow-md hover:cursor-pointer"
                aria-label="Close banner"
            >
                <X size={18} />
            </button>

            <div
                className="bg-white rounded-lg shadow-xl overflow-hidden"
                style={{
                    backgroundImage: `url(${bannerImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <div className="relative p-4 text-white flex flex-col justify-between h-full min-h-[240px]">
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>

                    <div className="relative z-10 flex flex-col justify-end h-full mt-2">
                        <p className="text-sm font-medium mb-1">Limited Time Offer!</p>
                        <h3 className="text-xl font-bold mb-2">{coupons.name}</h3>
                        <p className="text-xs">Grab your favorites before time runs out.</p>

                        {/* Countdown Display */}
                        <div className="mt-4 flex items-center self-start gap-x-4 mb-3">
                            {countdown.split(" | ").map((timePart, index, arr) => (
                                <React.Fragment key={index}>
                                    <div className="flex flex-col items-center">
                                        <span className="text-xl md:text-2xl font-bold text-white leading-none">
                                            {timePart}
                                        </span>
                                        <span className="text-xs uppercase mt-1 text-gray-300">
                                            {index === 0
                                                ? "Days"
                                                : index === 1
                                                    ? "Hours"
                                                    : index === 2
                                                        ? "Minutes"
                                                        : "Seconds"}
                                        </span>
                                    </div>
                                    {index < arr.length - 1 && (
                                        <span className="h-6 w-px bg-gray-300 mx-1"></span>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>

                        {/* Coupon Code Section */}
                        {/* <div className="mt-4 flex justify-between items-center">
                            <p className="text-lg font-bold text-white">{coupons.code}</p>
                            <button
                                onClick={handleCopy}
                                className="px-3 py-1 text-sm font-semibold text-white bg-gray-800 rounded-md"
                            >
                                Copy Code
                            </button>
                        </div> */}

                        {/* Shop Now Button */}
                        <Link href="/shop" passHref>
                            <button
                                style={{ backgroundColor: "#203b67" }}
                                className="mt-4 px-4 py-1 text-white font-semibold rounded-md shadow-lg
                                   focus:outline-none focus:ring-2 focus:ring-[#203b67] focus:ring-offset-2 self-start"
                            >
                                Shop Now
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PromotionBanner;
