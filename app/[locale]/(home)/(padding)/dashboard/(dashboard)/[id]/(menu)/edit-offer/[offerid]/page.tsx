"use client";
import BreadCrumb from "@/app/components/BreadCrumb";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import SendOffer from "@/app/components/forms/SendOffer";
import Spinner from "@/app/components/Spinner";
import { useGetEntity } from "@/lib/queries";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const page = ({ params: { offerid, id } }: { params: { offerid: string; id: string } }) => {
  const { data: companyData, isLoading: isLoadingCompany } = useGetEntity("company", `company-${id}`, id);
  const { data, isLoading } = useGetEntity("offer", `offer-${offerid}`, `${offerid}`);
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);
  useLayoutEffect(() => {
    const element = document.getElementById("portal");
    if (element) {
      setPortalElement(element);
    } else {
      console.warn("Portal element not found in DOM");
    }
  }, []);
  if (isLoading || !data || isLoadingCompany || !companyData) return <Spinner />;

  return (
    <div>
      {portalElement &&
        createPortal(
          <BreadCrumb
            linksCustom={[
              { href: "", text: "Home" },
              ...(id ? [{ href: `/dashboard/${id}`, text: companyData.data.title }] : []),
              { href: `/dashboard/${id}/job-offers`, text: "JOB OFFERS" },
              { href: `/dashboard/${id}/edit-offer/${offerid}`, text: "EDIT OFFER" },
            ]}
          />,
          portalElement
        )}
      <div>
        <SendOffer
          negotiation={data.data.negotiation}
          userId={data.data.user}
          defaultvals={{
            ...data.data.details,
            country_id: data.data.country_id,
            city_id: data.data.city_id,
            state_id: data.data.state_id,
            id: data.data.id,
          }}
        />
      </div>
    </div>
  );
};

export default page;
