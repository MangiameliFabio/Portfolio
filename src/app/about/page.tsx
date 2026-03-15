import FavoriteGamesCarousel from "@/components/About/FavoriteGamesCarousel";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about me, my game development journey, favorite games, and social links.",
};

const AboutPage = () => {
  return (
    <main className="overflow-hidden pt-12 md:pt-14 lg:pt-16">
      <section className="pb-14 pt-10 md:pb-20">
        <div className="container">
          <div className="flex justify-center xl:justify-start">
            <div className="w-70 min-w-[300px]  hidden xl:block">
               <img src="/images/portfolio/fabio_profile_picture.jpg" className="rounded-full"></img>
            </div>
            <div className="max-w-3xl text-center xl:text-left mx-auto xl:mx-10">
              <h1 className="mt-4 text-4xl font-black text-white sm:text-5xl lg:text-6xl">
                Game developer by day, Gamer by heart
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-body-color-dark mx-auto xl:mx-0">
                I am Fabio Mangiameli, a game developer with a strong focus on the technical side of games. I enjoy programming new gameplay features as well as building whole systems from the ground up. I am also interested in simulations and in creating helpful tools that make work easier for my team.
              </p>
            </div>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 shadow-two backdrop-blur-sm md:p-10">
              <h2 className="text-2xl font-bold text-white">
                My game dev journey
              </h2>
              <div className="mt-6 space-y-5 text-base leading-8 text-body-color-dark">
                <p>
                  My path into game development probably started with my
                  curiosity for video games. When I was 6 years old, I started
                  playing educational games from a famous German TV series
                  called &quot;Löwenzahn&quot;. From that point on, I always wanted
                  to try out new games. I played all the Lego games, Ice Age,
                  Donkey Kong Country Returns, and basically everything I could
                  get my hands on.
                </p>
                <p>
                  At some point, I started thinking seriously about the
                  possibility of building a career in game development. Even
                  though I had already finished an education and gained work
                  experience as a draftsperson, I decided to try something
                  completely new and went to university to study computer
                  science with a focus on game development. That was where I
                  truly realized how much I cared about this path.
                </p>
                <p>
                  I studied at the Stuttgart Media University and completed my
                  bachelor&apos;s degree in computer science there. During that
                  time, I took my first real steps in engines like Unreal
                  Engine 4 and Godot. That was also when I became sure that I
                  wanted to fully commit to game development. After finishing my
                  bachelor&apos;s, I wanted to continue with a master&apos;s in games
                  while also working part-time as a developer to gain real
                  industry experience. That is why I started my master&apos;s
                  degree at the IT University of Copenhagen and joined the indie
                  studio Chasing Carrots. Moving to Copenhagen also fulfilled a
                  personal dream of mine. I wanted the adventure of living in a
                  new country, discovering a new city, and meeting new people.
                  At Chasing Carrots, I gained a lot of valuable technical
                  experience that I am truly thankful for.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 shadow-two md:p-10 mb-auto">
              <h2 className="text-2xl font-bold text-white">Social links</h2>
              <p className="mt-4 max-w-md text-base leading-7 text-body-color-dark">
                If you want to connect, see my work, or follow what I am
                building, these are the best places to find me.
              </p>

              <div className="mt-8 space-y-5">
                <a
                  href="https://www.linkedin.com/in/fabiomangiameli/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[64px] flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-body-color-dark transition hover:border-primary hover:text-white"
                >
                  <svg
                    width="27"
                    height="27"
                    viewBox="0 0 17 16"
                    className="shrink-0 fill-current"
                  >
                    <path d="M15.2196 0H1.99991C1.37516 0 0.875366 0.497491 0.875366 1.11936V14.3029C0.875366 14.8999 1.37516 15.4222 1.99991 15.4222H15.1696C15.7943 15.4222 16.2941 14.9247 16.2941 14.3029V1.09448C16.3441 0.497491 15.8443 0 15.2196 0ZM5.44852 13.1089H3.17444V5.7709H5.44852V13.1089ZM4.29899 4.75104C3.54929 4.75104 2.97452 4.15405 2.97452 3.43269C2.97452 2.71133 3.57428 2.11434 4.29899 2.11434C5.02369 2.11434 5.62345 2.71133 5.62345 3.43269C5.62345 4.15405 5.07367 4.75104 4.29899 4.75104ZM14.07 13.1089H11.796V9.55183C11.796 8.7061 11.771 7.58674 10.5964 7.58674C9.39693 7.58674 9.222 8.53198 9.222 9.47721V13.1089H6.94792V5.7709H9.17202V6.79076H9.19701C9.52188 6.19377 10.2466 5.59678 11.3711 5.59678C13.6952 5.59678 14.12 7.08925 14.12 9.12897V13.1089H14.07Z" />
                  </svg>
                  <span className="break-all">
                    https://www.linkedin.com/in/fabiomangiameli/
                  </span>
                </a>

                <a
                  href="https://github.com/MangiameliFabio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[64px] flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-body-color-dark transition hover:border-primary hover:text-white"
                >
                  <svg
                    className="shrink-0 fill-current"
                    width="28"
                    height="28"
                    viewBox="0 -0.5 25 25"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m12.301 0h.093c2.242 0 4.34.613 6.137 1.68l-.055-.031c1.871 1.094 3.386 2.609 4.449 4.422l.031.058c1.04 1.769 1.654 3.896 1.654 6.166 0 5.406-3.483 10-8.327 11.658l-.087.026c-.063.02-.135.031-.209.031-.162 0-.312-.054-.433-.144l.002.001c-.128-.115-.208-.281-.208-.466 0-.005 0-.01 0-.014v.001q0-.048.008-1.226t.008-2.154c.007-.075.011-.161.011-.249 0-.792-.323-1.508-.844-2.025.618-.061 1.176-.163 1.718-.305l-.076.017c.573-.16 1.073-.373 1.537-.642l-.031.017c.508-.28.938-.636 1.292-1.058l.006-.007c.372-.476.663-1.036.84-1.645l.009-.035c.209-.683.329-1.468.329-2.281 0-.045 0-.091-.001-.136v.007c0-.022.001-.047.001-.072 0-1.248-.482-2.383-1.269-3.23l.003.003c.168-.44.265-.948.265-1.479 0-.649-.145-1.263-.404-1.814l.011.026c-.115-.022-.246-.035-.381-.035-.334 0-.649.078-.929.216l.012-.005c-.568.21-1.054.448-1.512.726l.038-.022-.609.384c-.922-.264-1.981-.416-3.075-.416s-2.153.152-3.157.436l.081-.02q-.256-.176-.681-.433c-.373-.214-.814-.421-1.272-.595l-.066-.022c-.293-.154-.64-.244-1.009-.244-.124 0-.246.01-.364.03l.013-.002c-.248.524-.393 1.139-.393 1.788 0 .531.097 1.04.275 1.509l-.01-.029c-.785.844-1.266 1.979-1.266 3.227 0 .025 0 .051.001.076v-.004c-.001.039-.001.084-.001.13 0 .809.12 1.591.344 2.327l-.015-.057c.189.643.476 1.202.85 1.693l-.009-.013c.354.435.782.793 1.267 1.062l.022.011c.432.252.933.465 1.46.614l.046.011c.466.125 1.024.227 1.595.284l.046.004c-.431.428-.718 1-.784 1.638l-.001.012c-.207.101-.448.183-.699.236l-.021.004c-.256.051-.549.08-.85.08-.022 0-.044 0-.066 0h.003c-.394-.008-.756-.136-1.055-.348l.006.004c-.371-.259-.671-.595-.881-.986l-.007-.015c-.198-.336-.459-.614-.768-.827l-.009-.006c-.225-.169-.49-.301-.776-.38l-.016-.004-.32-.048c-.023-.002-.05-.003-.077-.003-.14 0-.273.028-.394.077l.007-.003q-.128.072-.08.184c.039.086.087.16.145.225l-.001-.001c.061.072.13.135.205.19l.003.002.112.08c.283.148.516.354.693.603l.004.006c.191.237.359.505.494.792l.01.024.16.368c.135.402.38.738.7.981l.005.004c.3.234.662.402 1.057.478l.016.002c.33.064.714.104 1.106.112h.007c.045.002.097.002.15.002.261 0 .517-.021.767-.062l-.027.004.368-.064q0 .609.008 1.418t.008.873v.014c0 .185-.08.351-.208.466h-.001c-.119.089-.268.143-.431.143-.075 0-.147-.011-.214-.032l.005.001c-4.929-1.689-8.409-6.283-8.409-11.69 0-2.268.612-4.393 1.681-6.219l-.032.058c1.094-1.871 2.609-3.386 4.422-4.449l.058-.031c1.739-1.034 3.835-1.645 6.073-1.645h.098-.005zm-7.64 17.666q.048-.112-.112-.192-.16-.048-.208.032-.048.112.112.192.144.096.208-.032zm.497.545q.112-.08-.032-.256-.16-.144-.256-.048-.112.08.032.256.159.157.256.047zm.48.72q.144-.112 0-.304-.128-.208-.272-.096-.144.08 0 .288t.272.112zm.672.673q.128-.128-.064-.304-.192-.192-.32-.048-.144.128.064.304.192.192.32.044zm.913.4q.048-.176-.208-.256-.24-.064-.304.112t.208.24q.24.097.304-.096zm1.009.08q0-.208-.272-.176-.256 0-.256.176 0 .208.272.176.256.001.256-.175zm.929-.16q-.032-.176-.288-.144-.256.048-.224.24t.288.128.225-.224z" />
                  </svg>
                  <span className="break-all">
                    https://github.com/MangiameliFabio
                  </span>
                </a>

                <a
                  href="https://fabiomangiameli.itch.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[64px] flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-body-color-dark transition hover:border-primary hover:text-white"
                >
                  <svg
                    className="shrink-0 fill-current"
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M 16 5 C 12.748 5 8.3121094 5.0508594 7.4121094 5.1308594 C 6.4021094 5.7368594 4.4028125 8.0309531 4.3828125 8.6269531 L 4.3828125 9.6269531 C 4.3828125 10.889953 5.5657188 12 6.6367188 12 C 7.9197187 12 8.9902344 10.929969 8.9902344 9.6679688 C 8.9902344 10.929969 10.0305 12 11.3125 12 C 12.6055 12 13.605469 10.930969 13.605469 9.6679688 C 13.605469 10.929969 14.695281 12 15.988281 12 L 16.009766 12 C 17.302766 12 18.392578 10.930969 18.392578 9.6679688 C 18.392578 10.929969 19.402547 12 20.685547 12 C 21.968547 12 23.009766 10.930969 23.009766 9.6679688 C 23.009766 10.929969 24.080281 12 25.363281 12 C 26.434281 12 27.615234 10.889953 27.615234 9.6269531 L 27.615234 8.6269531 C 27.595234 8.0309531 25.595938 5.7368594 24.585938 5.1308594 C 21.443938 5.0198594 19.252 5 16 5 z M 13.550781 11.742188 C 12.497781 13.552188 9.8523125 13.573906 8.8203125 11.753906 C 8.1903125 12.845906 6.7642969 13.267547 6.1542969 13.060547 C 5.9762969 14.959547 5.8534844 24.70875 7.1464844 26.34375 C 10.943484 27.22875 21.164516 27.20975 24.853516 26.34375 C 26.348516 24.81975 26.013703 14.821547 25.845703 13.060547 C 25.235703 13.267547 23.809453 12.845906 23.189453 11.753906 C 22.146453 13.573906 19.501219 13.552188 18.449219 11.742188 C 18.124219 12.332187 17.367 13.109375 16 13.109375 C 14.997 13.148375 14.051781 12.607187 13.550781 11.742188 z M 11.419922 14 C 12.219922 14 12.950078 14.000469 13.830078 14.980469 C 15.280078 14.830469 16.719922 14.830469 18.169922 14.980469 C 19.059922 14.010469 19.780078 14.009766 20.580078 14.009766 C 23.160078 14.009766 23.780937 17.819609 24.710938 21.099609 C 25.550938 24.149609 24.429062 24.230469 23.039062 24.230469 C 20.969062 24.150469 19.820313 22.650625 19.820312 21.140625 C 17.890313 21.460625 14.809688 21.580625 12.179688 21.140625 C 12.179688 22.650625 11.030938 24.150469 8.9609375 24.230469 C 7.5709375 24.230469 6.4490625 24.149609 7.2890625 21.099609 C 8.2190625 17.799609 8.8399219 14.009766 11.419922 14.009766 L 11.419922 14 z M 16 16.876953 C 16 16.876953 14.306 18.439375 14 18.984375 L 15.107422 18.943359 L 15.107422 19.910156 C 15.107422 19.968156 15.926 19.917969 16 19.917969 C 16.447 19.934969 16.892578 19.951156 16.892578 19.910156 L 16.892578 18.943359 L 18 18.984375 C 17.694 18.438375 16 16.876953 16 16.876953 z" />
                  </svg>
                  <span className="break-all">
                    https://fabiomangiameli.itch.io
                  </span>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 lg:mt-10">
            <FavoriteGamesCarousel />
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
