import { Stat } from "@/types/blog";

const Statistics = ({ stat }: { stat: Stat }) => {
  const { orgaType, orgaName, game, date, duration, teamSize } = stat;
  return (
    <>
      <div className="border-body-color/20 items-center lg:flex">
        <div className="border-body-color/20 items-center pb-3 lg:border-r lg:pr-5 lg:pb-0">
          <p className="text-xs text-body-color md:text-sm">{orgaType}</p>
          <h4 className="text-sm text-black dark:text-white md:text-base">
            {orgaName}
          </h4>
        </div>
        <div className="border-body-color/20 items-center pb-3 lg:border-r lg:px-5 lg:pb-0">
          <p className="text-xs text-body-color md:text-sm">Game</p>
          <h4 className="text-sm text-black dark:text-white md:text-base">
            {game}
          </h4>
        </div>
        <div className="border-body-color/20 items-center pb-3 lg:border-r lg:px-5 lg:pb-0">
          <p className="text-xs text-body-color md:text-sm">Date</p>
          <h4 className="text-sm text-black dark:text-white md:text-base">
            {date}
          </h4>
        </div>
        <div className="border-body-color/20 items-center pb-3 lg:border-r lg:px-5 lg:pb-0">
          <p className="text-xs text-body-color md:text-sm">Duration</p>
          <h4 className="text-sm text-black dark:text-white md:text-base">
            {duration}
          </h4>
        </div>
        <div className="items-center pb-4 lg:px-5 lg:pb-0">
          <p className="text-xs text-body-color md:text-sm">Team Size</p>
          <h4 className="text-sm text-black dark:text-white md:text-base">
            {teamSize}
          </h4>
        </div>
      </div>
    </>
  );
};

export default Statistics;
