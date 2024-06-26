"use client";
import { useEffect, useState } from "react";

import PackageType from "./PackageType";
import cardDataInfo from "./cardData.json";
import HorizontalSlider from "./HorizontalSlider";

import packageTypes from "./packageTypes.json";

export default function Home() {
  const [selectedPackageType, setSelectedPackageType] = useState(packageTypes[0]);
  const [packageInfo, setPackageInfo] = useState([]);

  useEffect(() => {
    const requiredPackageInfo = cardDataInfo.filter((cardData) => {
      if (selectedPackageType.toUpperCase() === "CENTER VISIT" && cardData.isCenterVisitPackage) {
        return true;
      }
      return cardData.subCategories.includes(selectedPackageType.toUpperCase())
    });
    setPackageInfo(requiredPackageInfo);
  }, [selectedPackageType]);

  const onSelectingPackageType = (packageName) => {
    setSelectedPackageType(packageName);
  }

  return (
    <div className="bg-[#E8F2FE] min-h-[100vh]">
      <div className="px-10 py-5">
        <p className="font-normal text-[22px]">Featured Health Check-up Packages</p>
        <div className="flex flex-wrap">
          {
            packageTypes.map((packageType, index) => {
              return (
                <PackageType
                  key={index}
                  name={packageType}
                  selectedPackageType={selectedPackageType}
                  onSelectingPackageType={onSelectingPackageType}
                />
              );
            })
          }
        </div>
        <div>
          <HorizontalSlider cardDataInfo={packageInfo}/>
        </div>
      </div>
    </div>
  );
}
