"use client";

import React, { useEffect, useState } from "react";
import { FacebookShareButton, TwitterShareButton, PinterestShareButton } from "react-share";
import { FaFacebook, FaPinterest } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Button, buttonVariants } from "@/components/ui/button";

const Share = ({ title, image }: { title: string; image: string }) => {
  const [url, setUrl] = useState<any>();
  useEffect(() => {
    if (window.location.href) {
      setUrl(window?.location.href);
    }
  }, []);
  return (
    <div className="flex gap-4 mt-5">
      <FacebookShareButton url={url} quote={title} hashtag={title}>
        <div className={buttonVariants({ size: "icon", variant: "outline" })}>
          <FaFacebook size={24} />
        </div>
      </FacebookShareButton>

      <TwitterShareButton url={url} title={title}>
        <div className={buttonVariants({ size: "icon", variant: "outline" })}>
          <FaXTwitter size={24} />
        </div>
      </TwitterShareButton>

      <PinterestShareButton url={url} media={image} description={title}>
        <div className={buttonVariants({ size: "icon", variant: "outline" })}>
          <FaPinterest size={24} />
        </div>
      </PinterestShareButton>
    </div>
  );
};

export default Share;
