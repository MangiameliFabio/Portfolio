"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./GameEmbed.module.css";

type CrunchTimeAudioApi = {
  setVolume: (volume: number) => void;
  setMuted: (muted: boolean) => void;
  getState?: () => { volume: number; muted: boolean };
};

type GameEmbedProps = {
  src: string;
  title: string;
  description?: string;
};

const GameEmbed = ({ src, title, description }: GameEmbedProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === wrapperRef.current);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    const detectTouchDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileOrTabletAgent =
        /android|iphone|ipad|ipod|tablet|kindle|silk|playbook|mobile/.test(
          userAgent,
        );
      const hasCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
      const fitsTabletViewport =
        window.innerWidth <= 1024 && window.innerHeight <= 1366;

      setIsTouchDevice(
        isMobileOrTabletAgent || (hasCoarsePointer && fitsTabletViewport),
      );
    };

    detectTouchDevice();
    window.addEventListener("resize", detectTouchDevice);

    return () => {
      window.removeEventListener("resize", detectTouchDevice);
    };
  }, []);

  const getAudioApi = () => {
    const iframeWindow = iframeRef.current?.contentWindow as
      | (Window & { CrunchTimeAudio?: CrunchTimeAudioApi })
      | null
      | undefined;

    return iframeWindow?.CrunchTimeAudio;
  };

  const syncAudio = (nextVolume: number, nextMuted: boolean) => {
    const audioApi = getAudioApi();
    if (!audioApi) {
      return;
    }

    audioApi.setVolume(nextVolume);
    audioApi.setMuted(nextMuted);
  };

  const toggleFullscreen = async () => {
    if (document.fullscreenElement === wrapperRef.current) {
      await document.exitFullscreen();
      return;
    }

    await wrapperRef.current?.requestFullscreen();
  };

  const handleIframeLoad = () => {
    syncAudio(volume, isMuted);
  };

  const handleMuteToggle = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    syncAudio(volume, nextMuted);
  };

  const handleVolumeChange = (nextVolume: number) => {
    setVolume(nextVolume);
    if (nextVolume > 0 && isMuted) {
      setIsMuted(false);
      syncAudio(nextVolume, false);
      return;
    }

    syncAudio(nextVolume, isMuted);
  };

  return (
    <figure className="my-6 overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-950/70 shadow-lg shadow-slate-950/20 md:my-10">
      <div className="border-b border-slate-800/80 bg-slate-900/90 px-4 py-3">
        <div className="flex flex-col gap-3 items-center lg:justify-between">
          {!isTouchDevice && (
            <div>
              <div className="text-sm font-semibold tracking-[0.18em] text-slate-200 uppercase">
                Playable Web Build
              </div>
              <div className="mt-1 text-sm text-slate-400">
                {description ??
                  "The game runs directly in the browser. Use fullscreen for the best experience."}
              </div>
            </div>
          )}

          {!isTouchDevice && (
            <div className="flex flex-wrap items-center gap-3 mt-1 ">
              <button
                type="button"
                onClick={handleMuteToggle}
                className="inline-flex cursor-pointer items-center justify-center rounded-full border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-100 transition hover:border-slate-500 hover:bg-slate-700"
              >
                {isMuted ? "Unmute" : "Mute"}
              </button>

              <label className="flex items-center gap-3 rounded-full border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-slate-200">
                <span className="whitespace-nowrap">Volume</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={Math.round(volume * 100)}
                  onChange={(event) =>
                    handleVolumeChange(Number(event.target.value) / 100)
                  }
                  className={styles.volumeSlider}
                  aria-label="Game volume"
                />
                <span className="w-10 text-right tabular-nums text-slate-400">
                  {Math.round(volume * 100)}%
                </span>
              </label>

              <button
                type="button"
                onClick={() => void toggleFullscreen()}
                className="inline-flex cursor-pointer items-center justify-center rounded-full border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-100 transition hover:border-slate-500 hover:bg-slate-700"
              >
                {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              </button>
            </div>
          )}
        </div>
      </div>

      {isTouchDevice ? (
        <div className="flex aspect-[16/10] w-full items-center justify-center bg-black px-6 text-center">
          <div className="max-w-xl">
            <p className="text-lg font-semibold text-slate-100">
              The playable web build is disabled on phones and tablets.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-base">
              This Godot build works best with desktop keyboard input and a
              larger screen. Please open this page on a desktop or laptop to
              play it here.
            </p>
          </div>
        </div>
      ) : (
        <div ref={wrapperRef} className="aspect-[16/10] w-full bg-black">
          <iframe
            ref={iframeRef}
            src={src}
            title={title}
            className="h-full w-full border-0"
            loading="lazy"
            allow="autoplay; fullscreen; gamepad"
            allowFullScreen
            onLoad={handleIframeLoad}
          />
        </div>
      )}
    </figure>
  );
};

export default GameEmbed;
