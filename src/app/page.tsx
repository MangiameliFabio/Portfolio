import ScrollUp from "@/components/Common/ScrollUp";
import Engine from "@/components/Portfolios/Engine";
import Gameplay from "@/components/Portfolios/Gameplay";
import Ghostship from "@/components/Portfolios/Ghostship";
import Welcome from "@/components/Portfolios/Welcome";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio Fabio Mangiameli",
  description: "",
};
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';

function getSubdomain(host: string) {
  const hostname = host.split(':')[0];

  if (hostname.endsWith('.localhost')) {
    const subdomain = hostname.replace('.localhost', '');
    return subdomain === 'www' ? null : subdomain;
  }

  if (hostname.endsWith('.fabiomangiameli.com')) {
    const subdomain = hostname.replace('.fabiomangiameli.com', '');
    return subdomain === 'www' ? null : subdomain;
  }

  return null;
}

export default async function HomePage() {
  const headersList = await headers();
  const host = headersList.get('host') || '';
  const subdomain = getSubdomain(host);

  if (!subdomain) {
    return (
      <>
        <Welcome/>
        <ScrollUp />
      </>
    );
  }


  if (subdomain === 'engine') {
    return (
      <>
        <Engine/>
        <ScrollUp />
      </>
    );
  }

  if (subdomain === 'game') {
    return (
      <>
        <Gameplay/>
        <ScrollUp />
      </>
    );
  }

  if (subdomain === 'ghostship') {
    return (
      <>
        <Ghostship/>
        <ScrollUp />
      </>
    );
  }

  if (subdomain === 'graphics') {
    return (
      <>
        <div>Graphics homepage</div>;
        <ScrollUp />
      </>
    );
  }

  notFound();
}
