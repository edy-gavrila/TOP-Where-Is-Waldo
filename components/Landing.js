import Image from "next/image";
import React from "react";
import splashImage from "../assets/img/landing-splash-transparent.png";
import splashImageSmallScreen from "../assets/img/landing-splash-small-screen.jpg";
import Button from "./UI/Button";
import { useRouter } from "next/router";

function Landing() {
  const router = useRouter();

  const goToChooseGameHandler = () => {
    router.push("/choose-game");
  };
  return (
    <div className="bg-purple-500">
      <div className="container min-h-screen flex flex-col sm:flex-row  items-center justify-around">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl sm:text-4xl text-white mb-20 sm:mb-10">
            Where&apos;s That Thing?
          </h1>
          <Button
            title="play"
            classes="w-1/2"
            onClick={goToChooseGameHandler}
          />
        </div>
        <div className="w-0.5 sm:h-56 md:h-64 lg:h-80 xl:h-96 bg-purple-800 hidden sm:block"></div>
        <div className="hidden sm:block sm:w-1/3  items-center justify-center overflow-hidden rounded-md">
          <Image src={splashImage} alt="" layout="responsive" priority />
        </div>
        <div className="w-5/6  sm:hidden  items-center justify-center overflow-hidden rounded-full">
          <Image
            src={splashImageSmallScreen}
            alt=""
            layout="responsive"
            priority
          />
        </div>
      </div>
    </div>
  );
}

export default Landing;
