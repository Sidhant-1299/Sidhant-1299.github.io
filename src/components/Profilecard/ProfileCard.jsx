import React from "react";
import { useState } from "react";
// import sidhant from "../../assets/sidhant.png";
// import sidhant from "../../assets/sidhant.webp";
import sidhant from "../../assets/sidhant_resized.webp";
import { FaLinkedin } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";
import { FaTwitter } from "react-icons/fa";
import ProfileCardIcon from "./ProfileCardIcon";
import { name, intro, email, twitter, linkedIn } from "../Data/ProfileCardData";
import useIntersectionObserver from "../../utils/useInterSectionObserver";

function ProfileCard() {
  const { ref, isVisible } = useIntersectionObserver();
  const [hasAnimated, setHasAnimated] = useState(false);

  if (isVisible && !hasAnimated) {
    setHasAnimated(true);
  }
  return (
    <div
      ref={ref}
      className={`laptop:fixed
      bg-whitenoise rounded-3xl
      mx-auto
      h-[490px] w-[90%]
      tablet:h-[500px] tablet:w-[80%]
      laptop:min-h-[560px] laptop:max-h-[575px] laptop:h-auto laptop:w-[360px] 
      desktop:min-h-[575px] desktop:max-h-[590px] desktop:h-auto
      desktop:w-[400px]

    ${hasAnimated ? "translate-y-2 opacity-100" : "-translate-y-2 opacity-0"}
    duration-500
    `}
    >
      <div
        className=" bg-graydark bg-opacity-[0.93] rounded-2xl
        pt-1 tablet:pt-2 laptop:pt-1
        h-full w-full pb-1
    laptop:pb-6 desktop:pb-2
    "
      >
        {/* IMAGE */}
        <div
          className="
          h-3/5
      desktop:h-[65%] w-full flex items-center justify-center
      laptop:pt-4 desktop:pt-3 tablet:pt-4"
        >
          <img
            src={sidhant}
            className="h-full mx-auto my-auto  rounded-xl mt-4
            laptop:w-[80%] desktop:w-[80%]

          "
          ></img>
        </div>
        {/* Name and descrption */}
        <div
          className="h-2/5 desktop:h-[35%] w-full
        mt-2 laptop:mt-0"
        >
          {/* NAME */}
          <div
            className="h-2/5 laptop:h-2/5
             w-full text-center
          pt-6 laptop:pt-6"
          >
            <span
              className="text-xl tablet:text-2xl  font-bold text-white
          "
            >
              {name}
            </span>
          </div>

          {/* DESCRIPTION AND LINK ICONS */}
          <div
            className="h-3/5 laptop:w-full flex flex-col items-center justify-center
            laptop:pt-2 desktop:pt-2"
          >
            {/* Description */}
            <div
              className="
            text-graylight
            h-3/5 laptop:h-3/5
            w-[95%] tablet:w-[85%] laptop:w-full
            desktop:w-[94%]
            text-xs tablet:text-sm
            px-4 laptop:px-5 text-justify py-1
            "
            >
              {intro}
            </div>
            {/* ICONS */}
            <div
              className="flex
             h-2/5 laptop:h-2/5
              laptop:w-full justify-center items-center mx-auto
            desktop:pb-4 pb-8 laptop:pb-0 
            pt-3 tablet:pt-0  laptop:pt-5 desktop:pt-4
            laptop:my-auto desktop:my-0"
            >
              <ProfileCardIcon icon={<FaLinkedin />} link={linkedIn} />
              <ProfileCardIcon
                icon={<MdMailOutline />}
                link={`mailto:${email}`}
              />
              <ProfileCardIcon icon={<FaTwitter />} link={twitter} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
