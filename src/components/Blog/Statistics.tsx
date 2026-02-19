import { Stat } from "@/types/blog";
import Link from "next/link";
import { Url } from "url";

const Statistics = ({ stat }: { stat: Stat}) => {
  const { orgaType, orgaName, game, date, duration, teamSize } = stat;
  return (
    <>
        <div className="lg:flex items-center">
          <div className="border-body-color/20 items-center lg:border-r lg:pr-5 pb-3 lg:pb-0">
            <p className="text-xs text-body-color md:text-sm">{orgaType}</p>
            <h4 className="text-sm text-black dark:text-white sm:text-md md:text-base">
              {orgaName}
            </h4>
          </div>
          <div className="border-body-color/20 items-center lg:border-r lg:px-5 pb-3 lg:pb-0">
            <p className="text-xs text-body-color md:text-sm">Game</p>
            <h4 className="text-sm text-black dark:text-white sm:text-md md:text-base">
              {game}
            </h4>
          </div>
          <div className="border-body-color/20 items-center lg:border-r lg:px-5 pb-3 lg:pb-0">
            <p className="text-xs text-body-color md:text-sm">Date</p>
            <h4 className="text-sm text-black dark:text-white sm:text-md md:text-base">
              {date}
            </h4>
          </div>
          <div className="border-body-color/20 items-center lg:border-r lg:px-5 pb-3 lg:pb-0">
            <p className="text-xs text-body-color md:text-sm">Duration</p>
            <h4 className="text-sm text-black dark:text-white sm:text-md md:text-base">
              {duration}
            </h4>
          </div>
          <div className="border-body-color/20 items-center lg:px-5 pb-4 lg:pb-0">
            <p className="text-xs text-body-color md:text-sm">Team Size</p>
            <h4 className="text-sm text-black dark:text-white sm:text-md md:text-base">
              {teamSize}
            </h4>
          </div>
        </div>
    </>
  );
};

export default Statistics;
