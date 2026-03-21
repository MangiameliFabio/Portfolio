"use client";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <footer className="relative z-10 bg-white pt-4 dark:bg-gray-dark md:pt-8 lg:pt-12">
        <div className="container">
          <div className="flex items-center justify-center text-center flex-col">
            <p className="max-w-[500px]">
              Wow! Glad you reached the bottom of my Website. You must have really liked it 😎<br/>
              Make sure to check out my socials and my{" "}
              <Link href="/all-projects" className="text-primary hover:underline">
                other projects
              </Link>
              !
            </p>       
            <div className="flex items-center mb-5 mt-3">
              <a
                href="https://www.linkedin.com/in/fabiomangiameli/"
                aria-label="social-link"
                target="_blank"
                rel="noopener noreferrer"
                className="mr-6 text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
              >
                <svg
                  width="27"
                  height="27"
                  viewBox="0 0 17 16"
                  className="fill-current"
                >
                  <path d="M15.2196 0H1.99991C1.37516 0 0.875366 0.497491 0.875366 1.11936V14.3029C0.875366 14.8999 1.37516 15.4222 1.99991 15.4222H15.1696C15.7943 15.4222 16.2941 14.9247 16.2941 14.3029V1.09448C16.3441 0.497491 15.8443 0 15.2196 0ZM5.44852 13.1089H3.17444V5.7709H5.44852V13.1089ZM4.29899 4.75104C3.54929 4.75104 2.97452 4.15405 2.97452 3.43269C2.97452 2.71133 3.57428 2.11434 4.29899 2.11434C5.02369 2.11434 5.62345 2.71133 5.62345 3.43269C5.62345 4.15405 5.07367 4.75104 4.29899 4.75104ZM14.07 13.1089H11.796V9.55183C11.796 8.7061 11.771 7.58674 10.5964 7.58674C9.39693 7.58674 9.222 8.53198 9.222 9.47721V13.1089H6.94792V5.7709H9.17202V6.79076H9.19701C9.52188 6.19377 10.2466 5.59678 11.3711 5.59678C13.6952 5.59678 14.12 7.08925 14.12 9.12897V13.1089H14.07Z" />
                </svg>
              </a>
              <a
                href="https://github.com/MangiameliFabio"
                aria-label="social-link"
                target="_blank"
                rel="noopener noreferrer"
                className="mr-6 text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
              >
                <svg 
                  className="fill-current" 
                  width="28" 
                  height="28" 
                  viewBox="0 -0.5 25 25"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="m12.301 0h.093c2.242 0 4.34.613 6.137 1.68l-.055-.031c1.871 1.094 3.386 2.609 4.449 4.422l.031.058c1.04 1.769 1.654 3.896 1.654 6.166 0 5.406-3.483 10-8.327 11.658l-.087.026c-.063.02-.135.031-.209.031-.162 0-.312-.054-.433-.144l.002.001c-.128-.115-.208-.281-.208-.466 0-.005 0-.01 0-.014v.001q0-.048.008-1.226t.008-2.154c.007-.075.011-.161.011-.249 0-.792-.323-1.508-.844-2.025.618-.061 1.176-.163 1.718-.305l-.076.017c.573-.16 1.073-.373 1.537-.642l-.031.017c.508-.28.938-.636 1.292-1.058l.006-.007c.372-.476.663-1.036.84-1.645l.009-.035c.209-.683.329-1.468.329-2.281 0-.045 0-.091-.001-.136v.007c0-.022.001-.047.001-.072 0-1.248-.482-2.383-1.269-3.23l.003.003c.168-.44.265-.948.265-1.479 0-.649-.145-1.263-.404-1.814l.011.026c-.115-.022-.246-.035-.381-.035-.334 0-.649.078-.929.216l.012-.005c-.568.21-1.054.448-1.512.726l.038-.022-.609.384c-.922-.264-1.981-.416-3.075-.416s-2.153.152-3.157.436l.081-.02q-.256-.176-.681-.433c-.373-.214-.814-.421-1.272-.595l-.066-.022c-.293-.154-.64-.244-1.009-.244-.124 0-.246.01-.364.03l.013-.002c-.248.524-.393 1.139-.393 1.788 0 .531.097 1.04.275 1.509l-.01-.029c-.785.844-1.266 1.979-1.266 3.227 0 .025 0 .051.001.076v-.004c-.001.039-.001.084-.001.13 0 .809.12 1.591.344 2.327l-.015-.057c.189.643.476 1.202.85 1.693l-.009-.013c.354.435.782.793 1.267 1.062l.022.011c.432.252.933.465 1.46.614l.046.011c.466.125 1.024.227 1.595.284l.046.004c-.431.428-.718 1-.784 1.638l-.001.012c-.207.101-.448.183-.699.236l-.021.004c-.256.051-.549.08-.85.08-.022 0-.044 0-.066 0h.003c-.394-.008-.756-.136-1.055-.348l.006.004c-.371-.259-.671-.595-.881-.986l-.007-.015c-.198-.336-.459-.614-.768-.827l-.009-.006c-.225-.169-.49-.301-.776-.38l-.016-.004-.32-.048c-.023-.002-.05-.003-.077-.003-.14 0-.273.028-.394.077l.007-.003q-.128.072-.08.184c.039.086.087.16.145.225l-.001-.001c.061.072.13.135.205.19l.003.002.112.08c.283.148.516.354.693.603l.004.006c.191.237.359.505.494.792l.01.024.16.368c.135.402.38.738.7.981l.005.004c.3.234.662.402 1.057.478l.016.002c.33.064.714.104 1.106.112h.007c.045.002.097.002.15.002.261 0 .517-.021.767-.062l-.027.004.368-.064q0 .609.008 1.418t.008.873v.014c0 .185-.08.351-.208.466h-.001c-.119.089-.268.143-.431.143-.075 0-.147-.011-.214-.032l.005.001c-4.929-1.689-8.409-6.283-8.409-11.69 0-2.268.612-4.393 1.681-6.219l-.032.058c1.094-1.871 2.609-3.386 4.422-4.449l.058-.031c1.739-1.034 3.835-1.645 6.073-1.645h.098-.005zm-7.64 17.666q.048-.112-.112-.192-.16-.048-.208.032-.048.112.112.192.144.096.208-.032zm.497.545q.112-.08-.032-.256-.16-.144-.256-.048-.112.08.032.256.159.157.256.047zm.48.72q.144-.112 0-.304-.128-.208-.272-.096-.144.08 0 .288t.272.112zm.672.673q.128-.128-.064-.304-.192-.192-.32-.048-.144.128.064.304.192.192.32.044zm.913.4q.048-.176-.208-.256-.24-.064-.304.112t.208.24q.24.097.304-.096zm1.009.08q0-.208-.272-.176-.256 0-.256.176 0 .208.272.176.256.001.256-.175zm.929-.16q-.032-.176-.288-.144-.256.048-.224.24t.288.128.225-.224z"/>
                </svg>
              </a>
              
              <a
                href="https://fabiomangiameli.itch.io"
                aria-label="social-link"
                target="_blank"
                rel="noopener noreferrer"
                className="text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
              >
                <svg className="fill-current" width="36" height="36" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 16 5 C 12.748 5 8.3121094 5.0508594 7.4121094 5.1308594 C 6.4021094 5.7368594 4.4028125 8.0309531 4.3828125 8.6269531 L 4.3828125 9.6269531 C 4.3828125 10.889953 5.5657188 12 6.6367188 12 C 7.9197187 12 8.9902344 10.929969 8.9902344 9.6679688 C 8.9902344 10.929969 10.0305 12 11.3125 12 C 12.6055 12 13.605469 10.930969 13.605469 9.6679688 C 13.605469 10.929969 14.695281 12 15.988281 12 L 16.009766 12 C 17.302766 12 18.392578 10.930969 18.392578 9.6679688 C 18.392578 10.929969 19.402547 12 20.685547 12 C 21.968547 12 23.009766 10.930969 23.009766 9.6679688 C 23.009766 10.929969 24.080281 12 25.363281 12 C 26.434281 12 27.615234 10.889953 27.615234 9.6269531 L 27.615234 8.6269531 C 27.595234 8.0309531 25.595938 5.7368594 24.585938 5.1308594 C 21.443938 5.0198594 19.252 5 16 5 z M 13.550781 11.742188 C 12.497781 13.552188 9.8523125 13.573906 8.8203125 11.753906 C 8.1903125 12.845906 6.7642969 13.267547 6.1542969 13.060547 C 5.9762969 14.959547 5.8534844 24.70875 7.1464844 26.34375 C 10.943484 27.22875 21.164516 27.20975 24.853516 26.34375 C 26.348516 24.81975 26.013703 14.821547 25.845703 13.060547 C 25.235703 13.267547 23.809453 12.845906 23.189453 11.753906 C 22.146453 13.573906 19.501219 13.552188 18.449219 11.742188 C 18.124219 12.332187 17.367 13.109375 16 13.109375 C 14.997 13.148375 14.051781 12.607187 13.550781 11.742188 z M 11.419922 14 C 12.219922 14 12.950078 14.000469 13.830078 14.980469 C 15.280078 14.830469 16.719922 14.830469 18.169922 14.980469 C 19.059922 14.010469 19.780078 14.009766 20.580078 14.009766 C 23.160078 14.009766 23.780937 17.819609 24.710938 21.099609 C 25.550938 24.149609 24.429062 24.230469 23.039062 24.230469 C 20.969062 24.150469 19.820313 22.650625 19.820312 21.140625 C 17.890313 21.460625 14.809688 21.580625 12.179688 21.140625 C 12.179688 22.650625 11.030938 24.150469 8.9609375 24.230469 C 7.5709375 24.230469 6.4490625 24.149609 7.2890625 21.099609 C 8.2190625 17.799609 8.8399219 14.009766 11.419922 14.009766 L 11.419922 14 z M 16 16.876953 C 16 16.876953 14.306 18.439375 14 18.984375 L 15.107422 18.943359 L 15.107422 19.910156 C 15.107422 19.968156 15.926 19.917969 16 19.917969 C 16.447 19.934969 16.892578 19.951156 16.892578 19.910156 L 16.892578 18.943359 L 18 18.984375 C 17.694 18.438375 16 16.876953 16 16.876953 z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="h-px w-full bg-linear-to-r from-transparent via-[#D2D8E183] to-transparent dark:via-[#959CB183]"></div>
          <div className="py-8">
            <p className="text-center text-base text-body-color dark:text-white">
              Template by{" "}
              <a
                href="http://uideck.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                UIdeck
              </a>{" "}
              and{" "}
              <a
                href="https://nextjstemplates.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                Next.js Templates
              </a>
            </p>
          </div>
        </div>
        <div className="absolute right-0 top-14 z-[-1]">
          <svg
            width="55"
            height="99"
            viewBox="0 0 55 99"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle opacity="0.8" cx="49.5" cy="49.5" r="49.5" fill="#959CB1" />
            <mask
              id="mask0_94:899"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="99"
              height="99"
            >
              <circle
                opacity="0.8"
                cx="49.5"
                cy="49.5"
                r="49.5"
                fill="#4A6CF7"
              />
            </mask>
            <g mask="url(#mask0_94:899)">
              <circle
                opacity="0.8"
                cx="49.5"
                cy="49.5"
                r="49.5"
                fill="url(#paint0_radial_94:899)"
              />
              <g opacity="0.8" filter="url(#filter0_f_94:899)">
                <circle cx="53.8676" cy="26.2061" r="20.3824" fill="white" />
              </g>
            </g>
            <defs>
              <filter
                id="filter0_f_94:899"
                x="12.4852"
                y="-15.1763"
                width="82.7646"
                height="82.7646"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="10.5"
                  result="effect1_foregroundBlur_94:899"
                />
              </filter>
              <radialGradient
                id="paint0_radial_94:899"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(49.5 49.5) rotate(90) scale(53.1397)"
              >
                <stop stopOpacity="0.47" />
                <stop offset="1" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </div>
        <div className="absolute bottom-24 left-0 z-[-1]">
          <svg
            width="79"
            height="94"
            viewBox="0 0 79 94"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              opacity="0.3"
              x="-41"
              y="26.9426"
              width="66.6675"
              height="66.6675"
              transform="rotate(-22.9007 -41 26.9426)"
              fill="url(#paint0_linear_94:889)"
            />
            <rect
              x="-41"
              y="26.9426"
              width="66.6675"
              height="66.6675"
              transform="rotate(-22.9007 -41 26.9426)"
              stroke="url(#paint1_linear_94:889)"
              strokeWidth="0.7"
            />
            <path
              opacity="0.3"
              d="M50.5215 7.42229L20.325 1.14771L46.2077 62.3249L77.1885 68.2073L50.5215 7.42229Z"
              fill="url(#paint2_linear_94:889)"
            />
            <path
              d="M50.5215 7.42229L20.325 1.14771L46.2077 62.3249L76.7963 68.2073L50.5215 7.42229Z"
              stroke="url(#paint3_linear_94:889)"
              strokeWidth="0.7"
            />
            <path
              opacity="0.3"
              d="M17.9721 93.3057L-14.9695 88.2076L46.2077 62.325L77.1885 68.2074L17.9721 93.3057Z"
              fill="url(#paint4_linear_94:889)"
            />
            <path
              d="M17.972 93.3057L-14.1852 88.2076L46.2077 62.325L77.1884 68.2074L17.972 93.3057Z"
              stroke="url(#paint5_linear_94:889)"
              strokeWidth="0.7"
            />
            <defs>
              <linearGradient
                id="paint0_linear_94:889"
                x1="-41"
                y1="21.8445"
                x2="36.9671"
                y2="59.8878"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0.62" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_94:889"
                x1="25.6675"
                y1="95.9631"
                x2="-42.9608"
                y2="20.668"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.51" />
              </linearGradient>
              <linearGradient
                id="paint2_linear_94:889"
                x1="20.325"
                y1="-3.98039"
                x2="90.6248"
                y2="25.1062"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0.62" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint3_linear_94:889"
                x1="18.3642"
                y1="-1.59742"
                x2="113.9"
                y2="80.6826"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.51" />
              </linearGradient>
              <linearGradient
                id="paint4_linear_94:889"
                x1="61.1098"
                y1="62.3249"
                x2="-8.82468"
                y2="58.2156"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0.62" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint5_linear_94:889"
                x1="65.4236"
                y1="65.0701"
                x2="24.0178"
                y2="41.6598"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.51" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </footer>
    </>
  );
};

export default Footer;
