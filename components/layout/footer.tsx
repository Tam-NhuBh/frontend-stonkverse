"use client"
import {
  footerCol1,
  footerCol2,
  footerCol3,
  footerCol4,
} from "@/data/footer-items";
import { FC, useEffect, useState } from "react";
import Link from "next/link";
import MailForm from "./mail-form";
import NextImage from "../next-image";
import { getIndexStock } from "@/lib/fetch-data";
import { FaArrowDown, FaArrowUp} from "react-icons/fa";
import { CircularProgress } from "@mui/material";
import { IoMdTrendingUp } from "react-icons/io";

interface Props { }

const Footer: FC<Props> = (): JSX.Element => {
  const [stockInfo, setStockInfo] = useState<{ symbol: string; close_price: number; change_percent: string } | null>(null);
  useEffect(() => {
    const fetchStockInfo = async () => {
      try {
        const data = await getIndexStock();
        setStockInfo(data);
      } catch (error) {
        console.error("Failed to fetch stock info:", error);
      }
    };

    fetchStockInfo();
  }, []);

  return (
    <footer className="bg-[#fbfafa] dark:bg-opacity-50 dark-bg border-t dark:border-slate-600">
      <div className="container flex flex-wrap gap-1 py-10 max-[1017px]:gap-3">

        <div className="w-1/3 pr-3 max-[1017px]:w-[50%] max-[717px]:w-full">
          <p className="footer-title">Stock E-Learning Online Courses Platform</p>
          <ul>
            {footerCol1.map((item, index) => (
              <li className="footer-item hover:font-normal" key={index}>
                <span className="font-bold text-[#7e7e7e]">
                  {item.title} :{" "}
                </span>
                {item.content}
              </li>
            ))}
          </ul>

          <p className="footer-title mt-12 max-[717px]:mt-6">Contact Us</p>
          <ul>
            {footerCol4.map((item, index) => (
              <li key={index} className="footer-item">
                <a href={item.link} className="flex items-center gap-1">
                  {item.icon({ size: 14 })} {item.title}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex item-center gap-2 my-3">
            <Link href="https://www.facebook.com/dhspkt.hcmute/" target="_blank" rel="noopener noreferrer">
              <div className="footer-icon">
                <NextImage
                  src="/assets/images/home-page/facebook.webp"
                  alt="Facebook"
                />
              </div>
            </Link>

            <Link href="https://www.youtube.com/@UTETVChannel" target="_blank" rel="noopener noreferrer">
              <div className="footer-icon">
                <NextImage
                  src="/assets/images/home-page/youtube.webp"
                  alt="Youtube"
                />
              </div>
            </Link>

            <Link href="https://www.instagram.com/dhspkt.hcmute/p/C1O8k7TpgRf/?img_index=1" target="_blank" rel="noopener noreferrer">
              <div className="footer-icon">
                <NextImage
                  src="/assets/images/home-page/instagram.webp"
                  alt="Instagram"
                />
              </div>
            </Link>
          </div>
        </div>

        {/* <div className="w-[18%] px-3 max-[717px]:w-[45%] max-[717px]:px-0">
          <p className="footer-title">Categories</p>
          <ul>
            {footerCol2.map((car, index) => (
              <li key={index} className="footer-item">
                <Link href={car.link}>{car.title}</Link>
              </li>
            ))}
          </ul>
        </div> */}


        <div className="w-[20%] px-3 max-[1017px]:w-[25%] max-[717px]:w-[45%] max-[717px]:px-0">
          <p className="footer-title">Policies</p>
          <ul>
            {footerCol3.map((item, index) => (
              <li key={index} className="footer-item">
                <Link href={item.link}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1">
          <p className="footer-title">Support</p>
          <MailForm />
        </div>
      </div>

      <div className="border-t dark:border-slate-700 py-1 fixed bottom-0 left-0 right-0 bg-white dark:bg-opacity-50 dark-bg ">
        <div className="container text-[#999999] text-xs flex items-center justify-between">
          <span className=" my-2 text-center">
            <div className="stock-info">
              {stockInfo ? (
                <div className="flex items-center text-black dark:text-white">
                  <IoMdTrendingUp/>
                  <span className="flex justify-center font-bold mx-2">{stockInfo.symbol}</span>
                  <span className="flex justify-center mx-1 glow">{stockInfo.close_price}</span>
                  <span className="flex justify-center mx-1 glow">{stockInfo.change_percent}%</span>
                  {parseFloat(stockInfo.change_percent) >= 0 ? (
                    <FaArrowUp className="text-green-500" />
                  ) : (
                    <FaArrowDown className="text-red-500" />
                  )}
                </div>
              ) : (
                <CircularProgress size={16} />
              )}
            </div>
          </span>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
