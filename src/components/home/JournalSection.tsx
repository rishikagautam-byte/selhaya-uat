"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { fetchJournalOrder } from "../../data/wordpressApi";

export interface JournalItem {
  key?: string;
  title: string;
  num?: string;
  desc: string | React.ReactNode;
  link: string;
  img: string;
  alt: string;
}

interface JournalSectionProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  items?: JournalItem[];
  bgColor?: string;
  textColor?: string;
  cardImageBg?: string;
  rigthDescWidth?: string;
}

const defaultJournalItems: JournalItem[] = [
  {
    key: "journal-1",
    title: "The Journal",
    num: "1/3",
    desc: <p> <span className="uppercase">The Vision. The Craft. The Story.</span> <br /> Experience the unforgettable process of creation.</p>,
    link: "/journal",
    img: "/images/home/journal1.png",
    alt: "The Craft"
  },
  {
    key: "journal-2",
    title: "Recognition",
    num: "2/3",
    desc: <p>The impact of SELHAYA. From the beginning of the{" "}<br className="hidden md:block" />{" "}journey.</p>,
    link: "/press-and-recognition",
    img: "/images/home/journal2.png",
    alt: "The Cultural Alliance"
  },
  {
    key: "journal-3",
    title: "Advisory",
    num: "3/3",
    desc: <p>The consultation. Tailored advice for you from{" "}<br className="hidden md:block" />{" "}SELHAYA founders. </p>,
    link: "/advisory",
    img: "/images/advisory/advisoryHero.png",
    alt: "Advisory"
  }
];

export default function JournalSection({
  title = (
    <>
      The House of SELHAYA
    </>
  ),
  description = "A unique understanding of creation and careful process. ",
  items = defaultJournalItems,
  bgColor = "bg-choclate-brown",
  textColor = "text-primary-light",
  cardImageBg = "bg-primary-light",
  rigthDescWidth = "1/2"
}: JournalSectionProps) {

  const [orderedItems, setOrderedItems] = useState<JournalItem[]>(items);

  useEffect(() => {
    async function loadOrder() {
      try {
        const orderData = await fetchJournalOrder();
        if (orderData && orderData.length > 0) {
          const sortedItems = [...items].sort((a, b) => {
            const orderA = orderData.find(o => o.key === a.key)?.order ?? 999;
            const orderB = orderData.find(o => o.key === b.key)?.order ?? 999;
            return orderA - orderB;
          });
          setOrderedItems(sortedItems);
        } else {
          setOrderedItems(items);
        }
      } catch (error) {
        setOrderedItems(items);
      }
    }
    
    loadOrder();
  }, [items]);

  return (
    <section className={`w-full ${bgColor} ${textColor} px-6 py-10 md:py-24 overflow-hidden`}>
      {/* Header - consistent across all views */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-4 lg:px-24 mb-4">
        <h2 className="text-[28px] lg:text-[32px] w-full md:w-[55%]">
          {title}
        </h2>
        <div className={`w-full md:w-${rigthDescWidth} flex md:justify-end`}>
          <div className="text-[16px] md:text-[20px] lg:max-w-[65%] font-extralight">
            {typeof description === 'string' ? <p>{description}</p> : description}
          </div>
        </div>
      </div>

      {/* Desktop View (sm and up) */}
      <div className="hidden sm:grid sm:grid-cols-3 gap-8 md:gap-6  lg:px-24">
        {orderedItems.map((item, index) => (
          <Link
            key={index} className="flex flex-col h-full space-y-4 group cursor-pointer"
            to={item.link}
          >
            <div className={`overflow-hidden ${cardImageBg}`}>
              <img
                src={item.img}
                alt={item.alt}
                draggable="false"
                className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col flex-grow space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-[20px] lg:text-[24px]">{item.title}</h3>
                {item.num && <p className="sm:hidden text-[16px]">{item.num}</p>}
              </div>  
              <div className="text-[16px] md:h-20 lg:h-14 font-light">{item.desc}</div>
              <span
                className="inline-block text-[16px] uppercase underline underline-offset-4 hover:scale-105 transition-transform duration-700"
              >
                ENTER
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Mobile View  */}
      <div className="block sm:hidden w-full relative">
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          className="journal-swiper"
        >
          {orderedItems.map((item, index) => (
            <SwiperSlide key={index}>
              <Link to={item.link} className="flex flex-col space-y-6 group cursor-pointer">
                <div
                  className={`aspect-4/5 overflow-hidden ${cardImageBg}`}
                >
                  <img
                    src={item.img}
                    alt={item.alt}
                    draggable="false"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="text-[24px]">
                      {item.title}
                    </h3>

                    <p className="text-[16px]">
                      {index + 1}/{orderedItems.length}
                    </p>
                  </div>

                  <div className="text-[16px]">
                    {item.desc}
                  </div>
                  <span className="inline-block text-[16px] uppercase underline underline-offset-4 hover:opacity-70 transition-opacity">
                    ENTER
                  </span>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}