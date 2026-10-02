"use client";



import React, { useRef } from "react";

import { motion, useScroll, useTransform } from "motion/react";

import { cn } from "@beforelogin/lib/utils";



import {

  IconBrightnessDown,

  IconBrightnessUp,

  IconCaretRightFilled,

  IconCaretUpFilled,

  IconChevronUp,

  IconMicrophone,

  IconMoon,

  IconPlayerSkipForward,

  IconPlayerTrackNext,

  IconPlayerTrackPrev,

  IconTable,

  IconVolume,

  IconVolume2,

  IconVolume3,

} from "@tabler/icons-react";



import { IconSearch } from "@tabler/icons-react";

import { IconWorld } from "@tabler/icons-react";

import { IconCommand } from "@tabler/icons-react";

import { IconCaretLeftFilled } from "@tabler/icons-react";

import { IconCaretDownFilled } from "@tabler/icons-react";



export const MacbookScroll = ({
    src,
    showGradient = false,
    title,
    badge,
}) => {
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end end"],
    });

    // 0.00 → 0.12 : lid opens
    // 0.12 → 0.72 : display image reveals
    // 0.72 → 1.00 : fully visible MacBook remains sticky
    const rotate = useTransform(
        scrollYProgress,
        [0, 0.12],
        [-25, 0]
    );

    const imageReveal = useTransform(
        scrollYProgress,
        [0.12, 0.72],
        [100, 0]
    );

    const imageOpacity = useTransform(
        scrollYProgress,
        [0.10, 0.16],
        [0, 1]
    );

    return (
        <section
            ref={ref}
            className="relative h-[300vh] w-full"
        >
            <div
    className="
        sticky
        top-[80px]
        flex
        h-[calc(100vh-80px)]
        w-full
        items-center
        justify-center
        [perspective:1400px]
    "
>
                {/* Overall MacBook size */}
                <div
                    className="
                        relative
                        flex
                        items-center
                        justify-center
                        scale-[0.55]
                        sm:scale-75
                        md:scale-100
                    "
                >
                    <div className="relative flex flex-col items-center">
                        <Lid
                            src={src}
                            rotate={rotate}
                            imageReveal={imageReveal}
                            imageOpacity={imageOpacity}
                        />

                        {/* BASE */}
                        <div
                            className="
                                relative
                                z-10
                                -mt-[1px]
                                h-[22rem]
                                w-[50rem]
                                overflow-hidden
                                rounded-b-2xl
                                rounded-t-lg
                                bg-gray-200
                                dark:bg-[#272729]
                            "
                        >
                            {/* Hinge */}
                            <div
                                className="
                                    absolute
                                    inset-x-0
                                    top-0
                                    z-30
                                    mx-auto
                                    h-4
                                    w-[80%]
                                    rounded-b-md
                                    bg-[#050505]
                                "
                            />

                            {/* Keyboard + speakers */}
                            <div
                                className="
                                    relative
                                    z-10
                                    flex
                                    pt-8
                                "
                            >
                                <div className="mx-auto h-full w-[10%] overflow-hidden">
                                    <SpeakerGrid />
                                </div>

                                <div className="mx-auto flex h-full w-[80%] justify-center">
                                    <div
                                        className="
                                            origin-top
                                            scale-[1.28]
                                        "
                                    >
                                        <Keypad />
                                    </div>
                                </div>

                                <div className="mx-auto h-full w-[10%] overflow-hidden">
                                    <SpeakerGrid />
                                </div>
                            </div>

                            {/* Trackpad */}
                            <Trackpad />

                            {/* Bottom hinge */}
                            <div
                                className="
                                    absolute
                                    inset-x-0
                                    bottom-0
                                    z-30
                                    mx-auto
                                    h-2
                                    w-20
                                    rounded-tl-3xl
                                    rounded-tr-3xl
                                    bg-gradient-to-t
                                    from-[#272729]
                                    to-[#050505]
                                "
                            />

                            {showGradient && (
                                <div
                                    className="
                                        absolute
                                        inset-x-0
                                        bottom-0
                                        z-50
                                        h-40
                                        w-full
                                        bg-gradient-to-t
                                        from-white
                                        via-white
                                        to-transparent
                                        dark:from-black
                                        dark:via-black
                                    "
                                />
                            )}

                            {badge && (
                                <div className="absolute bottom-4 left-4 z-50">
                                    {badge}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};


export const Lid = ({
    src,
    rotate,
    imageReveal,
    imageOpacity,
}) => {
    return (
        <motion.div
            style={{
                rotateX: rotate,
                transformOrigin: "bottom center",
                transformStyle: "preserve-3d",
            }}
            className="
                relative
                z-20
                h-[20rem]
                w-[50rem]
                rounded-2xl
                bg-[#010101]
                p-2
            "
        >
            {/* Outer bezel */}
            <div
                className="
                    absolute
                    inset-0
                    rounded-2xl
                    bg-[#010101]
                "
                style={{
                    boxShadow:
                        "0px 2px 0px 2px #171717 inset",
                }}
            />

            {/* Actual display */}
            <div
                className="
                    absolute
                    inset-2
                    z-10
                    overflow-hidden
                    rounded-lg
                    bg-[#111318]
                "
            >
                {/* Product image */}
                <motion.div
                    className="
                        absolute
                        inset-0
                        z-20
                        overflow-hidden
                    "
                    style={{
                        clipPath: useTransform(
                            imageReveal,
                            (value) =>
                                `inset(${value}% 0% 0% 0%)`
                        ),
                        opacity: imageOpacity,
                    }}
                >
                    <img
                        src={src}
                        alt="FYNDREX product interface"
                        draggable="false"
                        className="
                            block
                            h-full
                            w-full
                            object-fill
                            select-none
                        "
                    />
                </motion.div>

                {/* Display background */}
                <div
                    className="
                        absolute
                        inset-0
                        z-10
                        bg-gradient-to-br
                        from-[#151922]
                        via-[#0d1016]
                        to-[#080a0e]
                    "
                />

                {/* Screen reflection */}
                <div
                    className="
                        pointer-events-none
                        absolute
                        inset-0
                        z-30
                        bg-gradient-to-br
                        from-white/[0.04]
                        via-transparent
                        to-transparent
                    "
                />

                {/* Camera */}
                <div
                    className="
                        absolute
                        left-1/2
                        top-1
                        z-40
                        h-1
                        w-10
                        -translate-x-1/2
                        rounded-full
                        bg-black
                    "
                />
            </div>
        </motion.div>
    );
};


export const Trackpad = () => {

  return (

    <div

      className="mx-auto my-1 h-32 w-[40%] rounded-xl"

      style={{

        boxShadow: "0px 0px 1px 1px #00000020 inset",

      }}

    />

  );

};



export const Keypad = () => {

  return (

    <div className="mx-1 h-full [transform:translateZ(0)] rounded-md bg-[#050505] p-1 [will-change:transform]">

      {/* First Row */}

      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">

        <KBtn

          className="w-10 items-end justify-start pb-[2px] pl-[4px]"

          childrenClassName="items-start"

        >

          esc

        </KBtn>



        <KBtn>

          <IconBrightnessDown className="h-[6px] w-[6px]" />

          <span className="mt-1 inline-block">F1</span>

        </KBtn>



        <KBtn>

          <IconBrightnessUp className="h-[6px] w-[6px]" />

          <span className="mt-1 inline-block">F2</span>

        </KBtn>



        <KBtn>

          <IconTable className="h-[6px] w-[6px]" />

          <span className="mt-1 inline-block">F3</span>

        </KBtn>



        <KBtn>

          <IconSearch className="h-[6px] w-[6px]" />

          <span className="mt-1 inline-block">F4</span>

        </KBtn>



        <KBtn>

          <IconMicrophone className="h-[6px] w-[6px]" />

          <span className="mt-1 inline-block">F5</span>

        </KBtn>



        <KBtn>

          <IconMoon className="h-[6px] w-[6px]" />

          <span className="mt-1 inline-block">F6</span>

        </KBtn>



        <KBtn>

          <IconPlayerTrackPrev className="h-[6px] w-[6px]" />

          <span className="mt-1 inline-block">F7</span>

        </KBtn>



        <KBtn>

          <IconPlayerSkipForward className="h-[6px] w-[6px]" />

          <span className="mt-1 inline-block">F8</span>

        </KBtn>



        <KBtn>

          <IconPlayerTrackNext className="h-[6px] w-[6px]" />

          <span className="mt-1 inline-block">F8</span>

        </KBtn>



        <KBtn>

          <IconVolume3 className="h-[6px] w-[6px]" />

          <span className="mt-1 inline-block">F10</span>

        </KBtn>



        <KBtn>

          <IconVolume2 className="h-[6px] w-[6px]" />

          <span className="mt-1 inline-block">F11</span>

        </KBtn>



        <KBtn>

          <IconVolume className="h-[6px] w-[6px]" />

          <span className="mt-1 inline-block">F12</span>

        </KBtn>



        <KBtn>

          <div className="h-4 w-4 rounded-full bg-gradient-to-b from-neutral-900 from-20% via-black via-50% to-neutral-900 to-95% p-px">

            <div className="h-full w-full rounded-full bg-black" />

          </div>

        </KBtn>

      </div>



      {/* Second row */}

      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">

        <KBtn>

          <span className="block">\~</span>

          <span className="mt-1 block">`</span>

        </KBtn>



        <KBtn>

          <span className="block">!</span>

          <span className="block">1</span>

        </KBtn>



        <KBtn>

          <span className="block">@</span>

          <span className="block">2</span>

        </KBtn>



        <KBtn>

          <span className="block">#</span>

          <span className="block">3</span>

        </KBtn>



        <KBtn>

          <span className="block">$</span>

          <span className="block">4</span>

        </KBtn>



        <KBtn>

          <span className="block">%</span>

          <span className="block">5</span>

        </KBtn>



        <KBtn>

          <span className="block">^</span>

          <span className="block">6</span>

        </KBtn>



        <KBtn>

          <span className="block">&</span>

          <span className="block">7</span>

        </KBtn>



        <KBtn>

          <span className="block">\*</span>

          <span className="block">8</span>

        </KBtn>



        <KBtn>

          <span className="block">(</span>

          <span className="block">9</span>

        </KBtn>



        <KBtn>

          <span className="block">)</span>

          <span className="block">0</span>

        </KBtn>



        <KBtn>

          <span className="block">&mdash;</span>

          <span className="block">\_</span>

        </KBtn>



        <KBtn>

          <span className="block">+</span>

          <span className="block"> = </span>

        </KBtn>



        <KBtn

          className="w-10 items-end justify-end pr-[4px] pb-[2px]"

          childrenClassName="items-end"

        >

          delete

        </KBtn>

      </div>



      {/* Third row */}

      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">

        <KBtn

          className="w-10 items-end justify-start pb-[2px] pl-[4px]"

          childrenClassName="items-start"

        >

          tab

        </KBtn>



        <KBtn>

          <span className="block">Q</span>

        </KBtn>



        <KBtn>

          <span className="block">W</span>

        </KBtn>



        <KBtn>

          <span className="block">E</span>

        </KBtn>



        <KBtn>

          <span className="block">R</span>

        </KBtn>



        <KBtn>

          <span className="block">T</span>

        </KBtn>



        <KBtn>

          <span className="block">Y</span>

        </KBtn>



        <KBtn>

          <span className="block">U</span>

        </KBtn>



        <KBtn>

          <span className="block">I</span>

        </KBtn>



        <KBtn>

          <span className="block">O</span>

        </KBtn>



        <KBtn>

          <span className="block">P</span>

        </KBtn>



        <KBtn>

          <span className="block">{`{`}</span>

          <span className="block">{`[`}</span>

        </KBtn>



        <KBtn>

          <span className="block">{`}`}</span>

          <span className="block">{`]`}</span>

        </KBtn>



        <KBtn>

          <span className="block">{`|`}</span>

          <span className="block">{`\\\\`}</span>

        </KBtn>

      </div>



      {/* Fourth Row */}

      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">

        <KBtn

          className="w-[2.8rem] items-end justify-start pb-[2px] pl-[4px]"

          childrenClassName="items-start"

        >

          caps lock

        </KBtn>



        <KBtn>

          <span className="block">A</span>

        </KBtn>



        <KBtn>

          <span className="block">S</span>

        </KBtn>



        <KBtn>

          <span className="block">D</span>

        </KBtn>



        <KBtn>

          <span className="block">F</span>

        </KBtn>



        <KBtn>

          <span className="block">G</span>

        </KBtn>



        <KBtn>

          <span className="block">H</span>

        </KBtn>



        <KBtn>

          <span className="block">J</span>

        </KBtn>



        <KBtn>

          <span className="block">K</span>

        </KBtn>



        <KBtn>

          <span className="block">L</span>

        </KBtn>



        <KBtn>

          <span className="block">{`:`}</span>

          <span className="block">{`;`}</span>

        </KBtn>



        <KBtn>

          <span className="block">{`"`}</span>

          <span className="block">{`'`}</span>

        </KBtn>



        <KBtn

          className="w-[2.85rem] items-end justify-end pr-[4px] pb-[2px]"

          childrenClassName="items-end"

        >

          return

        </KBtn>

      </div>



      {/* Fifth Row */}

      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">

        <KBtn

          className="w-[3.65rem] items-end justify-start pb-[2px] pl-[4px]"

          childrenClassName="items-start"

        >

          shift

        </KBtn>



        <KBtn>

          <span className="block">Z</span>

        </KBtn>



        <KBtn>

          <span className="block">X</span>

        </KBtn>



        <KBtn>

          <span className="block">C</span>

        </KBtn>



        <KBtn>

          <span className="block">V</span>

        </KBtn>



        <KBtn>

          <span className="block">B</span>

        </KBtn>



        <KBtn>

          <span className="block">N</span>

        </KBtn>



        <KBtn>

          <span className="block">M</span>

        </KBtn>



        <KBtn>

          <span className="block">{`<`}</span>

          <span className="block">{`,`}</span>

        </KBtn>



        <KBtn>

          <span className="block">{`>`}</span>

          <span className="block">{`.`}</span>

        </KBtn>



        <KBtn>

          <span className="block">{`?`}</span>

          <span className="block">{`/`}</span>

        </KBtn>



        <KBtn

          className="w-[3.65rem] items-end justify-end pr-[4px] pb-[2px]"

          childrenClassName="items-end"

        >

          shift

        </KBtn>

      </div>



      {/* Sixth Row */}

      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">

        <KBtn

          className=""

          childrenClassName="h-full justify-between py-[4px]"

        >

          <div className="flex w-full justify-end pr-1">

            <span className="block">fn</span>

          </div>



          <div className="flex w-full justify-start pl-1">

            <IconWorld className="h-[6px] w-[6px]" />

          </div>

        </KBtn>



        <KBtn

          className=""

          childrenClassName="h-full justify-between py-[4px]"

        >

          <div className="flex w-full justify-end pr-1">

            <IconChevronUp className="h-[6px] w-[6px]" />

          </div>



          <div className="flex w-full justify-start pl-1">

            <span className="block">control</span>

          </div>

        </KBtn>



        <KBtn

          className=""

          childrenClassName="h-full justify-between py-[4px]"

        >

          <div className="flex w-full justify-end pr-1">

            <OptionKey className="h-[6px] w-[6px]" />

          </div>



          <div className="flex w-full justify-start pl-1">

            <span className="block">option</span>

          </div>

        </KBtn>



        <KBtn

          className="w-8"

          childrenClassName="h-full justify-between py-[4px]"

        >

          <div className="flex w-full justify-end pr-1">

            <IconCommand className="h-[6px] w-[6px]" />

          </div>



          <div className="flex w-full justify-start pl-1">

            <span className="block">command</span>

          </div>

        </KBtn>



        <KBtn className="w-[8.2rem]" />



        <KBtn

          className="w-8"

          childrenClassName="h-full justify-between py-[4px]"

        >

          <div className="flex w-full justify-start pl-1">

            <IconCommand className="h-[6px] w-[6px]" />

          </div>



          <div className="flex w-full justify-start pl-1">

            <span className="block">command</span>

          </div>

        </KBtn>



        <KBtn

          className=""

          childrenClassName="h-full justify-between py-[4px]"

        >

          <div className="flex w-full justify-start pl-1">

            <OptionKey className="h-[6px] w-[6px]" />

          </div>



          <div className="flex w-full justify-start pl-1">

            <span className="block">option</span>

          </div>

        </KBtn>



        <div className="mt-[2px] flex h-6 w-[4.9rem] flex-col items-center justify-end rounded-[4px] p-[0.5px]">

          <KBtn className="h-3 w-6">

            <IconCaretUpFilled className="h-[6px] w-[6px]" />

          </KBtn>



          <div className="flex">

            <KBtn className="h-3 w-6">

              <IconCaretLeftFilled className="h-[6px] w-[6px]" />

            </KBtn>



            <KBtn className="h-3 w-6">

              <IconCaretDownFilled className="h-[6px] w-[6px]" />

            </KBtn>



            <KBtn className="h-3 w-6">

              <IconCaretRightFilled className="h-[6px] w-[6px]" />

            </KBtn>

          </div>

        </div>

      </div>

    </div>

  );

};



export const KBtn = ({

  className,

  children,

  childrenClassName,

  backlit = true,

}) => {

  return (

    <div

      className={cn(

        "[transform:translateZ(0)] rounded-[4px] p-[0.5px] [will-change:transform]",

        backlit && "bg-white/[0.2] shadow-xl shadow-white"

      )}

    >

      <div

        className={cn(

          "flex h-6 w-6 items-center justify-center rounded-[3.5px] bg-[#0A090D]",

          className

        )}

        style={{

          boxShadow:

            "0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset",

        }}

      >

        <div

          className={cn(

            "flex w-full flex-col items-center justify-center text-[5px] text-neutral-200",

            childrenClassName,

            backlit && "text-white"

          )}

        >

          {children}

        </div>

      </div>

    </div>

  );

};



export const SpeakerGrid = () => {

  return (

    <div

      className="mt-2 flex h-40 gap-[2px] px-[0.5px]"

      style={{

        backgroundImage:

          "radial-gradient(circle, #08080A 0.5px, transparent 0.5px)",

        backgroundSize: "3px 3px",

      }}

    />

  );

};



export const OptionKey = ({ className }) => {

  return (

    <svg

      fill="none"

      version="1.1"

      id="icon"

      xmlns="http://www\.w3.org/2000/svg"

      viewBox="0 0 32 32"

      className={className}

    >

      <rect

        stroke="currentColor"

        strokeWidth={2}

        x="18"

        y="5"

        width="10"

        height="2"

      />



      <polygon

        stroke="currentColor"

        strokeWidth={2}

        points="10.6,5 4,5 4,7 9.4,7 18.4,27 28,27 28,25 19.6,25 "

      />



      <rect

        id="\_Transparent_Rectangle\_"

        className="st0"

        width="32"

        height="32"

        stroke="none"

      />

    </svg>

  );

};



const AceternityLogo = () => {

  return (

    <svg

      width="66"

      height="65"

      viewBox="0 0 66 65"

      fill="none"

      xmlns="http://www\.w3.org/2000/svg"

      className="h-3 w-3 text-white"

    >

      <path

        d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"

        stroke="currentColor"

        strokeWidth="15"

        strokeMiterlimit="3.86874"

        strokeLinecap="round"

      />

    </svg>

  );

};