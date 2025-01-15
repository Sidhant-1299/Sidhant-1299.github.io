import React from "react";
import sidhant from "../../assets/sidhant.png";
import { FaLinkedin } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";
import { FaTwitter } from "react-icons/fa";
import ProfileCardIcon from "./ProfileCardIcon";

function ProfileCard() {
  const name = "Sidhant Raj Khati";
  const intro = (
    <>
      A passionate Data Science and Analytics enthusiast with a knack for
      uncovering stories hidden within data to solve real-world problems.
    </>
  );
  const email = "sidhant.raj.khati@gmail.com";
  const twitter = "https://x.com/SidhantRajKhati";
  const linkedIn = "https://www.linkedin.com/in/sidhant-raj-khati-728086245/";

  return (
    <div
      className=" bg-white rounded-xl 
      h-96 w-48
    laptop:h-[50vh] laptop:w-[380px]
    "
    >
      {/* IMAGE */}
      <div
        className="
      laptop:h-3/5 w-full flex items-center justify-center laptop:pt-4"
      >
        <img
          src={sidhant}
          className="h-[92%] mx-auto my-auto w-[80%] rounded-xl 
          
          "
        ></img>
      </div>
      {/* Name */}
      <div className="h-2/5 w-full">
        <div className="laptop:h-2/5 w-full text-center laptop:pt-4">
          <span
            className="text-xl font-bold text-black 
          
          
          "
          >
            {name}
          </span>
        </div>
        <div className="h-3/5 laptop:w-full flex flex-col items-center justify-center">
          {/* Description */}
          <div className="laptop:h-3/5 laptop:w-full text-sm text-gray text-center laptop:px-5">
            {intro}
          </div>
          <div className="flex laptop:h-2/5 laptop:w-full justify-center items-center mx-auto">
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
  );
}

export default ProfileCard;
