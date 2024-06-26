import Image from "next/image";
import AlternatingText from "./AlternatingText";

const PackageInfo = (props = {}) => {
  const { data } = props;

  return (
      <div className="rounded-md shadow bg-white mr-5 w-[400px] h-[330px] flex-shrink-0 transition-transform hover:scale-[1.02]">
        <div>
          <div className="pt-[25px] pb-[6px] px-[25px]">
            <div className="h-[60px]">
              <p className="font-medium text-lg whitespace-pre-line line-clamp-2 mb-1">{data.packageDisplayName.replace(`${data.packageName} - `, '')}</p>
            </div>
            <p className="text-[13px] inline-flex mb-3">
              <Image alt="icon" className="mr-1" src={"https://www.medibuddy.in/assets/icons/corpLabs/labs-reports-tat.svg"} width={14} height={14}/>
              {data.reportsTatText}
            </p>
            <p className="text-[12px] mb-1"><b>{data.testCount}</b> Tests</p>
            <ul className="list-disc list-inside pl-[10px] text-[#828282]">
              {
                (data?.testsSummary || []).map((testSummary, index) => {
                  return <li key={index} className="text-[12px] mb-1">{testSummary}</li>
                })
              }
            </ul>
          </div>
          <div className="bg-[#F8F8F8] mx-[10px] p-[10px] rounded-md flex justify-between">
            <p className="text-left text-[12px]"><span className="font-medium">Available at:</span> Home</p>
            <p className="text-right text-[12px] mr-5"><span className="font-medium">Fasting:</span> {data.fastingHoursText}</p>
          </div>
          <div className="flex justify-between pt-[10px] px-[25px]">
            <div className="text-left">
              <div className="flex text-[12px] mb-1">
                <p className="line-through mr-[10px] text-[#828282]">₹ {data.priceRange}/-</p>
                <p className="text-[#79AB28] bg-[#F6FFDF] px-2 rounded">{data.discount}% OFF</p>
              </div>
              <p className="font-semibold">₹ {data.estimatedPrice}/-</p>
            </div>
            <div className="m-2">
              <button className="text-right bg-transparent text-blue-700 px-[20px] py-[-10px] border border-blue-500 rounded-lg text-[14px] h-[35px]">
                Add
              </button>
            </div>
          </div>
        </div>
        {
          Array.isArray(data.tags?.bottomTag) && data.tags?.bottomTag.length > 0 && (
            <div className="mt-4 rounded-b-md bg-[#5DA1F6] text-white">
              <AlternatingText textArray={data.tags?.bottomTag || []} />
            </div>
          )
        }
      </div>
  )
}

export default PackageInfo